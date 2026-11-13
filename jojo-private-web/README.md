# jojo Private — iPhone Safari Web App (Starter)

## What this is
A real standalone, responsive, installable Progressive Web App (PWA). No backend; no accounts; no remote AI APIs; no analytics. Messages and notes are stored in Safari's localStorage. The first version intentionally uses a **simple rule-based assistant**, not a full language model. It can save/show notes, reply to some greetings, and give the time and date. Optional spoken replies use the phone's speech synthesis. No microphone recognition is included because iPhone browser speech recognition may process audio remotely.

## Privacy limitations
- LocalStorage is **not encrypted by this app** and can be deleted by iOS. iPhone device security still matters. Avoid storing passwords, company documents, or sensitive information.
- Exported JSON backup is unencrypted and must be protected.
- Hosting providers see website visits/IP addresses. Static web hosting does not receive chats/notes from this app's code.
- The Content Security Policy blocks outbound connections from app JavaScript (`connect-src 'none'`).
- A website isn't inherently private just because it runs offline. Review any hosting changes and avoid third-party scripts.
- No speech-to-text, wake-word, native app control, phone contacts, files, or full offline AI model in this version.
- After first load from HTTPS and service-worker caching, the PWA can open offline as long as iOS preserves website data. Test in airplane mode.

## How to put jojo on an iPhone without a Mac
1. Put the **contents** of this folder on any HTTPS static host that allows uploading your static website files. Example: GitHub Pages (free; the website files are **public**, but this project includes no personal data). You can create a new **public** GitHub repository called `jojo-private-web`, upload the five website files from iPhone Safari, then Settings → Pages → Deploy from a branch → main / root. Wait for GitHub to provide your exact Pages URL. Never upload personal notes or private information to the repo.
2. Open your hosted HTTPS URL in iPhone Safari.
3. Tap Share → Add to Home Screen → Open as Web App → Add.
4. Open jojo from the Home Screen. Test with airplane mode ON after loading once.

If you don't want even a hosting provider to see your IP address, use a native on-device app instead. Hosting the static application does not upload conversation content, but access logs remain possible.

## Local preview for developers
Serve this folder from localhost (for example `python -m http.server 8000`), then visit http://localhost:8000. The web app's service worker is only registered on HTTPS; localhost preview won't cache it with the current code.

## Files
- `index.html` — all UI and logic
- `manifest.webmanifest` — Home Screen app metadata
- `sw.js` — offline caching
- `icon-192.png`, `icon-512.png` — app icon
