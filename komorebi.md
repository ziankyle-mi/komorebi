# ✦ Project Brief: "Komorebi" — Real-Time LDR Shared Calendar & Lockscreen Widget

> *"Like sunlight filtering through the sacred leaves of Narukami, our days connect across distance."*

Act as a Senior Full-Stack Android Engineer and UI/UX Designer. Build this application strictly in **isolated, testable phases**. Provide complete, runnable code for one phase at a time; never batch phases or jump ahead without confirmation.

---

## ✦ 1. Concept & Vision

**Komorebi** (木漏れ日 — *sunlight filtering through trees*) is a shared calendar and presence widget for long-distance couples, themed around Genshin Impact's world aesthetics (Inazuma's sacred sakura elegance & Serenitea Pot's shared realm).

Each partner is a **Traveler**. Together they form a **Sanctuary** (shared realm/couple). Events are **Commissions** (daily plans), **Archon Quests** (milestones/reunions), or **Hangout Events** (virtual dates). Surprise plans are sealed behind a **Wish Banner** — hidden until the other Traveler "pulls" them on the day.

The desktop widget reference (see attached image) inspires the **lockscreen widget aesthetic**: a compact, dark-mode glassmorphic panel with a calendar grid, live clock, and character avatar — translated into Teyvat's visual language with elemental accents and constellation motifs.

---

## ✦ 2. Scope & Security Directives (Zero-Trust & OWASP ASVS Level 3)

| Constraint | Paranoia-Grade Security Rule | Mitigated Threats |
|---|---|---|
| **Identity & Auth** | **Supabase Auth JWT** (asymmetric RS256/Ed25519 verification). Tokens stored strictly in Android Hardware Keystore (`EncryptedSharedPreferences` AES256-GCM). | CWE-312, CWE-287 |
| **Object Authorization** | **PostgreSQL RLS with Subquery Isolation:** 100% of tables enforce `sanctuary_id = (SELECT sanctuary_id FROM profiles WHERE id = auth.uid())`. Zero cross-tenant data leaks. | OWASP API1 (BOLA / IDOR) |
| **Surprise Secrecy** | **Server-Side Masking VIEW (`commissions_secure`):** When `is_wish_sealed = true`, server suppresses title/emoji/description over WebSocket and REST until reveal day. | CWE-200 (Info Exposure) |
| **Pairing Hardening** | 8-character alphanumeric CSPRNG code + 5-attempt sliding window rate limiter (Redis-backed) with exponential lockout. | CWE-307 (Brute-force) |
| **Network & Transport** | Android `network_security_config.xml` with `cleartextTrafficPermitted="false"`, TLS 1.3 enforcement, and certificate hash pinning. | CWE-319 (Cleartext Traffic) |
| **Concurrency Control** | Optimistic concurrency locking via server-side auto-incrementing `version` trigger. Client clock skew cannot overwrite remote state. | CWE-362 (Race Conditions) |
| **Secrets Management** | Supabase URL, Anon Key, and sensitive config injected via `local.properties` → `BuildConfig`. Zero secrets in repository history. | CWE-798 (Hardcoded Keys) |

---

## ✦ 3. Design System — "Teyvat Codex"

### Color Palette (Elemental Accents)

| Token | Hex | Usage | Genshin Element |
|---|---|---|---|
| `--anemo-teal` | `#74C2A8` | Mikkie's events, secondary actions | Anemo |
| `--electro-violet` | `#B4A0E5` | Zian's events, active states | Electro |
| `--geo-amber` | `#F2C46D` | Joint events, highlights, D-Day countdowns | Geo |
| `--pyro-rose` | `#E88B8B` | Urgency, overdue indicators, energy low | Pyro |
| `--hydro-blue` | `#5EB2D7` | Timezone ribbons, info states | Hydro |
| `--cryo-frost` | `#C4E0F0` | Disabled states, widget frosted glass | Cryo |
| `--dendro-sage` | `#A8C77A` | Success, completed commissions | Dendro |
| `--abyss-ink` | `#1A1A2E` | Primary background (dark mode) | Abyss |
| `--starsilver` | `#E8E4F0` | Primary text on dark backgrounds | — |
| `--sakura-petal` | `#FFF0F5` | Card surfaces, modal backgrounds | Sakura |

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Clock | **Cinzel** (Google Fonts) | 700 | 48sp |
| Headings | **Outfit** | 600 | 20–24sp |
| Body | **Inter** | 400 | 14–16sp |
| Captions / Tags | **Inter** | 500 | 11–12sp |

