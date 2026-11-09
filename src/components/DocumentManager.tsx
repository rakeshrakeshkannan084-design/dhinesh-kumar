import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioItem } from '../types';
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  Download,
  Search,
  Plus,
  Trash2,
  Eye,
  Check,
  X,
  AlertCircle,
  FolderOpen
} from 'lucide-react';

export const DocumentManager: React.FC = () => {
  const {
    items,
    categories,
    openDocPreview,
    isAdmin,
    addItem,
    removeItem
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Project Briefs');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Filter documents
  const documents = items.filter((it) => it.type === 'document');
  const filteredDocs = documents.filter((doc) => {
    const matchesCat = activeCategory === 'All' || doc.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.fileName && doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getFileIcon = (ext?: string) => {
    const e = (ext || '').toLowerCase();
    if (e === 'pdf') return <FileText className="w-6 h-6 text-rose-400" />;
    if (e === 'xlsx' || e === 'xls' || e === 'csv') return <FileSpreadsheet className="w-6 h-6 text-emerald-400" />;
    if (e === 'zip' || e === 'rar' || e === 'tar') return <FileArchive className="w-6 h-6 text-amber-400" />;
    return <FileCode className="w-6 h-6 text-indigo-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 KB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      if (!uploadTitle) {
        setUploadTitle(file.name);
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      setUploadError('Document title is required.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      const ext = uploadFile ? uploadFile.name.split('.').pop() || 'pdf' : 'pdf';
      await addItem({
        type: 'document',
        title: uploadTitle.trim(),
        description: uploadDescription.trim(),
        category: uploadCategory,
        fileName: uploadFile?.name || uploadTitle,
        fileExtension: ext,
        sizeBytes: uploadFile?.size || 1500000,
        mimeType: uploadFile?.type || 'application/pdf',
        externalUrl: `/api/documents/download/${uploadTitle.replace(/\s+/g, '_')}`,
        downloadCount: 0,
        featured: false,
        tags: [uploadCategory, ext.toUpperCase()]
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setUploadTitle('');
        setUploadDescription('');
        setUploadFile(null);
      }, 1200);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (doc: PortfolioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // Create direct simulated download anchor
    const link = document.createElement('a');
    link.href = doc.url || `/api/documents/download/${doc.fileName || 'document'}`;
    link.download = doc.fileName || `${doc.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await removeItem(id);
      } catch (err: any) {
        alert(err.message || 'Error deleting document');
      }
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-wider">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Digital Assets & Production Files</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            Documents & File Manager
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Download client rate sheets, master service agreements, resumes, tech specs, and custom 3D LUT film emulation packs directly from Dhinesh Kumar's vault.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.documents.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search documents by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Document List / Grid */}
      {filteredDocs.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
          <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-semibold text-zinc-300">No documents found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search criteria or upload a new contract, PDF, or specification document.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => openDocPreview(doc)}
              className="group relative rounded-2xl p-5 border border-zinc-800/90 bg-[#121216] cursor-pointer shadow-lg hover:border-amber-500/50 hover:bg-zinc-900/70 transition-all flex items-start gap-4"
            >
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 shrink-0">
                {getFileIcon(doc.fileExtension)}
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {formatFileSize(doc.sizeBytes)}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {doc.title}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Updated {new Date(doc.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDocPreview(doc);
                      }}
                      title="Inspect Document"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={(e) => handleDownload(doc, e)}
                      title="Download File"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold transition-all shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Download</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={(e) => handleDelete(doc.id, e)}
                        title="Delete Document"
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950/60 text-zinc-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#121218] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Upload Document</h2>
                  <p className="text-xs text-zinc-400">PDF, DOCX, XLSX, PPTX, or ZIP files</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Document published to files vault!</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50 space-y-2">
                <label className="text-xs font-medium text-zinc-300 block">
                  Select Document File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-zinc-950 hover:file:bg-amber-300 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Service Agreement 2026.pdf"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {categories.documents.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Outline key clauses, rates, or technical specifications..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Save Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
