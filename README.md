# Happy Birthday Dipsy Website 🎂

A personalized Single Page Application (SPA) birthday card.

## Project Structure

```
dipsy-birthday-website/
├── index.html              # Main entry point
├── styles/
│   ├── main.css            # Core styling
│   └── animations.css      # Keyframes for background/audio
├── scripts/
│   ├── main.js             # Main entry, confetti logic
│   ├── navigation.js       # Handles page switching logic
│   └── audio-player.js     # Handles YouTube iframe API (Fixed)
├── data/
│   └── messages.json       # All birthday messages and song IDs
└── assets/                 # Folder for future images/audio
```

## How to Run

⚠️ **Important:** Because this project uses `fetch` to load the JSON data and ES6 Modules (`import`/`export`), it **will not work** if you just double-click `index.html`.

1.  Open this folder in **VS Code**.
2.  Install the **"Live Server"** extension (by Ritwick Dey) if you haven't already.
3.  Right-click `index.html` and select **"Open with Live Server"**.

## Audio Troubleshooting
If audio still does not play:
1. Ensure you click the "Open Birthday Card" button (browsers block audio until you interact).
2. Check if an Ad Blocker is active (it might block the hidden YouTube player).
