import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Calendar,
  Layers,
  Camera,
  Download
} from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { activeLightboxItem, closeLightbox, items, openLightbox } = usePortfolio();
  const [zoomLevel, setZoomLevel] = useState(1);

  const photos = items.filter((it) => it.type === 'photo');
  const currentIndex = activeLightboxItem
    ? photos.findIndex((p) => p.id === activeLightboxItem.id)
    : -1;

  useEffect(() => {
    setZoomLevel(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
        openLightbox(photos[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        openLightbox(photos[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem, currentIndex, photos, closeLightbox, openLightbox]);

  if (!activeLightboxItem) return null;

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      openLightbox(photos[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      openLightbox(photos[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            {activeLightboxItem.category}
          </span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            {currentIndex + 1} of {photos.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <a
            href={activeLightboxItem.url}
            download={activeLightboxItem.title}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white"
            title="Download Full Resolution"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={closeLightbox}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white"
            title="Close Preview (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black text-white hover:text-amber-400 transition-colors"
          title="Previous Photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black text-white hover:text-amber-400 transition-colors"
          title="Next Photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Stage */}
      <div className="relative max-w-6xl w-full h-[78vh] flex items-center justify-center p-4 overflow-hidden">
        <img
          src={activeLightboxItem.url}
          alt={activeLightboxItem.title}
          referrerPolicy="no-referrer"
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-200 select-none"
        />
      </div>

      {/* Bottom Metadata Drawer */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-3xl mx-auto backdrop-blur-md bg-black/80 border border-white/10 p-4 sm:p-5 rounded-2xl text-left space-y-1 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white">
            {activeLightboxItem.title}
          </h2>
          <span className="text-xs font-mono text-zinc-400">
            {activeLightboxItem.dimensions || 'Ultra-HD'}
          </span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {activeLightboxItem.description}
        </p>
        <div className="pt-2 flex items-center gap-4 text-[11px] text-zinc-400 font-mono">
          <span>Captured by DHINESH KUMAR</span>
          <span>·</span>
          <span>{new Date(activeLightboxItem.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
