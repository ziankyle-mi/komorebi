# Komorebi 🌿

> A private, real-time couple sanctuary and Android lockscreen companion designed for seamless long-distance connection, photo sharing, live presence, and daily planning.

[![Build Komorebi Android APK](https://github.com/ziankyle-mi/komorebi/actions/workflows/build-apk.yml/badge.svg)](https://github.com/ziankyle-mi/komorebi/actions/workflows/build-apk.yml)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20Web-blue.svg)](https://github.com/ziankyle-mi/komorebi)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Overview

**Komorebi** (*木漏れ日* — sunlight filtering through trees) is a dedicated private companion application built for couples. It bridges distance through shared lockscreen glance widgets, live presence indicators, dynamic timezone-synchronized dual clocks, high-importance system notifications, and a multi-media shared locket.

The application functions both as a standalone web app and as a native Android app powered by Capacitor and custom Java bridges.

---

## ✨ Key Features

### 1. 🕒 Dynamic Real-Time Timezones & Dual World Clocks
- **Automatic Device Timezone Detection**: Automatically resolves each user's IANA timezone and city name via `Intl.DateTimeFormat`.
- **Live Dual Clocks**: Live synchronized clocks displaying both partners' local times (e.g., *You: Manila* and *Partner: Tokyo*) with automatic daylight saving time handling.
- **Persistent Cloud Sync**: Timezones sync seamlessly across Supabase Realtime and local Wi-Fi.

### 2. 📸 Multi-Media Shared Locket & Carousel
- **Flexible Media Sending**: Upload up to **5 photos** or **1 video clip** per drop.
- **Lockscreen & In-App Carousel**: Swipeable touch navigation, pagination indicators (`1/3`), and embedded video playback.
- **Live Lockscreen Glance Widget**: Displays partner's latest photo/video and daily note directly on the Android home/lock screen.

### 3. 💬 Real-Time Messaging & Dynamic Celestial Themes
- **24/7 Realtime Messaging**: Instant message delivery with sender/recipient isolation.
- **Dynamic Sky Physics**: An interactive celestial canvas featuring meteors and stardust particles reactive to the active theme:
  - 🌸 **Sakura Pink**
  - 🌲 **Enchanted Forest**
  - 🌊 **Moonlight Ocean**
- **Instant Live Pings**: Send instant alerts with sender-attributed in-app and system status bar notifications.

### 4. 📱 Native Android System Integration
- **High-Importance Notification Channel**: Uses `NotificationChannel` with sound, vibration, and head-up status bar display.
- **Native Android Widget Provider**: Custom `AppWidgetProvider` rendering remote views for home/lock screen widgets.
- **Hardware Navigation**: Integrated Android hardware and gesture back button handling.

### 5. 🛡️ Security & Privacy
- **Strict Password Authentication**: Secure name and password-gated access with anti-brute-force lockout protection (5 failed attempts trigger a 30-second lockout).
- **Two-User Identity Isolation**: Strict sender/receiver separation for Ziankyle & Mikkie.
- **Zero Third-Party Tracking**: Self-contained architecture without ad trackers or third-party analytics.

### 6. 🔄 Dual-Layer Sync Engine
- **Supabase Realtime Cloud**: Free 24/7 real-time WebSocket database subscriptions.
- **Zero-Config Local LAN Sync**: Automatic local Wi-Fi sync fallback for seamless offline-first performance.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend UI** | HTML5, React 18, Babel Standalone, Vanilla CSS |
| **Mobile Runtime** | Capacitor 8, Android SDK, Java Native Bridge |
| **Widgets & Notifications** | Android `AppWidgetProvider`, `NotificationManagerCompat` |
| **Backend & Sync** | Supabase Realtime (PostgreSQL WebSockets), Local LAN HTTP |
| **CI/CD** | GitHub Actions (`build-apk.yml`) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/ziankyle-mi/komorebi.git
cd komorebi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally in Browser
```bash
python -m http.server 8080 --directory www
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📦 Building the Android APK

### Automated Build (GitHub Actions)
Every commit pushed to the `main` branch automatically triggers an Android build via GitHub Actions.
1. Navigate to the [Actions tab](https://github.com/ziankyle-mi/komorebi/actions).
2. Click on the latest workflow run.
3. Download the `Komorebi-Couple-App` artifact containing `Komorebi.apk`.

### Local Android Build
To build locally using Android Studio:
```bash
# Sync web assets to Android platform
npx cap copy android

# Open project in Android Studio
npx cap open android
```
Inside Android Studio:
- Select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- Locate the output file at `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## ⚙️ Configuration

### Supabase Cloud Sync
To configure or update your Supabase backend:
1. Open the app and navigate to **Profile & Settings**.
2. Under **Cloud Sync Configuration**, supply your:
   - **Supabase URL**: `https://<project-ref>.supabase.co`
   - **Supabase Anon Key**: `<your-publishable-anon-key>`
3. Click **Save Configuration** to establish a live connection.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
