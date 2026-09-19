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
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#0A0B0D] animate-in fade-in duration-200">
      {/* Floating High-Z-Index Close Pill */}
      <div className="fixed top-5 right-5 z-[100000] flex items-center gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/95 hover:bg-black text-white text-xs font-bold shadow-2xl border-2 border-white/40 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-black/30"
          title="Close Preview (Esc)"
        >
          <span>Close Preview</span>
          <X className="w-4 h-4 text-zinc-300" />
        </button>
      </div>

      {/* Full Real-Time Portfolio View */}
      <div className="w-full min-h-screen">
        <PortfolioPage previewData={data} />
      </div>
    </div>
  );
};