### Component Language

| App Concept | Genshin Equivalent | Visual Style |
|---|---|---|
| Calendar event tag | **Commission Pill** | Rounded pill with elemental color fill + emoji prefix |
| Surprise event (hidden) | **Wish Banner** | Animated shimmer overlay, `"✦ Wish Sealed"` label |
| Surprise event (revealed) | **Wish Pull** | Burst animation (star particles) on reveal |
| Milestone countdown | **Archon Quest Banner** | Full-width gradient card with `--geo-amber` → `--electro-violet` |
| Mood/Energy badge | **Elemental Burst Gauge** | Circular radial fill with element color |
| Filter chips | **Element Icons** | Anemo / Electro / Geo / All icons as selectable chips |
| Empty state | **Paimon Idle** | Paimon illustration + "No Commissions today! Time to explore~" |
| Error state | **Emergency Food** | Paimon panic + "Something went wrong... Paimon blames the Abyss Order!" |
| Loading state | **Teleport Waypoint** | Swirling elemental particle animation |

### Motion & Micro-Animations

- **Page transitions**: Fade-through with subtle upward drift (200ms, `FastOutSlowIn`)
- **Commission pills**: Spring-based entrance animation when calendar grid loads
- **Wish Banner shimmer**: Infinite horizontal shimmer sweep (gradient mask, 1.5s loop)
- **Wish Pull reveal**: Scale-up (0.8→1.0) + radial star burst (400ms, overshoot interpolator)
- **Elemental Burst gauge fill**: Animated arc fill (300ms, `DecelerateInterpolator`)
- **Widget refresh**: Subtle pulse glow on the border when new data arrives

---

## ✦ 4. Technical Stack & Architecture

| Layer | Technology | Notes |
|---|---|---|
| **OS / Framework** | Native Android — Kotlin + Jetpack Compose | Min SDK 26 (Android 8.0) |
| **Design System** | Compose Material3 custom theme ("Teyvat Codex") | Elemental palette above |
| **Architecture** | Single Activity, Clean Architecture | `UI → ViewModel/StateFlow → Repository → Remote/Local Source` |
| **Auth** | **Supabase Auth** (email + password) | JWT-based. `profiles` extends `auth.users`. |
| **Backend** | Supabase (PostgreSQL 15+, Realtime, Edge Functions) | RLS on all tables via native `auth.uid()` |
| **Offline-First** | Room Database as SSOT | Outbox sync queue (`sync_queue` table) for offline mutations |
| **Conflict Resolution** | Optimistic Locking | Server-side `updated_at` via trigger + `version` integer column. `UPDATE ... WHERE version = $expected`. Client retries on conflict with merge UI. |
| **Timezone** | All DB timestamps: **UTC (`TIMESTAMPTZ`)** | Conversion at presentation layer only |
| **Push** | Firebase Cloud Messaging (FCM) | Token refresh handled via `FirebaseMessagingService.onNewToken()` → upsert to `profiles.fcm_token` |
| **Background Sync** | `WorkManager` (periodic 15 min) + FCM data payloads | Foreground service fallback for critical sync. OEM battery whitelist prompt in onboarding. |
| **Widget** | Jetpack Glance AppWidget | Lockscreen + Homescreen. "Last synced" indicator. |
| **Testing** | JUnit 5 + Turbine (Flow) + Compose UI Test + MockK | Required per phase. No phase ships without tests. |
| **DB Migrations** | Room `AutoMigration` + Supabase CLI `supabase db diff` | Migration specs defined from Phase 1. |

### Error Handling Contract

