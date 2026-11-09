import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem, Profile, Categories, AdminUser, ViewTab } from '../types';
import {
  fetchPortfolioData,
  uploadPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  adminLogin as apiAdminLogin
} from '../services/api';

interface StorageUsage {
  totalBytes: number;
  totalFormatted: string;
  photosBytes: number;
  videosBytes: number;
  documentsBytes: number;
  totalFiles: number;
  quotaBytes: number; // e.g. 5GB cloud limit
  usagePercent: number;
}

interface PortfolioContextType {
  items: PortfolioItem[];
  profile: Profile | null;
  categories: Categories;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isLoading: boolean;
  error: string | null;

  // Modals & Viewers
  activeLightboxItem: PortfolioItem | null;
  openLightbox: (item: PortfolioItem) => void;
  closeLightbox: () => void;
  activeVideoItem: PortfolioItem | null;
  openVideoPlayer: (item: PortfolioItem) => void;
  closeVideoPlayer: () => void;
  activeDocItem: PortfolioItem | null;
  openDocPreview: (item: PortfolioItem) => void;
  closeDocPreview: () => void;

  // Admin Auth
  adminUser: AdminUser | null;
  isAdmin: boolean;
  loginAdmin: (creds: { email?: string; password?: string; pin?: string }) => Promise<void>;
  logoutAdmin: () => void;

  // CRUD Operations
  addItem: (payload: any) => Promise<PortfolioItem>;
  updateItem: (id: string, payload: any) => Promise<PortfolioItem>;
  removeItem: (id: string) => Promise<void>;

  // Storage Stats
  storageUsage: StorageUsage;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [categories, setCategories] = useState<Categories>({
    photos: ['All'],
    videos: ['All'],
    documents: ['All']
  });
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);
  const [activeVideoItem, setActiveVideoItem] = useState<PortfolioItem | null>(null);
  const [activeDocItem, setActiveDocItem] = useState<PortfolioItem | null>(null);

  // Admin session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('dhinesh_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Apply theme to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPortfolioData();
      setItems(data.items);
      setProfile(data.profile);
      setCategories(data.categories);
    } catch (err: any) {
      setError(err.message || 'Error loading portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute storage metrics
  const quotaBytes = 5 * 1024 * 1024 * 1024; // 5 GB default capacity
  let photosBytes = 0;
  let videosBytes = 0;
  let documentsBytes = 0;

  items.forEach(item => {
    const bytes = item.sizeBytes || 0;
    if (item.type === 'photo') photosBytes += bytes;
    else if (item.type === 'video') videosBytes += bytes;
    else if (item.type === 'document') documentsBytes += bytes;
  });

  const totalBytes = photosBytes + videosBytes + documentsBytes;
  const storageUsage: StorageUsage = {
    totalBytes,
    totalFormatted: formatBytes(totalBytes),
    photosBytes,
    videosBytes,
    documentsBytes,
    totalFiles: items.length,
    quotaBytes,
    usagePercent: Math.min(100, parseFloat(((totalBytes / quotaBytes) * 100).toFixed(2)))
  };

  const openLightbox = (item: PortfolioItem) => setActiveLightboxItem(item);
  const closeLightbox = () => setActiveLightboxItem(null);

  const openVideoPlayer = (item: PortfolioItem) => setActiveVideoItem(item);
  const closeVideoPlayer = () => setActiveVideoItem(null);

  const openDocPreview = (item: PortfolioItem) => setActiveDocItem(item);
  const closeDocPreview = () => setActiveDocItem(null);

  const loginAdmin = async (creds: { email?: string; password?: string; pin?: string }) => {
    const res = await apiAdminLogin(creds);
    setAdminUser(res.user);
    localStorage.setItem('dhinesh_admin_user', JSON.stringify(res.user));
    localStorage.setItem('dhinesh_admin_token', res.token);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('dhinesh_admin_user');
    localStorage.removeItem('dhinesh_admin_token');
  };

  const addItem = async (payload: any) => {
    const newItem = await uploadPortfolioItem(payload);
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateItem = async (id: string, payload: any) => {
    const updated = await updatePortfolioItem(id, payload);
    setItems(prev => prev.map(it => (it.id === id ? updated : it)));
    return updated;
  };

  const removeItem = async (id: string) => {
    await deletePortfolioItem(id);
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{
        items,
        profile,
        categories,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        theme,
        toggleTheme,
        isLoading,
        error,
        activeLightboxItem,
        openLightbox,
        closeLightbox,
        activeVideoItem,
        openVideoPlayer,
        closeVideoPlayer,
        activeDocItem,
        openDocPreview,
        closeDocPreview,
        adminUser,
        isAdmin: Boolean(adminUser),
        loginAdmin,
        logoutAdmin,
        addItem,
        updateItem,
        removeItem,
        storageUsage,
        refreshData: loadData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
