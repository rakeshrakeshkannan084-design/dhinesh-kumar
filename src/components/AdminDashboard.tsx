import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioItem, ContactMessage } from '../types';
import { fetchMessages } from '../services/api';
import {
  ShieldCheck,
  ShieldAlert,
  HardDrive,
  Upload,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  Camera,
  Film,
  FileText,
  MessageSquare,
  Lock,
  KeyRound,
  Check,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    items,
    isAdmin,
    adminUser,
    loginAdmin,
    logoutAdmin,
    addItem,
    updateItem,
    removeItem,
    storageUsage,
    categories,
    setActiveTab
  } = usePortfolio();

  // Login credentials state
  const [email, setEmail] = useState('2kdhinesh2k@gmail.com');
  const [password, setPassword] = useState('Dhinesh@2026');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<'content' | 'storage' | 'inquiries'>('content');
  const [contentFilter, setContentFilter] = useState<'all' | 'photo' | 'video' | 'document'>('all');

  // Messages inbox state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Edit Item Modal in Admin
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCat, setEditCat] = useState('');

  useEffect(() => {
    if (isAdmin) {
      loadMessages();
    }
  }, [isAdmin]);

  const loadMessages = async () => {
    setLoadingMessages(true);
    const msgs = await fetchMessages();
    setMessages(msgs);
    setLoadingMessages(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await loginAdmin({ email, password, pin });
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials or use PIN 9360.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await loginAdmin({ pin: '9360' });
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const filteredItems = items.filter((it) => {
    if (contentFilter === 'all') return true;
    return it.type === contentFilter;
  });

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditCat(item.category);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      await updateItem(editingItem.id, {
        title: editTitle,
        description: editDesc,
        category: editCat
      });
      setEditingItem(null);
    } catch (err: any) {
      alert(err.message || 'Error updating item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Permanently delete this item from database and storage?')) {
      try {
        await removeItem(id);
      } catch (err: any) {
        alert(err.message || 'Error deleting item');
      }
    }
  };

  // If not authenticated, render Login Screen
  if (!isAdmin) {
    return (
      <div className="py-16 max-w-lg mx-auto px-4">
        <div className="rounded-3xl bg-[#121218] border border-zinc-800 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-zinc-400">
              Authorized access for DHINESH KUMAR to manage media, storage, and inquiries.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In as Admin'}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-4 border-t border-zinc-800/80 text-center space-y-3">
            <div className="text-[11px] text-zinc-400">
              Quick review demo credentials pre-filled. You can also sign in with one click:
            </div>
            <button
              onClick={handleQuickLogin}
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold border border-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>One-Click Master Unlock (PIN 9360)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              DHINESH KUMAR Studio Command
            </h1>
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="font-mono text-emerald-400">● Master Admin Authenticated</span>
              <span>·</span>
              <span>{adminUser?.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('photos')}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Go to Gallery
          </button>
          <button
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs: Content Manager, Storage Usage, Client Inquiries */}
      <div className="flex border-b border-zinc-800 gap-6">
        <button
          onClick={() => setAdminTab('content')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
            adminTab === 'content' ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Content Manager ({items.length})</span>
          {adminTab === 'content' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setAdminTab('storage')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
            adminTab === 'storage' ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Storage & Cloud Vault</span>
          {adminTab === 'storage' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setAdminTab('inquiries')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
            adminTab === 'inquiries' ? 'text-amber-400' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Client Inquiries ({messages.length})</span>
          {adminTab === 'inquiries' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400" />
          )}
        </button>
      </div>

      {/* 1. CONTENT MANAGER */}
      {adminTab === 'content' && (
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(['all', 'photo', 'video', 'document'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setContentFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  contentFilter === t
                    ? 'bg-amber-400 text-zinc-950 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {t === 'all' ? 'All Content' : `${t}s`}
              </button>
            ))}
          </div>

          {/* Content Table */}
          <div className="rounded-2xl border border-zinc-800 bg-[#121218] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Uploaded</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                          {item.type === 'photo' && (
                            <img src={item.thumbnail || item.url} alt="" className="w-full h-full object-cover" />
                          )}
                          {item.type === 'video' && (
                            <div className="w-full h-full flex items-center justify-center bg-purple-950/60 text-purple-300">
                              <Film className="w-4 h-4" />
                            </div>
                          )}
                          {item.type === 'document' && (
                            <div className="w-full h-full flex items-center justify-center bg-amber-950/60 text-amber-300">
                              <FileText className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate max-w-xs">{item.title}</div>
                          <div className="text-[11px] text-zinc-500 font-mono truncate">{item.id}</div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="capitalize font-mono px-2 py-0.5 rounded bg-zinc-800 text-[11px]">
                          {item.type}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-zinc-400 font-mono">{item.category}</td>

                      <td className="py-3 px-4 text-zinc-400 font-mono">
                        {(item.sizeBytes / (1024 * 1024)).toFixed(1)} MB
                      </td>

                      <td className="py-3 px-4 text-zinc-500 font-mono">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit Item"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete Item"
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950/60 text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. STORAGE USAGE & CLOUD VAULT */}
      {adminTab === 'storage' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>TOTAL STORAGE</span>
                <HardDrive className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{storageUsage.totalFormatted}</div>
              <div className="text-xs text-zinc-500 font-mono">5.00 GB Vault Quota</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>PHOTOGRAPHS</span>
                <Camera className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {(storageUsage.photosBytes / (1024 * 1024)).toFixed(1)} MB
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {items.filter((i) => i.type === 'photo').length} files stored
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>VIDEOS & SHOWREELS</span>
                <Film className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {(storageUsage.videosBytes / (1024 * 1024)).toFixed(1)} MB
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {items.filter((i) => i.type === 'video').length} showreels stored
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>DOCUMENTS & VAULT</span>
                <FileText className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {(storageUsage.documentsBytes / (1024 * 1024)).toFixed(1)} MB
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                {items.filter((i) => i.type === 'document').length} documents active
              </div>
            </div>
          </div>

          {/* Progress Bar of Storage Quota */}
          <div className="p-6 rounded-2xl bg-[#121218] border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">Cloud Capacity Gauge</span>
              <span className="text-amber-400 tabular-nums">{storageUsage.usagePercent}% Allocated</span>
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-500 transition-all duration-700"
                style={{ width: `${Math.max(5, storageUsage.usagePercent)}%` }}
              />
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              High-bandwidth cloud storage enabled with disk-backed persistence and instant CDN delivery.
            </div>
          </div>
        </div>
      )}

      {/* 3. CLIENT INQUIRIES */}
      {adminTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Direct Client Messages</h2>
            <button
              onClick={loadMessages}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium"
            >
              Refresh Inquiries
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800 text-zinc-500 text-xs">
              No inquiries received yet. Submissions through the Contact form will be displayed here in real time.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-[#121218] border border-zinc-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div>
                      <div className="text-sm font-bold text-white">{m.name}</div>
                      <div className="text-xs text-amber-400 font-mono">{m.email} · {m.phone || 'No phone'}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
                        {m.projectType}
                      </span>
                      <div className="text-[11px] text-zinc-500 font-mono mt-1">
                        Budget: {m.budget} · {new Date(m.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {m.message}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={`mailto:${m.email}?subject=RE: Creative Project Inquiry — Dhinesh Kumar`}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs"
                    >
                      Reply via Email
                    </a>
                    {m.phone && (
                      <a
                        href={`tel:${m.phone}`}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-medium"
                      >
                        Call Client
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121218] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <h3 className="text-base font-bold text-white">Edit Content Metadata</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
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
                <input
                  type="text"
                  required
                  value={editCat}
                  onChange={(e) => setEditCat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Description</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
