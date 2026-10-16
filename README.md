# PasteBot - Clipboard Manager for macOS

A lightweight, fast clipboard history manager for macOS built with Electron, React, and TypeScript.

## Features

✅ **Clipboard History** - Automatically tracks everything you copy  
✅ **Search** - Quickly find previous clippings  
✅ **Quick Paste** - One-click paste from history  
✅ **Clean UI** - Minimal, distraction-free interface  
✅ **Local Storage** - All data stored locally on your machine  
✅ **Fast** - Monitors clipboard every 500ms  

## Installation

```bash
npm install
```

## Development

Build the project:
```bash
npm run build
```

Build in watch mode:
```bash
npm run dev
```

Run the app:
```bash
npm run dev-start
```

Or build and run in one command:
```bash
npm start
```

## How It Works

1. **Copy text** anywhere on your Mac
2. **App monitors** your clipboard automatically
3. **View history** in the PasteBot window
4. **Search** through your clippings
5. **Click to paste** any previous clipping back to clipboard

## Project Structure

```
pastebot-app/
├── src/
│   ├── main.ts              # Electron main process
│   ├── preload.ts           # IPC security layer
│   ├── renderer/            # React UI
│   │   ├── App.tsx          # Main component
│   │   ├── App.css          # Styles
│   │   └── index.tsx        # React entry point
│   └── renderer.html        # HTML template
├── dist/                    # Built files
├── webpack.config.js        # Webpack configuration
└── tsconfig.json           # TypeScript configuration
```

## Technologies

- **Electron** - Cross-platform desktop apps
- **React 19** - UI components
- **TypeScript** - Type safety
- **Webpack 5** - Module bundling
- **electron-store** - Persistent data storage

## License

Personal use only.
