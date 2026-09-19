import React, { useState } from 'react';
import { X, Smartphone, Monitor, Tablet, ExternalLink } from 'lucide-react';
import { PortfolioPage } from '../../pages/PortfolioPage';

export const LivePreviewModal = ({ isOpen, onClose, data }) => {
  const [device, setDevice] = useState('desktop');

  if (!isOpen) return null;

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return 'w-[390px] h-[720px]';
      case 'tablet':
        return 'w-[768px] h-[820px]';
      case 'desktop':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Top Controls Bar */}
      <div className="w-full max-w-6xl bg-[#141619] text-white rounded-t-3xl px-6 py-3.5 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-tight font-heading">Real-Time Live Preview</span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono border border-emerald-800 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live In-Sync
          </span>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            type="button"
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
            type="button"
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
            type="button"
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
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Viewer */}
      <div className="w-full max-w-6xl h-[82vh] bg-[#0A0B0D] rounded-b-3xl overflow-hidden flex items-center justify-center p-3 border border-t-0 border-zinc-800">
        <div className={`transition-all duration-300 rounded-2xl overflow-y-auto overflow-x-hidden shadow-2xl border border-zinc-800 bg-[#0A0B0D] ${getDeviceWidth()}`}>
          <PortfolioPage previewData={data} />
        </div>
      </div>
    </div>
  );
};
