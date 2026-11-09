export type ItemType = 'photo' | 'video' | 'document';

export interface PortfolioItem {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  category: string;
  url: string;
  thumbnail?: string;
  sizeBytes: number;
  mimeType?: string;
  dimensions?: string;
  duration?: string;
  fileName?: string;
  fileExtension?: string;
  downloadCount?: number;
  featured?: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Stats {
  projectsCompleted: number;
  videosEdited: number;
  photosRetouched: number;
  clientSatisfaction: number;
  experienceYears: number;
}

export interface Profile {
  name: string;
  brand: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
  stats: Stats;
}

export interface Categories {
  photos: string[];
  videos: string[];
  documents: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface AdminUser {
  name: string;
  role: 'admin';
  email: string;
  phone: string;
}

export type ViewTab = 'home' | 'photos' | 'videos' | 'documents' | 'ai-studio' | 'about' | 'contact' | 'admin';
