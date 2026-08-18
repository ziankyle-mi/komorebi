import http.server
import json
import os
import urllib.parse

PORT = 8080
DATA_FILE = os.path.join(os.path.dirname(__file__), "couple_data.json")

# Initialize couple data file if not exists
if not os.path.exists(DATA_FILE):
    initial_data = {
        "plans": [],
        "messages": [],
        "latest_snap": None,
        "whisper_note": "Tap Edit to write a daily note for your partner",
        "partner_status": {"energy": 2, "sleeping": False},
        "last_updated": 0
    }
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(initial_data, f, indent=2)

class SyncHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Range")
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/api/sync"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            try:
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    data = f.read()
                self.wfile.write(data.encode("utf-8"))
            except Exception:
                self.wfile.write(b"{}")
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/sync"):
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)
            try:
                payload = json.loads(post_body.decode("utf-8"))
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    current_data = json.load(f)
                
                # Merge incoming updates
                for k, v in payload.items():
                    current_data[k] = v
                
                with open(DATA_FILE, "w", encoding="utf-8") as f:
                    json.dump(current_data, f, indent=2)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return
        super().do_POST()

if __name__ == "__main__":
    server = http.server.ThreadingHTTPServer(("", PORT), SyncHandler)
    print(f"Komorebi Multi-Threaded Sync & Audio Server running at http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
