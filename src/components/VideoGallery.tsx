import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioItem } from '../types';
import {
  Film,
  Play,
  Search,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Sparkles,
  Maximize2,
  Check,
  X,
  AlertCircle,
  Video as VideoIcon
} from 'lucide-react';

export const VideoGallery: React.FC = () => {
  const {
    items,
    categories,
    openVideoPlayer,
    isAdmin,
    addItem,
    updateItem,
    removeItem
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [editingVideo, setEditingVideo] = useState<PortfolioItem | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Director Showreel');
  const [uploadVideoUrl, setUploadVideoUrl] = useState('');
  const [uploadDuration, setUploadDuration] = useState('02:15');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Edit Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  // Filter videos
  const videos = items.filter((it) => it.type === 'video');
  const filteredVideos = videos.filter((vid) => {
    const matchesCat = activeCategory === 'All' || vid.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vid.tags && vid.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      if (!uploadTitle) {
        setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      // Create local object URL for instant preview
      const localUrl = URL.createObjectURL(file);
      setUploadVideoUrl(localUrl);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      setUploadError('Title is required.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      await addItem({
        type: 'video',
        title: uploadTitle.trim(),
        description: uploadDescription.trim(),
        category: uploadCategory,
        externalUrl: uploadVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: uploadDuration || '02:00',
        thumbnail: '/src/assets/images/video_showreel_thumb_1794229047119.jpg',
        mimeType: 'video/mp4',
        sizeBytes: uploadFile?.size || 18500000,
        featured: false,
        tags: ['Cinema', 'Color Grade', '4K']
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setUploadTitle('');
        setUploadDescription('');
        setUploadVideoUrl('');
        setUploadFile(null);
      }, 1200);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (video: PortfolioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingVideo(video);
    setEditTitle(video.title);
    setEditDescription(video.description);
    setEditCategory(video.category);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    setSavingEdit(true);
    try {
      await updateItem(editingVideo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        category: editCategory
      });
      setEditingVideo(null);
    } catch (err: any) {
      alert(err.message || 'Error updating video');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this video from your showcase?')) {
      try {
        await removeItem(id);
      } catch (err: any) {
        alert(err.message || 'Error deleting video');
      }
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-purple-400 tracking-wider">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Film & Motion Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            Video Showcase
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Director cuts, luxury brand commercials, and music films crafted with rhythmic match cutting, immersive soundscapes, and DaVinci Resolve color science.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Upload Video</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.videos.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white font-bold shadow-sm'
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
            placeholder="Search videos by title or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-colors"
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

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
          <Film className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-semibold text-zinc-300">No videos found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your category filter or search query, or upload a new video showreel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => openVideoPlayer(video)}
              className="group relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#121216] cursor-pointer shadow-lg hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Frame */}
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                <img
                  src={video.thumbnail || '/src/assets/images/video_showreel_thumb_1794229047119.jpg'}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-black/30 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Play Button Center Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-purple-300 border border-white/10">
                    {video.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isAdmin && (
                    <>
                      <button
                        onClick={(e) => startEdit(video, e)}
                        title="Edit Details"
                        className="p-1.5 rounded-lg bg-black/75 backdrop-blur-md text-amber-300 hover:text-amber-200 border border-white/10"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(video.id, e)}
                        title="Delete Video"
                        className="p-1.5 rounded-lg bg-black/75 backdrop-blur-md text-rose-400 hover:text-rose-300 border border-white/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Duration Badge Bottom Right */}
                <div className="absolute bottom-3 right-3 backdrop-blur-md bg-black/70 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{video.duration || '02:00'}</span>
                </div>
              </div>

              {/* Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>4K ProRes Master</span>
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#121218] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <VideoIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Upload Video Project</h2>
                  <p className="text-xs text-zinc-400">Add commercial edits, showreels, and color grades</p>
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
                <span>Video project published successfully!</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Video File / URL Input */}
              <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50 space-y-3">
                <label className="text-xs font-medium text-zinc-300 block">
                  Select Video File or Direct Video URL (MP4, MOV, WebM)
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
                />
                <div className="text-[11px] text-zinc-500 text-center">- OR PROVIDE DIRECT STREAM LINK -</div>
                <input
                  type="url"
                  placeholder="https://... /video.mp4"
                  value={uploadVideoUrl}
                  onChange={(e) => setUploadVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Video Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vogue Cinema Commercial"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    {categories.videos.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Duration</label>
                  <input
                    type="text"
                    placeholder="02:30"
                    value={uploadDuration}
                    onChange={(e) => setUploadDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Description</label>
                  <input
                    type="text"
                    placeholder="Editorial synopsis, camera gear, and sound design credits..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
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
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {uploading ? 'Publishing...' : 'Add to Showcase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121218] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">Edit Video Details</h3>
              <button
                onClick={() => setEditingVideo(null)}
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
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  {categories.videos.filter((c) => c !== 'All').map((c) => (
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
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
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