| Scenario | User-Facing Behavior |
|---|---|
| Network unreachable | Snackbar: "You're exploring offline — Commissions will sync when you reconnect ⚡" + offline badge on app bar |
| Supabase 5xx | Full-screen error: Emergency Food Paimon + retry button |
| Sync conflict (version mismatch) | Bottom sheet showing both versions + "Keep mine" / "Keep theirs" / "Merge" |
| FCM token stale | Silent re-registration on next app launch |
| Room migration failure | Fallback destructive migration + re-sync from Supabase (with user warning) |

---

## ✦ 5. Step-by-Step Implementation Roadmap

### Phase 1: Sanctuary Foundation — Database, Auth & Security

> *"Before the Traveler can explore, the Sanctuary must be built."*

**Database (Supabase SQL migration):**

- [ ] `sanctuaries` table (couples/realms):
  ```sql
  CREATE TABLE sanctuaries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pairing_code VARCHAR(6),
    code_expires_at TIMESTAMPTZ,
    anniversary_date TIMESTAMPTZ,
    reunion_date TIMESTAMPTZ,
    active_theme VARCHAR DEFAULT 'komorebi_default',
    created_at TIMESTAMPTZ DEFAULT now()
  );
  ```

- [ ] `profiles` table (extends `auth.users`):
  ```sql
  CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    sanctuary_id UUID REFERENCES sanctuaries(id),
    username VARCHAR UNIQUE NOT NULL,
    display_name VARCHAR,
    avatar_element VARCHAR DEFAULT 'anemo',  -- determines color accent
    energy_level INT CHECK (energy_level BETWEEN 1 AND 10) DEFAULT 5,
    mood_emoji VARCHAR DEFAULT '☕',
    timezone VARCHAR DEFAULT 'UTC',
    fcm_token TEXT,
    updated_at TIMESTAMPTZ DEFAULT now(),
    version INT DEFAULT 1
  );
  ```

- [ ] `commissions` table (events):
  ```sql
  CREATE TABLE commissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sanctuary_id UUID REFERENCES sanctuaries(id) NOT NULL,
    created_by UUID REFERENCES profiles(id) NOT NULL,
    title VARCHAR NOT NULL,
    emoji VARCHAR DEFAULT '📋',
    start_time_utc TIMESTAMPTZ NOT NULL,
    end_time_utc TIMESTAMPTZ,
    is_all_day BOOLEAN DEFAULT false,
    is_virtual_date BOOLEAN DEFAULT false,
    is_wish_sealed BOOLEAN DEFAULT false,  -- surprise plan
    commission_type VARCHAR DEFAULT 'daily' CHECK (commission_type IN ('daily', 'archon_quest', 'hangout', 'custom')),
    assigned_to UUID REFERENCES profiles(id),
    updated_at TIMESTAMPTZ DEFAULT now(),
    version INT DEFAULT 1
  );
  ```

- [ ] Server-side trigger: `updated_at` and `version` auto-increment on every `UPDATE` (prevents client clock skew in LWW).

**Row-Level Security:**

- [ ] All tables: `USING (sanctuary_id = (SELECT sanctuary_id FROM profiles WHERE id = auth.uid()))`.
- [ ] Wish-sealed visibility policy:
  ```sql
  CREATE POLICY "wish_sealed_mask" ON commissions FOR SELECT USING (
    CASE
      WHEN is_wish_sealed = true AND created_by != auth.uid()
      THEN false  -- hidden; served via a masking VIEW instead
      ELSE true
    END
  );
  ```
- [ ] Masking VIEW `commissions_visible`: Returns `'✦ Wish Sealed'` as title and `'🎴'` as emoji for sealed commissions created by the other Traveler.

**Authentication & Gatekeeping:**

- [ ] Auth Gate: Credentials login / registration (email + password) required before accessing the Sanctuary.
- [ ] On successful signup, auto-generate unique 9-digit numeric `traveler_uid` (e.g. `802941042`) alongside `username`.
- [ ] Profile creation with chosen `avatar_element` (Anemo, Electro, Geo, Pyro, Hydro, Cryo, Dendro).
- [ ] Auto-login session retention via Supabase Auth encrypted token store.

