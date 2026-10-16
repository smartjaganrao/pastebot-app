import { app, BrowserWindow, Menu, Tray, ipcMain, clipboard, nativeImage } from 'electron';
import path from 'path';
import Store from 'electron-store';

const store = new Store();

let mainWindow: BrowserWindow | null;
let tray: Tray | null;
let clipboardInterval: NodeJS.Timer | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer.html'));
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const createTray = () => {
  const trayPath = path.join(__dirname, 'assets/tray-icon.png');
  tray = new Tray(trayPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        } else {
          createWindow();
        }
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    } else {
      createWindow();
    }
  });
};

const monitorClipboard = () => {
  let lastText = clipboard.readText();
  let lastImageDataUrl = '';

  clipboardInterval = setInterval(() => {
    try {
      const image = clipboard.readImage();
      if (!image.isEmpty()) {
        const dataUrl = image.toDataURL();
        const imgHash = dataUrl.substring(0, 200);
        if (imgHash !== lastImageDataUrl) {
          lastImageDataUrl = imgHash;
          lastText = '';
          addClipping({ type: 'image', dataUrl });
          return;
        }
      } else {
        lastImageDataUrl = '';
      }

      const currentText = clipboard.readText();
      if (currentText !== lastText && currentText.trim()) {
        lastText = currentText;
        addClipping({ type: 'text', text: currentText });
      }
    } catch (error) {
      console.error('Clipboard error:', error);
    }
  }, 500);
};

type ClippingInput =
  | { type: 'text'; text: string }
  | { type: 'image'; dataUrl: string };

const addClipping = (input: ClippingInput) => {
  const clippings = (store.get('clippings') as any[]) || [];
  const base = { id: Date.now(), timestamp: new Date().toISOString() };
  const newClipping =
    input.type === 'text'
      ? { ...base, type: 'text', text: input.text }
      : { ...base, type: 'image', dataUrl: input.dataUrl };

  clippings.unshift(newClipping);
  if (clippings.length > 500) clippings.pop();

  store.set('clippings', clippings);
  if (mainWindow) {
    mainWindow.webContents.send('clippings-updated', clippings);
  }
};

ipcMain.handle('get-clippings', () => {
  return store.get('clippings') || [];
});

ipcMain.handle('delete-clipping', (_event, id: number) => {
  const clippings = (store.get('clippings') as any[]) || [];
  const filtered = clippings.filter(c => c.id !== id);
  store.set('clippings', filtered);
  return filtered;
});

ipcMain.handle('paste-clipping', (_event, payload: { type: string; text?: string; dataUrl?: string }) => {
  if (payload.type === 'image' && payload.dataUrl) {
    const img = nativeImage.createFromDataURL(payload.dataUrl);
    clipboard.writeImage(img);
  } else if (payload.text) {
    clipboard.writeText(payload.text);
  }
  return true;
});

ipcMain.handle('clear-all', () => {
  store.set('clippings', []);
  return [];
});

app.on('ready', () => {
  createWindow();
  try {
    createTray();
  } catch (err) {
    console.error('Tray creation failed:', err);
  }
  monitorClipboard();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
