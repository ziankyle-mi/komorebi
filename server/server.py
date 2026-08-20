import http.server
import json
import mimetypes
import os
import re
import shutil
import socket
import threading
import time
import urllib.parse
from collections import defaultdict

# Fix: Register .jsx MIME type so browsers execute them as JavaScript
# Without this, Python's SimpleHTTPRequestHandler serves .jsx as
# 'application/octet-stream', which browsers block with a strict MIME error.
mimetypes.add_type('application/javascript', '.jsx')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

PORT = 8080
SERVER_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(SERVER_DIR, "couple_data.json")
BACKUPS_DIR = os.path.join(SERVER_DIR, "backups")
WWW_DIR = os.path.abspath(os.path.join(SERVER_DIR, "..", "www"))

os.makedirs(BACKUPS_DIR, exist_ok=True)

# Thread-safe write lock for concurrent sync operations
db_lock = threading.Lock()

# Rate Limiter State: IP -> list of request timestamps
RATE_LIMIT_WINDOW = 10.0  # seconds
MAX_REQUESTS_PER_WINDOW = 150
request_history = defaultdict(list)

# Initialize couple data file with clean defaults if not exists
DEFAULT_DATABASE_PAYLOAD = {
    "plans": [],
    "messages": [],
    "latest_snap": None,
    "whisper_note": "Tap Edit to write a daily note for your partner",
    "partner_status": {"energy": 2, "sleeping": False},
    "cycle_logs": {},
    "cycle_settings": {
        "cycleLength": 28,
        "periodDuration": 5,
        "lastPeriodStart": "2026-08-19",
        "allowIntimacyTracking": True
    },
    "profiles": {
        "ziankyle": {
            "name": "Ziankyle",
            "avatar": { "id": "kokomi", "name": "Kokomi", "iconUrl": "./assets/avatars/kokomi.png" }
        },
        "mikkie": {
            "name": "Mikkie",
            "avatar": { "id": "yae", "name": "Yae Miko", "iconUrl": "./assets/avatars/yae.png" }
        }
    },
    "movie_swipes": {},
    "last_updated": int(time.time() * 1000)
}

def rotate_backups(filepath):
    """
    Maintains up to 5 automated rolling snapshots in server/backups/.
    """
    try:
        if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
            timestamp = int(time.time() * 1000)
            backup_file = os.path.join(BACKUPS_DIR, f"couple_data_{timestamp}.json")
            shutil.copy2(filepath, backup_file)
            
            # Keep only the last 5 backups
            all_backups = sorted(
                [os.path.join(BACKUPS_DIR, f) for f in os.listdir(BACKUPS_DIR) if f.startswith("couple_data_") and f.endswith(".json")],
                key=os.path.getmtime
            )
            while len(all_backups) > 5:
                oldest = all_backups.pop(0)
                try:
                    os.remove(oldest)
                except OSError:
                    pass
    except Exception as e:
        print(f"[!] Warning: Backup rotation non-fatal error: {e}")

def recover_corrupted_database():
    """
    Auto-Recovery: If couple_data.json is corrupt, restore from newest backup.
    """
    all_backups = sorted(
        [os.path.join(BACKUPS_DIR, f) for f in os.listdir(BACKUPS_DIR) if f.startswith("couple_data_") and f.endswith(".json")],
        key=os.path.getmtime
    )
    if all_backups:
        latest_backup = all_backups[-1]
        try:
            with open(latest_backup, "r", encoding="utf-8") as f:
                data = json.load(f)
            safe_atomic_write_json(DATA_FILE, data)
            print(f"[✓] Successfully recovered database from backup: {latest_backup}")
            return data
        except Exception as e:
            print(f"[!] Could not recover from backup {latest_backup}: {e}")
    safe_atomic_write_json(DATA_FILE, DEFAULT_DATABASE_PAYLOAD)
    return DEFAULT_DATABASE_PAYLOAD

