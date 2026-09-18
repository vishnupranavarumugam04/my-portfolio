import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, Loader2, Link as LinkIcon } from 'lucide-react';
import { api } from '../../services/api';

const PRESET_AVATARS = [
  { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { label: 'Minimalist Portrait', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Modern Developer', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Architect / Designer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' }
];

export const ImageUploadField = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await api.uploadImage(file);
      onChange(url);
      setCustomUrl(url);
    } catch (err) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Preview */}
      <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
        <div className="w-20 h-24 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 shrink-0 shadow-sm">
          <img
            src={value || '/avatar.jpg'}
            alt="Hero Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/avatar.jpg';
            }}
          />
        </div>
        <div className="flex-1 space-y-2.5">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">Hero Portrait Image</p>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct URL input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Or enter direct image URL (https://... or data:image/...)"
            className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
          />
        </div>
        <button
          type="button"
          onClick={handleUrlSubmit}
          className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/60 rounded-xl text-xs font-bold transition-colors"
        >
          Apply URL
        </button>
      </div>

      {/* Preset Picker */}
      <div>
        <label className="block text-[11px] font-mono font-bold uppercase text-zinc-400 mb-2">Preset Portraits</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_AVATARS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onChange(preset.url);
                setCustomUrl(preset.url);
              }}
              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                value === preset.url
                  ? 'border-zinc-400 bg-zinc-800 text-white shadow-xs'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <img src={preset.url} alt={preset.label} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-[11px] font-medium truncate">{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
