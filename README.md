# ⚾ Zürich Barracudas — Sports PWA

> A full-featured Progressive Web App built for the **Zürich Barracudas Baseball Club**, competing in NL Baseball Gruppe A. The app delivers live scores, AI-generated game recaps, push notifications, and a complete admin dashboard — all in three languages.

🌐 **Live Site:** [barracudas3.netlify.app](https://barracudas3.netlify.app)

---

## 🚀 Features

### 🔴 Live Scores & Game Tracking
- Real-time game scores powered by the **EasyScore API**
- Interactive baseball diamond UI showing live play-by-play
- Full season schedule with upcoming game countdowns

### 🤖 AI-Powered Game Recaps
- Automatic post-game summaries generated using a **Large Language Model**
- Recaps are contextualised with player stats, score progression, and key moments
- Published automatically after each game ends

### 🏆 Automated Awards Engine
- End-of-game award detection: **MVP, Golden Glove, Silver Slugger, Cy Young**
- Awards calculated from real in-game statistics
- Displayed on player profile cards with full season data

### 📲 Progressive Web App (PWA)
- Fully installable on iOS and Android — no App Store needed
- Offline-ready with service worker caching
- Push notifications via **OneSignal** for live scores, results, and news
- Notification bell in navbar with subscribe/unsubscribe toggle

### 🌍 Multilingual (EN / ES / DE)
- Full trilingual support across all pages
- Critical for Zürich's international and German-speaking user base

### 📸 Instagram Feed Integration
- Live Instagram feed embedded via **Behold** API
- Auto-refreshed club photos and highlights

### 🛠️ Admin Dashboard
- Protected admin panel for club staff
- Manual push notification sender (title, message, target URL)
- Game recap editor and publishing controls
- Player stats management

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend / API | Netlify Functions (Serverless) |
| Live Scores | EasyScore API |
| AI Recaps | LLM API (prompt-engineered) |
| Push Notifications | OneSignal SDK v16 |
| Instagram Feed | Behold API |
| Hosting & CI/CD | Netlify (auto-deploy from Git) |
| Environment Variables | Netlify Environment Config |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│           Client (Browser)          │
│  HTML + CSS + Vanilla JS + PWA SW   │
└──────────────┬──────────────────────┘
               │
       ┌───────▼────────┐
       │ Netlify Hosting │  ← Auto-deploy on Git push
       │ + CDN           │
       └───────┬─────────┘
               │
    ┌──────────▼──────────┐
    │  Netlify Functions  │  ← Serverless backend
    │  (send-notification │
    │   score-update etc) │
    └──┬──────┬───────────┘
       │      │
  ┌────▼─┐  ┌─▼──────────┐
  │ Easy │  │  OneSignal │
  │Score │  │    API     │
  │ API  │  └────────────┘
  └──────┘
```

---

## ⚙️ Local Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/barracudas.git
cd barracudas

# Install Netlify CLI
npm install -g netlify-cli

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Run locally with Netlify Dev (includes serverless functions)
netlify dev
```

### Required Environment Variables

```env
EASYSCORE_API_KEY=your_key_here
ONESIGNAL_REST_API_KEY=your_key_here
BEHOLD_FEED_ID=your_feed_id_here
AI_API_KEY=your_key_here
```

---

## 📁 Project Structure

```
barracudas/
├── index.html              # Main entry point
├── assets/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript modules
│   │   ├── scores.js       # EasyScore API integration
│   │   ├── notifications.js# OneSignal logic
│   │   ├── recaps.js       # AI recap rendering
│   │   └── awards.js       # Awards engine
│   └── img/                # Images and logos
├── netlify/
│   └── functions/
│       ├── send-notification.js  # Push notification sender
│       └── generate-recap.js     # AI recap trigger
├── admin/
│   └── index.html          # Protected admin panel
└── manifest.json           # PWA manifest
```

---

## 🧠 Technical Decisions & Learnings

**Why Vanilla JS over a framework?**
The app needed to be extremely fast on mobile networks and installable as a PWA. Vanilla JS gave full control over the service worker, bundle size, and performance — no build step required.

**Why Netlify Functions for the backend?**
The app has backend needs (sending push notifications, calling AI APIs with secret keys) but doesn't require a full server. Netlify Functions provided serverless endpoints with zero infrastructure management and secure environment variable handling.

**Why EasyScore API?**
It's the most reliable source of real-time baseball stats for European leagues. The integration required building a custom diamond UI to visualise the live data in a sport-specific format.

**Multilingual from day one**
Zürich has a large English and Spanish-speaking expat community alongside native German speakers. Supporting EN/ES/DE wasn't an afterthought — it was a requirement from the first commit.

---

## 📊 Results

- ✅ Live in production for the 2026 season
- ✅ Used actively by players, coaches, and fans of the club
- ✅ Push notification subscribers growing each game
- ✅ NL Baseball Gruppe A Champions

---

## 👨‍💻 Author

**Kelvis Garcia**
Junior Web Developer | Zürich, Switzerland
[LinkedIn] www.linkedin.com/in/kelvis-garcia-79812ab2

---

## 📄 License

This project was built for Zürich Barracudas Baseball Club. All rights reserved.
