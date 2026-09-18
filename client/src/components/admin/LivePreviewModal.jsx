import React, { useState } from 'react';
import { X, Smartphone, Monitor, Tablet, ExternalLink, RefreshCw } from 'lucide-react';

export const LivePreviewModal = ({ isOpen, onClose }) => {
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
  const [key, setKey] = useState(0);

  if (!isOpen) return null;

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[800px]';
      case 'desktop':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4">
      {/* Top Controls Bar */}
      <div className="w-full max-w-6xl bg-[#141619] text-white rounded-t-3xl px-6 py-3.5 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-tight font-heading">Live Portfolio Preview</span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono border border-zinc-700">
            Realtime Frame
          </span>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors font-medium ${
              device === 'desktop' ? 'bg-zinc-800 text-white shadow-xs font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors font-medium ${
              device === 'tablet' ? 'bg-zinc-800 text-white shadow-xs font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors font-medium ${
              device === 'mobile' ? 'bg-zinc-800 text-white shadow-xs font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey(k => k + 1)}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700/60 transition-colors"
          >
            <span>Open in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Viewer */}
      <div className="w-full max-w-6xl h-[80vh] bg-[#0A0B0D] rounded-b-3xl overflow-hidden flex items-center justify-center p-4 border border-t-0 border-zinc-800">
        <div className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 ${getDeviceWidth()}`}>
          <iframe
            key={key}
            src="/"
            title="Live Portfolio Preview"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