**Traveler ID Search & Sanctuary Linking:**

- [ ] `sanctuary_links` table (pairing invitations):
  ```sql
  CREATE TABLE sanctuary_invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES profiles(id) NOT NULL,
    recipient_id UUID REFERENCES profiles(id) NOT NULL,
    status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMPTZ DEFAULT now()
  );
  ```
- [ ] Search endpoint / RPC: `search_traveler(query TEXT)` — finds Travelers by exact `traveler_uid` or `@username` (returns public profile card with elemental badge and resonance status).
- [ ] Link actions:
  1. **Direct UID Request**: Traveler A searches Traveler B's UID → taps "Send Sanctuary Link" → Traveler B receives real-time modal / push notification to accept.
  2. **6-Digit Pairing Code fallback**: 10-minute expiring code with rate limiting (5 attempts per window).
- [ ] On link acceptance: Creates a shared `sanctuaries` record and updates both Travelers' `profiles.sanctuary_id`.

**Dev Seed Script:**

- [ ] Creates two Supabase Auth users (`mikkie@komorebi.dev` [UID: 801124501], `zian@komorebi.dev` [UID: 802931402]).
- [ ] Creates a paired Sanctuary with sample commissions across commission types.
- [ ] Seeds moods, energy levels, and a sealed Wish for testing.

**APK Build & Packaging Target:**
- [ ] Gradle build targets:
  - `./gradlew assembleDebug` → produces installable `app-debug.apk` for testing directly on any physical Android device or emulator.
  - `./gradlew bundleRelease` → produces signed production `.aab` / `.apk`.

**Tests (Phase 1):**

- [ ] Unit: Repository layer — auth gate, UID search query, pairing validation, RLS bypass attempts.
- [ ] Integration: Supabase RLS policies verified via direct SQL with different JWT contexts.

> **🛑 STOP.** Verify schema, RLS rules, auth flow, and pairing logic before advancing.

---

### Phase 2: Commission Board — Offline-First Calendar & Real-Time Sync

> *"The Commission Board updates across all of Teyvat, even without a Waypoint nearby."*

**Room Database (Offline SSOT):**

- [ ] Entities: `CommissionEntity`, `ProfileEntity`, `SyncQueueEntity`
- [ ] `SyncQueueEntity` outbox: `id`, `table_name`, `row_id`, `operation` (INSERT/UPDATE/DELETE), `payload_json`, `created_at`, `retry_count`, `last_error`
- [ ] Room `AutoMigration` spec defined from v1 schema baseline.

**Calendar Grid UI:**

- [ ] 7-column month grid (Compose `LazyVerticalGrid`):
  - **Commission Pills** inside date cells: rounded pill with elemental color fill.
    - Anemo teal → Mikkie's commissions
    - Electro violet → Zian's commissions
    - Geo amber → Joint / Hangout events
  - Wish-sealed commissions: shimmer pill with `"✦ Wish Sealed"` label.
  - Today highlight: subtle glow ring in `--geo-amber`.

- [ ] **Element Filter Chips**: `All ✦` | `Anemo 🌿` (Mikkie) | `Electro ⚡` (Zian) | `Hangout 💜` (Together)

- [ ] Swipe gestures: Left/right to navigate months with shared-element date header transition.

**Commission CRUD:**

- [ ] Bottom sheet with:
  - Title input with character limit (50)
  - Emoji selector (custom grid of 60 curated + recent row, NOT system picker)
  - Commission type selector (Daily / Archon Quest / Hangout / Custom)
  - Date/time pickers (Material3 DatePicker, TimePicker)
  - Virtual date toggle
  - Wish seal toggle (with confirmation: "Seal this as a Wish? Your Traveler won't see details until the day arrives ✦")
  - Assign to: Self / Partner / Both
- [ ] All mutations write to Room first → enqueue to `SyncQueueEntity` → `WorkManager` flushes outbox.
- [ ] Validation: title required, end ≥ start, no past-date commissions unless archon_quest type.

