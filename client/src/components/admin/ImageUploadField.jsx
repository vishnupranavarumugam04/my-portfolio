import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, Loader2, Link as LinkIcon, RotateCcw } from 'lucide-react';
import { api } from '../../services/api';

export const ImageUploadField = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState(value || '');
  const fileInputRef = useRef(null);

  const displayImage = (!value || value.includes('unsplash.com')) ? '/avatar.jpg' : value;

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

  const handleResetToDefault = () => {
    onChange('/avatar.jpg');
    setCustomUrl('/avatar.jpg');
  };

  return (
    <div className="space-y-4">
      {/* Current Preview Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-2xl bg-[#15181C] border border-zinc-750 shadow-md">
        <div className="w-24 h-28 rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-950 shrink-0 shadow-lg relative group">
          <img
            src={displayImage}
            alt="Hero Portrait"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/avatar.jpg';
            }}
          />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">Profile Portrait Picture</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">Upload your own photo or use your portfolio profile image.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-xs font-semibold transition-colors"
              title="Reset to default /avatar.jpg photo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Use /avatar.jpg</span>
            </button>
          </div>
        </div>
      </div>

      {/* Direct Image URL input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Or enter image URL (e.g. /avatar.jpg or online URL)"
            className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-zinc-750 bg-zinc-950 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
          />
        </div>
        <button
          type="button"
          onClick={handleUrlSubmit}
          className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 rounded-xl text-xs font-bold transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

