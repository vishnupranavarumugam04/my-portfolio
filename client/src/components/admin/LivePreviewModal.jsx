import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PortfolioPage } from '../../pages/PortfolioPage';

export const LivePreviewModal = ({ isOpen, onClose, data }) => {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="w-full max-w-6xl bg-[#141619] text-white rounded-t-3xl px-6 py-4 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-tight font-heading">Portfolio Live Preview</span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono border border-emerald-800 flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Preview
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 hover:text-white transition-all border border-zinc-700/80 active:scale-95"
          title="Close Preview (Esc)"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Full Preview Body */}
      <div className="w-full max-w-6xl h-[84vh] bg-[#0A0B0D] rounded-b-3xl overflow-hidden border border-t-0 border-zinc-800 flex flex-col">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#0A0B0D]">
          <PortfolioPage previewData={data} />
        </div>
      </div>
    </div>
  );
};