**Real-Time Sync:**

- [ ] Supabase Realtime WebSocket listener on `commissions` and `profiles` tables.
- [ ] Incoming changes: compare `version` column → only apply if remote `version > local version`.
- [ ] Conflict detected (local outbox has pending mutation for same row): surface merge bottom sheet.
- [ ] Offline → Online transition: flush outbox immediately via `WorkManager` one-time request.

**Tests (Phase 2):**

- [ ] Unit: Room DAO queries, outbox queue/dequeue, conflict detection logic.
- [ ] UI: Compose test — calendar renders correct pills for sample data, filter chips filter correctly.
- [ ] Integration: Bidirectional sync — create commission on device A, verify appearance on device B via Supabase Realtime.

> **🛑 STOP.** Test bidirectional sync, offline queue flush, and conflict resolution before Phase 3.

---

### Phase 3: Elemental Resonance — LDR Features & Push Notifications

> *"When two elements resonate, the bond transcends distance."*

**Elemental Burst Gauge (Mood & Energy):**

- [ ] 1–10 slider with dynamic mood tiers:
  | Range | Emoji | Label | Element Color |
  |---|---|---|---|
  | 1–3 | 🪫 | Resin Depleted | `--pyro-rose` |
  | 4–6 | ☕ | Resting at Waypoint | `--hydro-blue` |
  | 7–10 | ⚡ | Burst Ready! | `--electro-violet` |
- [ ] Circular radial gauge visualization (Compose `Canvas` arc draw).
- [ ] Real-time update: partner's gauge appears in the app bar as a live badge.
- [ ] Writes to `profiles.energy_level` + `profiles.mood_emoji` → synced via Realtime.

**Dual-Timezone Constellation Strip:**

- [ ] Horizontal ribbon showing both Travelers' local times.
- [ ] "Elemental Resonance Window" — computed overlap of both Travelers' likely-awake hours (configurable 8am–12am default), highlighted in `--geo-amber`.
- [ ] Rendered as a 24h horizontal bar with wake/sleep zones + current-time markers.

**Archon Quest Countdown:**

- [ ] Pinned full-width banner card at the top of the calendar.
- [ ] Gradient: `--geo-amber` → `--electro-violet` (animated gradient shift, 8s loop).
- [ ] Shows: reunion/milestone name, D-Day count, and a progress bar (days elapsed / total days).
- [ ] Tap to expand: notes, linked commissions, shared memories (future phase).

**FCM Push Notifications:**

- [ ] Supabase Database Webhook → Edge Function → FCM HTTP v1 API.
- [ ] Triggers:
  - Partner updates mood/energy → "Mikkie is now ⚡ Burst Ready!"
  - New commission created → "New Commission from Zian: Movie Night 🎬"
  - D-Day milestone reached → "🎉 100 days until reunion!"
  - Wish sealed for you → "✦ A new Wish has appeared on your banner..."
- [ ] `FirebaseMessagingService.onNewToken()` → upsert `profiles.fcm_token` via Supabase.
- [ ] Notification channels: `commissions`, `mood_updates`, `milestones` (user can mute per channel).

**Tests (Phase 3):**

- [ ] Unit: Timezone overlap calculation, mood tier mapping, D-Day arithmetic.
- [ ] Integration: FCM payload delivery verification (Firebase Test Lab or local emulator).
- [ ] UI: Mood gauge renders correct arc fill and color for each tier.

> **🛑 STOP.** Verify push payloads, live mood syncing, timezone calculations, and D-Day accuracy.

---

### Phase 4: Komorebi Widget — Jetpack Glance Lockscreen & Homescreen

> *"Even on the lockscreen, your Sanctuary is always within reach."*

**Widget Design (Jetpack Glance):**

- [ ] **Layout**: Ultra-minimal frosted glass panel inspired by the reference image:
  - Top row: Live clock (Cinzel 48sp) + partner mood badge
  - Middle: Mini 7-column calendar grid (current week only, Commission pills as colored dots)
  - Bottom: Next upcoming commission title + relative time ("in 2h") + D-Day counter
  - Background: `--abyss-ink` with `--cryo-frost` frosted glass overlay (12dp corner radius)

