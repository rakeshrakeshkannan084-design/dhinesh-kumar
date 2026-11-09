import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Download,
  FileText,
  FileSpreadsheet,
  FileArchive,
  Calendar,
  HardDrive,
  Tag,
  CheckCircle2
} from 'lucide-react';

export const DocumentPreviewModal: React.FC = () => {
  const { activeDocItem, closeDocPreview } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDocPreview();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeDocPreview]);

  if (!activeDocItem) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activeDocItem.url || `/api/documents/download/${activeDocItem.fileName || 'doc'}`;
    link.download = activeDocItem.fileName || `${activeDocItem.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#121218] border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                {activeDocItem.category}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {activeDocItem.title}
              </h2>
            </div>
          </div>
          <button
            onClick={closeDocPreview}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Metadata Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <div className="text-[10px] text-zinc-500 font-mono uppercase">Format</div>
            <div className="text-xs font-bold text-white uppercase font-mono">
              {activeDocItem.fileExtension || 'PDF'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <div className="text-[10px] text-zinc-500 font-mono uppercase">File Size</div>
            <div className="text-xs font-bold text-white font-mono">
              {formatFileSize(activeDocItem.sizeBytes)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1 col-span-2 sm:col-span-1">
            <div className="text-[10px] text-zinc-500 font-mono uppercase">Verified Date</div>
            <div className="text-xs font-bold text-white font-mono">
              {new Date(activeDocItem.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Synopsis / Scope */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Document Overview
          </label>
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
            {activeDocItem.description}
          </div>
        </div>

        {/* Tags */}
        {activeDocItem.tags && activeDocItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {activeDocItem.tags.map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Download Action Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
          <div className="text-[11px] text-zinc-500 font-mono">
            Dhinesh Kumar Production Vault
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Original File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
