import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getClippings: () => ipcRenderer.invoke('get-clippings'),
  deleteClipping: (id: number) => ipcRenderer.invoke('delete-clipping', id),
  pasteClipping: (payload: { type: string; text?: string; dataUrl?: string }) =>
    ipcRenderer.invoke('paste-clipping', payload),
  clearAll: () => ipcRenderer.invoke('clear-all'),
  onClippingsUpdated: (callback: (clippings: any[]) => void) =>
    ipcRenderer.on('clippings-updated', (_event, clippings) => callback(clippings))
});