- [ ] **Sizes**: Small (2×2), Medium (4×2), Large (4×3) with adaptive layouts.

**Dynamic Data Binding:**

- [ ] Next shared commission + relative start time
- [ ] Archon Quest D-Day countdown
- [ ] Partner's live mood: `"Mikkie: 🪫 4/10 Resin Depleted"`
- [ ] "Last synced: 3 min ago" footer text (transparency for stale data)

**Refresh Architecture:**

- [ ] `WorkManager` periodic (15 min) → update Glance state.
- [ ] FCM data payload → `WorkManager` one-time request → immediate Glance refresh.
- [ ] Foreground service fallback: if `WorkManager` hasn't run in 30+ min (OEM kill), start a minimal foreground service to sync + update widget, then self-stop.
- [ ] Onboarding prompt: "For the best experience, disable battery optimization for Komorebi" with direct intent to settings.

**Deep-Link Navigation:**

- [ ] Tap on commission → opens app to that calendar day.
- [ ] Tap on D-Day banner → opens Archon Quest detail.
- [ ] Tap on mood badge → opens mood update sheet.

**Final Audit:**

- [ ] Security: grep for hardcoded strings, verify `BuildConfig` injection, confirm no plaintext secrets.
- [ ] ProGuard/R8 rules for Supabase + Glance.
- [ ] Accessibility: all interactive elements have content descriptions, minimum 48dp touch targets.
- [ ] Performance: Baseline Profile generation for cold-start optimization.

**Tests (Phase 4):**

- [ ] Glance preview tests (Compose Glance testing library).
- [ ] WorkManager integration: verify widget updates after sync.
- [ ] Deep-link navigation: each widget tap target resolves to the correct Compose destination.

> **🛑 STOP.** Full end-to-end QA pass. Widget on 3+ OEM skins (Samsung, Xiaomi, Pixel). All phases verified.

---

## ✦ 6. Execution Rules for AI

1. Provide the complete setup and code for **Phase 1 ONLY**.
2. Write production-ready Kotlin and PostgreSQL code — no placeholders, no truncated `// TODO` blocks.
3. Explicitly state file locations and Gradle dependencies for every code block.
4. Every phase must include runnable tests. No phase ships without test coverage.
5. Conclude each phase with a deliverables summary and prompt for review before advancing.
6. If a design decision is ambiguous, flag it and propose two options — don't silently pick one.

---

## ✦ 7. File Structure (Expected)

```
app/
├── src/main/
│   ├── java/dev/komorebi/sync/
│   │   ├── di/                          # Hilt modules
│   │   ├── data/
│   │   │   ├── local/                   # Room DB, DAOs, entities
│   │   │   ├── remote/                  # Supabase client, DTOs
│   │   │   └── repository/             # Repository implementations
│   │   ├── domain/
│   │   │   ├── model/                   # Domain models
│   │   │   └── usecase/                # Use cases
│   │   ├── ui/
│   │   │   ├── theme/                   # Teyvat Codex theme (colors, type, shapes)
│   │   │   ├── calendar/               # Commission Board screen
│   │   │   ├── auth/                    # Login, signup, pairing
│   │   │   ├── mood/                    # Elemental Burst gauge
│   │   │   └── components/             # Shared composables
│   │   ├── widget/                      # Jetpack Glance widget
│   │   ├── sync/                        # WorkManager workers, FCM service
│   │   └── MainActivity.kt
│   └── res/
│       ├── values/colors.xml            # Elemental palette XML fallbacks
│       └── xml/widget_provider.xml
├── supabase/
│   ├── migrations/
│   │   └── 001_sanctuary_foundation.sql # Phase 1 schema
│   ├── seed.sql                         # Dev seed data
│   └── functions/
│       └── notify-partner/index.ts      # FCM Edge Function
└── build.gradle.kts
```

---

*"Like sunlight filtering through sacred leaves, travelers who share a Sanctuary are never truly apart."*
