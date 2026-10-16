import React, { useState, useEffect } from 'react';
import './App.css';

interface TextClipping {
  id: number;
  type: 'text';
  text: string;
  timestamp: string;
}

interface ImageClipping {
  id: number;
  type: 'image';
  dataUrl: string;
  timestamp: string;
}

type Clipping = TextClipping | ImageClipping;

declare global {
  interface Window {
    api: {
      getClippings: () => Promise<Clipping[]>;
      deleteClipping: (id: number) => Promise<Clipping[]>;
      pasteClipping: (payload: { type: string; text?: string; dataUrl?: string }) => Promise<boolean>;
      clearAll: () => Promise<void>;
      onClippingsUpdated: (callback: (clippings: Clipping[]) => void) => void;
    };
  }
}

export default function App() {
  const [clippings, setClippings] = useState<Clipping[]>([]);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    loadClippings();
    window.api.onClippingsUpdated(setClippings);
  }, []);

  const loadClippings = async () => {
    const data = await window.api.getClippings();
    setClippings(data);
  };

  const handleDelete = async (id: number) => {
    const updated = await window.api.deleteClipping(id);
    setClippings(updated);
  };

  const handlePaste = async (clip: Clipping) => {
    if (clip.type === 'image') {
      await window.api.pasteClipping({ type: 'image', dataUrl: clip.dataUrl });
    } else {
      await window.api.pasteClipping({ type: 'text', text: clip.text });
    }
    setCopied(clip.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClearAll = async () => {
    if (window.confirm('Clear all clippings?')) {
      await window.api.clearAll();
      setClippings([]);
    }
  };

  const filtered = clippings.filter(c => {
    if (!search) return true;
    if (c.type === 'text') return c.text.toLowerCase().includes(search.toLowerCase());
    return 'image'.includes(search.toLowerCase());
  });

  return (
    <div className="container">
      <div className="header">
        <h1>📋 PasteBot</h1>
        <input
          type="text"
          placeholder="Search clippings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="clippings-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            {clippings.length === 0
              ? 'Start copying text or images to build your history'
              : 'No matches found'}
          </div>
        ) : (
          filtered.map((clip) => (
            <div key={clip.id} className="clipping-item">
              <div className="clipping-content">
                {clip.type === 'image' ? (
                  <>
                    <div className="clipping-image-wrapper">
                      <img
                        src={clip.dataUrl}
                        alt="Clipboard image"
                        className="clipping-image"
                      />
                    </div>
                    <span className="clipping-meta">
                      <span className="clipping-badge">Image</span>
                      <span className="clipping-time">
                        {new Date(clip.timestamp).toLocaleTimeString()}
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <p className="clipping-text">{clip.text.substring(0, 200)}</p>
                    <span className="clipping-meta">
                      <span className="clipping-time">
                        {new Date(clip.timestamp).toLocaleTimeString()}
                      </span>
                    </span>
                  </>
                )}
              </div>
              <div className="clipping-actions">
                <button
                  onClick={() => handlePaste(clip)}
                  className={`btn-paste ${copied === clip.id ? 'copied' : ''}`}
                >
                  {copied === clip.id ? '✓' : 'Copy'}
                </button>
                <button
                  onClick={() => handleDelete(clip.id)}
                  className="btn-delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {clippings.length > 0 && (
        <div className="footer">
          <button onClick={handleClearAll} className="btn-clear">
            Clear All ({clippings.length})
          </button>
        </div>
      )}
    </div>
  );
}