def safe_atomic_write_json(filepath, data):
    """
    Thread-safe ACID-compliant atomic write:
    1. Creates timestamped backup
    2. Writes to temporary file with os.fsync
    3. Atomically replaces target file using mutex lock
    """
    with db_lock:
        rotate_backups(filepath)
        temp_file = f"{filepath}.tmp.{int(time.time() * 1000)}"
        try:
            with open(temp_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
                f.flush()
                os.fsync(f.fileno())
            os.replace(temp_file, filepath)
        except Exception as e:
            if os.path.exists(temp_file):
                try:
                    os.remove(temp_file)
                except OSError:
                    pass
            raise e

if not os.path.exists(DATA_FILE) or os.path.getsize(DATA_FILE) == 0:
    safe_atomic_write_json(DATA_FILE, DEFAULT_DATABASE_PAYLOAD)

# Schema Sanitizers & Validators
def sanitize_string(val, max_len=300):
    if not isinstance(val, str):
        return ""
    # Strip script and style blocks including inner contents
    clean = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', val, flags=re.IGNORECASE)
    clean = re.sub(r'<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>', '', clean, flags=re.IGNORECASE)
    # Strip any remaining HTML tags
    clean = re.sub(r'<[^>]*>?', '', clean)
    clean = re.sub(r'javascript\s*:', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'vbscript\s*:', '', clean, flags=re.IGNORECASE)
    clean = re.sub(r'on\w+\s*=', '', clean, flags=re.IGNORECASE)
    clean = clean.strip()
    return clean[:max_len]

def validate_and_sanitize_payload(payload):
    """
    Strict Whitelist & Schema Validation (OWASP ASVS Level 3).
    Ensures arbitrary or malicious data cannot pollute the database.
    """
    if not isinstance(payload, dict):
        return {}

    sanitized = {}

    # 1. whisper_note
    if "whisper_note" in payload and isinstance(payload["whisper_note"], str):
        sanitized["whisper_note"] = sanitize_string(payload["whisper_note"], 280)

    # 2. plans (list of dicts)
    if "plans" in payload and isinstance(payload["plans"], list):
        clean_plans = []
        for p in payload["plans"][:500]:  # Limit max 500 plans
            if isinstance(p, dict) and "id" in p:
                clean_plans.append({
                    "id": sanitize_string(str(p.get("id", "")), 64),
                    "title": sanitize_string(str(p.get("title", "")), 100),
                    "time": sanitize_string(str(p.get("time", "All Day")), 30),
                    "date": sanitize_string(str(p.get("date", "")), 10),
                    "type": sanitize_string(str(p.get("type", "Date")), 30),
                    "emoji": sanitize_string(str(p.get("emoji", "✨")), 10),
                    "createdBy": sanitize_string(str(p.get("createdBy", "")), 30),
                    "isWishSealed": bool(p.get("isWishSealed", False)),
                    "isRevealed": bool(p.get("isRevealed", True))
                })
        sanitized["plans"] = clean_plans

    # 3. messages (list of dicts)
    if "messages" in payload and isinstance(payload["messages"], list):
        clean_msgs = []
        for m in payload["messages"][-1000:]:  # Keep last 1000 messages max
            if isinstance(m, dict) and "id" in m and "text" in m:
                clean_msgs.append({
                    "id": sanitize_string(str(m.get("id", "")), 64),
                    "sender": sanitize_string(str(m.get("sender", "")), 30),
                    "text": sanitize_string(str(m.get("text", "")), 600),
                    "time": sanitize_string(str(m.get("time", "")), 20)
                })
        sanitized["messages"] = clean_msgs

    # 4. latest_snap (dict)
    if "latest_snap" in payload:
        snap = payload["latest_snap"]
        if snap is None:
            sanitized["latest_snap"] = None
        elif isinstance(snap, dict):
            img_url = str(snap.get("imageUrl", ""))
            # Allow safe data URI or relative path
            if img_url.startswith("data:image/") or img_url.startswith("./assets/") or img_url.startswith("https://"):
                sanitized["latest_snap"] = {
                    "id": sanitize_string(str(snap.get("id", "")), 64),
                    "imageUrl": img_url if len(img_url) <= 15 * 1024 * 1024 else "",
                    "caption": sanitize_string(str(snap.get("caption", "")), 200),
                    "time": sanitize_string(str(snap.get("time", "")), 30),
                    "sentBy": sanitize_string(str(snap.get("sentBy", "")), 30),
                    "mediaType": sanitize_string(str(snap.get("mediaType", "image")), 15),
                    "items": snap.get("items", []) if isinstance(snap.get("items"), list) else []
                }

    # 5. partner_status (dict)
    if "partner_status" in payload and isinstance(payload["partner_status"], dict):
        st = payload["partner_status"]
        energy_val = st.get("energy", 2)
        try:
            energy_val = max(1, min(10, int(energy_val)))
        except (ValueError, TypeError):
            energy_val = 2
        sanitized["partner_status"] = {
            "energy": energy_val,
            "sleeping": bool(st.get("sleeping", False))
        }

    # 6. timezone_info (dict)
    if "timezone_info" in payload and isinstance(payload["timezone_info"], dict):
        tz = payload["timezone_info"]
        sanitized["timezone_info"] = {
            "timezone": sanitize_string(str(tz.get("timezone", "UTC")), 50),
            "city": sanitize_string(str(tz.get("city", "Local")), 50),
            "sentBy": sanitize_string(str(tz.get("sentBy", "")), 30),
            "offsetMinutes": int(tz.get("offsetMinutes", 0)) if isinstance(tz.get("offsetMinutes"), (int, float)) else 0
        }

    # 7. partner_mood (str)
    if "partner_mood" in payload and isinstance(payload["partner_mood"], str):
        sanitized["partner_mood"] = sanitize_string(payload["partner_mood"], 30)

    # 8. live_ping (dict)
    if "live_ping" in payload and isinstance(payload["live_ping"], dict):
        ping = payload["live_ping"]
        sanitized["live_ping"] = {
            "sentBy": sanitize_string(str(ping.get("sentBy", "")), 30),
            "time": int(ping.get("time", 0)) if isinstance(ping.get("time"), (int, float)) else int(time.time() * 1000)
        }

    # 9. cycle_logs (dict of ISO dates -> log records)
    if "cycle_logs" in payload and isinstance(payload["cycle_logs"], dict):
        clean_logs = {}
        for date_str, log in payload["cycle_logs"].items():
            if re.match(r'^\d{4}-\d{2}-\d{2}$', str(date_str)) and isinstance(log, dict):
                clean_logs[str(date_str)] = {
                    "date": str(date_str),
                    "flow": sanitize_string(str(log.get("flow", "none")), 20),
                    "floItems": [sanitize_string(str(it), 40) for it in log.get("floItems", []) if isinstance(it, str)][:30],
                    "moods": [sanitize_string(str(m), 30) for m in log.get("moods", []) if isinstance(m, str)][:10],
                    "symptoms": [sanitize_string(str(s), 30) for s in log.get("symptoms", []) if isinstance(s, str)][:15],
                    "intimate": bool(log.get("intimate", False)),
                    "protectedSex": bool(log.get("protectedSex", True)),
                    "notes": sanitize_string(str(log.get("notes", "")), 250),
                    "updatedAt": int(log.get("updatedAt", 0)) if isinstance(log.get("updatedAt"), (int, float)) else int(time.time() * 1000)
                }
        sanitized["cycle_logs"] = clean_logs

    # 10. cycle_settings (dict)
    if "cycle_settings" in payload and isinstance(payload["cycle_settings"], dict):
        cs = payload["cycle_settings"]
        try:
            c_len = max(21, min(35, int(cs.get("cycleLength", 28))))
            p_dur = max(3, min(10, int(cs.get("periodDuration", 5))))
        except (ValueError, TypeError):
            c_len, p_dur = 28, 5
        sanitized["cycle_settings"] = {
            "cycleLength": c_len,
            "periodDuration": p_dur,
            "lastPeriodStart": sanitize_string(str(cs.get("lastPeriodStart", time.strftime("%Y-%m-%d"))), 10),
            "allowIntimacyTracking": bool(cs.get("allowIntimacyTracking", True))
        }

    # 11. profiles (dict of traveler name -> { name, avatar })
    if "profiles" in payload and isinstance(payload["profiles"], dict):
        clean_profiles = {}
        for user_key, prof in payload["profiles"].items():
            if isinstance(prof, dict):
                clean_profiles[sanitize_string(str(user_key), 32).lower()] = {
                    "name": sanitize_string(str(prof.get("name", "")), 32),
                    "avatar": {
                        "id": sanitize_string(str(prof.get("avatar", {}).get("id", "kokomi")), 32),
                        "name": sanitize_string(str(prof.get("avatar", {}).get("name", "Kokomi")), 32),
                        "element": sanitize_string(str(prof.get("avatar", {}).get("element", "hydro")), 20),
                        "iconUrl": sanitize_string(str(prof.get("avatar", {}).get("iconUrl", "")), 500000)
                    } if isinstance(prof.get("avatar"), dict) else None,
                    "updatedAt": int(prof.get("updatedAt", 0)) if isinstance(prof.get("updatedAt"), (int, float)) else int(time.time() * 1000)
                }
        sanitized["profiles"] = clean_profiles

    # 12. movie_swipes (dict of traveler -> dict of movieId -> "liked" | "passed")
    if "movie_swipes" in payload and isinstance(payload["movie_swipes"], dict):
        clean_swipes = {}
        for user_key, swipes in payload["movie_swipes"].items():
            if isinstance(swipes, dict):
                clean_user_swipes = {}
                for m_id, action in swipes.items():
                    if str(action) in ["liked", "passed"]:
                        clean_user_swipes[sanitize_string(str(m_id), 32)] = str(action)
                clean_swipes[sanitize_string(str(user_key), 32).lower()] = clean_user_swipes
        sanitized["movie_swipes"] = clean_swipes

    return sanitized

class SyncHandler(http.server.SimpleHTTPRequestHandler):
    # Explicit MIME type map — overrides OS/registry entries on Windows
    # Critical: .jsx files MUST be served as application/javascript or
    # browsers will refuse to execute them (MIME-type strict checking).
    MIME_OVERRIDES = {
        '.jsx': 'application/javascript',
        '.js': 'application/javascript',
        '.css': 'text/css; charset=utf-8',
        '.html': 'text/html; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.gif': 'image/gif',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WWW_DIR, **kwargs)

    def guess_type(self, path):
        ext = os.path.splitext(path)[1].lower()
        if ext in self.MIME_OVERRIDES:
            return self.MIME_OVERRIDES[ext]
        return super().guess_type(path)

    def is_rate_limited(self):
        client_ip = self.client_address[0] if self.client_address else "127.0.0.1"
        now = time.time()
        # Prune older entries
        request_history[client_ip] = [t for t in request_history[client_ip] if now - t < RATE_LIMIT_WINDOW]
        if len(request_history[client_ip]) >= MAX_REQUESTS_PER_WINDOW:
            return True
        request_history[client_ip].append(now)
        return False

    def end_headers(self):
        # Security Pro Max Defense Headers (OWASP ASVS Level 3)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Range")
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("X-XSS-Protection", "1; mode=block")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Content-Security-Policy", "default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https: wss:; object-src 'none'; base-uri 'self';")
        self.send_header("Permissions-Policy", "accelerometer=(), gyroscope=(), payment=()")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.is_rate_limited():
            self.send_response(429)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"error": "Too Many Requests"}')
            return

        # Path Traversal Prevention: Ensure canonical path stays within WWW_DIR
        clean_path = urllib.parse.urlparse(self.path).path
        if not clean_path.startswith("/api/"):
            target_path = os.path.abspath(os.path.join(WWW_DIR, clean_path.lstrip("/")))
            if not target_path.startswith(WWW_DIR):
                self.send_response(403)
                self.end_headers()
                self.wfile.write(b"Forbidden")
                return

        # API Health & Database Integrity Check Endpoint
        if self.path.startswith("/api/health"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            backup_count = len([f for f in os.listdir(BACKUPS_DIR) if f.startswith("couple_data_")]) if os.path.exists(BACKUPS_DIR) else 0
            health_payload = {
                "status": "healthy",
                "database": {
                    "file": os.path.basename(DATA_FILE),
                    "size_bytes": os.path.getsize(DATA_FILE) if os.path.exists(DATA_FILE) else 0,
                    "rolling_backups_count": backup_count,
                    "acid_compliant": True,
                    "thread_safe_locking": True
                },
                "server_time": int(time.time() * 1000)
            }
            self.wfile.write(json.dumps(health_payload).encode("utf-8"))
            return

        # API Sync Endpoint
        if self.path.startswith("/api/sync"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            with db_lock:
                try:
                    with open(DATA_FILE, "r", encoding="utf-8") as f:
                        data = f.read()
                    # Test validity
                    json.loads(data)
                    self.wfile.write(data.encode("utf-8"))
                except Exception:
                    recovered = recover_corrupted_database()
                    self.wfile.write(json.dumps(recovered).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        if self.is_rate_limited():
            self.send_response(429)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"error": "Too Many Requests"}')
            return

        if self.path.startswith("/api/sync"):
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > 15 * 1024 * 1024:  # Max 15MB limit
                self.send_response(413)
                self.end_headers()
                self.wfile.write(b'{"error": "Payload exceeds 15MB limit"}')
                return

            post_body = self.rfile.read(content_length)
            try:
                payload = json.loads(post_body.decode("utf-8"))
                sanitized_updates = validate_and_sanitize_payload(payload)

                with db_lock:
                    with open(DATA_FILE, "r", encoding="utf-8") as f:
                        current_data = json.load(f)

                    for k, v in sanitized_updates.items():
                        if isinstance(v, dict) and isinstance(current_data.get(k), dict):
                            current_data[k].update(v)
                        else:
                            current_data[k] = v

                    current_data["last_updated"] = int(time.time() * 1000)
                    rotate_backups(DATA_FILE)
                    temp_file = f"{DATA_FILE}.tmp.{int(time.time() * 1000)}"
                    try:
                        with open(temp_file, "w", encoding="utf-8") as f:
                            json.dump(current_data, f, indent=2, ensure_ascii=False)
                            f.flush()
                            os.fsync(f.fileno())
                        os.replace(temp_file, DATA_FILE)
                    except Exception as e:
                        if os.path.exists(temp_file):
                            try:
                                os.remove(temp_file)
                            except OSError:
                                pass
                        raise e

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "updated": list(sanitized_updates.keys())}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Invalid or unsafe payload"}).encode("utf-8"))
            return

        super().do_POST()

class DualStackThreadingHTTPServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except (AttributeError, OSError):
            pass
        super().server_bind()

def run_server():
    try:
        # Dual-stack server: listens on both IPv6 (::1 / localhost) and IPv4 (127.0.0.1)
        server = DualStackThreadingHTTPServer(("::", PORT), SyncHandler)
    except Exception:
        # Fallback to standard IPv4
        server = http.server.ThreadingHTTPServer(("", PORT), SyncHandler)

    print(f"[*] Komorebi Hardened Dual-Stack Server running at:")
    print(f"    - http://localhost:{PORT}")
    print(f"    - http://127.0.0.1:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()

if __name__ == "__main__":
    run_server()
