import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioItem } from '../types';
import {
  Upload,
  Search,
  Filter,
  Maximize2,
  Trash2,
  Edit3,
  Plus,
  Sparkles,
  Camera,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const {
    items,
    categories,
    openLightbox,
    isAdmin,
    addItem,
    updateItem,
    removeItem,
    setActiveTab
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [editingPhoto, setEditingPhoto] = useState<PortfolioItem | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Editorial Fashion');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadDimensions, setUploadDimensions] = useState('3840 x 2160');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  // Filter photos
  const photos = items.filter((it) => it.type === 'photo');
  const filteredPhotos = photos.filter((photo) => {
    const matchesCat = activeCategory === 'All' || photo.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (photo.tags && photo.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select a valid image file (JPG, PNG, WEBP, TIFF).');
        return;
      }
      setUploadFile(file);
      setUploadError(null);
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      setUploadError('Title is required.');
      return;
    }
    if (!uploadPreview && !uploadFile) {
      setUploadError('Please choose a photograph to upload.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      await addItem({
        type: 'photo',
        title: uploadTitle.trim(),
        description: uploadDescription.trim(),
        category: uploadCategory,
        fileName: uploadFile?.name || `${uploadTitle}.jpg`,
        fileData: uploadPreview || undefined,
        dimensions: uploadDimensions,
        mimeType: uploadFile?.type || 'image/jpeg',
        sizeBytes: uploadFile?.size || 2500000,
        featured: false
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setUploadTitle('');
        setUploadDescription('');
        setUploadFile(null);
        setUploadPreview(null);
      }, 1200);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload photo.');
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (photo: PortfolioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPhoto(photo);
    setEditTitle(photo.title);
    setEditDescription(photo.description);
    setEditCategory(photo.category);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    setSavingEdit(true);
    try {
      await updateItem(editingPhoto.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        category: editCategory
      });
      setEditingPhoto(null);
    } catch (err: any) {
      alert(err.message || 'Error updating photo');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this photograph from your gallery?')) {
      try {
        await removeItem(id);
      } catch (err: any) {
        alert(err.message || 'Error deleting photo');
      }
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Curated Fine Art & Editorial Stills</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            Photo Gallery
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            High-fashion editorial campaigns, moody 35mm street captures, and studio portrait masterworks retouched with signature gold and violet color science.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.photos.map((cat) => {
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

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by title, mood, or tag..."
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

      {/* Grid of Photographs */}
      {filteredPhotos.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
          <Camera className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-semibold text-zinc-300">No photographs found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your category filter or search query, or upload a new photo directly to the gallery.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="group relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#121216] cursor-pointer shadow-lg hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <img
                  src={photo.thumbnail || photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Corner Overlay Badges */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(photo);
                    }}
                    title="Fullscreen Preview"
                    className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white border border-white/10"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        onClick={(e) => startEdit(photo, e)}
                        title="Edit Details"
                        className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 hover:text-amber-200 border border-white/10"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(photo.id, e)}
                        title="Delete Photo"
                        className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-rose-400 hover:text-rose-300 border border-white/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>{photo.dimensions || 'High-Res'}</span>
                  <span>{new Date(photo.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#121218] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Upload Photograph</h2>
                  <p className="text-xs text-zinc-400">Add high-resolution media to your creative gallery</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
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
                <span>Photograph uploaded successfully!</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Drag and Drop File Input Area */}
              <div className="relative border-2 border-dashed border-zinc-700 hover:border-amber-400/60 rounded-xl p-4 text-center transition-colors bg-zinc-900/40 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {uploadPreview ? (
                  <div className="space-y-2">
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg object-contain shadow-md"
                    />
                    <div className="text-xs text-amber-400 font-mono">
                      {uploadFile?.name} ({(uploadFile?.size ? (uploadFile.size / 1024 / 1024).toFixed(2) : 0)} MB)
                    </div>
                  </div>
                ) : (
                  <div className="py-6 space-y-2">
                    <Upload className="w-8 h-8 text-zinc-500 mx-auto" />
                    <div className="text-xs font-medium text-zinc-300">
                      Click to browse or drag photograph here
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Supports JPG, PNG, WEBP, TIFF (up to 40MB)
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Photo Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Celestial Golden Hour"
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
                    {categories.photos.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Atmospheric notes, camera gear, lighting setup, or artistic statement..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Publish to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121218] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">Edit Photograph Details</h3>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {categories.photos.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Description</label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs"
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
