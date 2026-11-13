jojo PRIVATE — iPhone-only offline web starter

IMPORTANT: This is a working OFFLINE RULE-BASED ASSISTANT, NOT A GENERATIVE AI MODEL.
No cloud AI, no server-side storage, no network calls for chat, no microphone, no analytics.
Chat, notes and tasks persist in the browser's localStorage. The app does not encrypt this storage.

INSTALL WITHOUT A MAC:
1. On iPhone Safari, visit https://dash.cloudflare.com and create a free account if needed.
2. Go to Workers & Pages -> Create application -> Pages -> Direct Upload / drag-and-drop.
3. Upload this ZIP archive as the static asset bundle. (The archive's root contains index.html.)
   On small iPhone screens, Cloudflare dashboard upload may need Safari's Request Desktop Website.
4. Deploy, then open your newly assigned <project>.pages.dev URL in Safari.
5. Safari Share -> Add to Home Screen -> Open as Web App -> Add.
6. Open jojo while online once so the offline cache populates; then try Airplane Mode.

PRIVACY:
- Cloudflare Pages hosts the static code, so site availability is public. DO NOT upload personal data with these files.
- The developer of this app did not include analytics, cloud AI, or message uploads. The hosting company can see requests to retrieve static files.
- Your messages, saved notes and tasks remain in on-device browser storage unless browser/iOS processes sync or back up app data.
- The site is not password protected. Anyone who has your unlocked phone and can access the app may read messages.
- Safari can clear website data, evict storage, or separate storage per Home Screen app; avoid using this as your only copy of important notes.
- Never enter company secrets, passwords or other sensitive information.
- If you want general-purpose AI like Qwen3, that REQUIRES an additional on-device model runtime not implemented here.

FILES:
index.html interface
app.js local assistant logic
style.css styles
sw.js offline app cache
manifest.webmanifest app metadata
icon.png app icon
