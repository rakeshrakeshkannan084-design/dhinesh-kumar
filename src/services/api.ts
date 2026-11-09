import { PortfolioItem, Profile, Categories, ContactMessage, AdminUser } from '../types';

export const API_BASE = '';

export async function fetchPortfolioData(): Promise<{
  profile: Profile;
  categories: Categories;
  items: PortfolioItem[];
}> {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio`);
    if (!res.ok) throw new Error('Failed to fetch portfolio data');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('API fetch failed, using fallback cache:', err);
    // Return fallback initial data if offline
    return {
      profile: {
        name: 'DHINESH KUMAR',
        brand: 'DHINESH KUMAR CREATIVE STUDIO',
        title: 'Professional Video Editor, Film Director & Master Colorist',
        phone: '9360302306',
        email: '2kdhinesh2k@gmail.com',
        location: 'Ramanathapuram, Tamil Nadu & Worldwide',
        bio: 'Professional Video Editor and creative multimedia director specializing in commercial video editing, YouTube content pacing, cinematic color grading in DaVinci Resolve Studio, and high-fidelity visual storytelling.',
        avatar: '/assets/dhinesh_video_editor.jpg',
        stats: {
          projectsCompleted: 260,
          videosEdited: 94,
          photosRetouched: 1450,
          clientSatisfaction: 99.8,
          experienceYears: 8
        }
      },
      categories: {
        photos: ['All', 'Editorial Fashion', 'Cinematic Street', 'Studio Portrait', 'Commercial', 'Architecture'],
        videos: ['All', 'Director Showreel', 'Commercial Ads', 'Music Videos', 'Color Grading', 'Documentary'],
        documents: ['All', 'Project Briefs', 'Contracts & Rates', 'Resumes & CV', 'Tech Specs', 'Brand Guidelines']
      },
      items: [
        {
          id: 'photo-1',
          type: 'photo',
          title: 'Vogue Avant-Garde Editorial',
          description: 'High-contrast monochrome and golden lighting studio portrait featuring sculptural silhouettes and medium format Hasselblad capture.',
          category: 'Editorial Fashion',
          url: '/src/assets/images/photo_editorial_fashion_1794229046225.jpg',
          thumbnail: '/src/assets/images/photo_editorial_fashion_1794229046225.jpg',
          sizeBytes: 2450000,
          mimeType: 'image/jpeg',
          dimensions: '4000 x 3000',
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          tags: ['Fashion', 'Editorial', 'Studio', 'Gold & Noir']
        },
        {
          id: 'photo-2',
          type: 'photo',
          title: 'Neon Rain Reflections — Shinjuku Midnight',
          description: 'Atmospheric 35mm night street capture balancing amber lantern warmth with deep violet cyber neon light spill on rain-slicked asphalt.',
          category: 'Cinematic Street',
          url: '/src/assets/images/photo_cinematic_street_1794229046276.jpg',
          thumbnail: '/src/assets/images/photo_cinematic_street_1794229046276.jpg',
          sizeBytes: 3120000,
          mimeType: 'image/jpeg',
          dimensions: '3840 x 2880',
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
          tags: ['Street', 'Cinematic', 'Neon', 'Rain']
        },
        {
          id: 'photo-3',
          type: 'photo',
          title: 'DHINESH KUMAR — Master Portrait',
          description: 'Official portrait of Dhinesh Kumar in tailored royal purple three-piece suit with gold monogram detailing, capturing executive presence and artistic mastery.',
          category: 'Studio Portrait',
          url: '/assets/aistudio/IMG_6153.JPG_7ebde17b.jpeg',
          thumbnail: '/assets/aistudio/IMG_6153.JPG_7ebde17b.jpeg',
          sizeBytes: 2890000,
          mimeType: 'image/jpeg',
          dimensions: '3840 x 2160',
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          tags: ['Portrait', 'Cinema', 'Director', 'Studio']
        },
        {
          id: 'video-1',
          type: 'video',
          title: 'Official Cinematic Director Showreel 2026',
          description: 'Comprehensive director cut comprising commercial fashion campaigns, high-energy automotive spots, and music video color grades in 4K DCI.',
          category: 'Director Showreel',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          thumbnail: '/src/assets/images/video_showreel_thumb_1794229047119.jpg',
          sizeBytes: 28400000,
          mimeType: 'video/mp4',
          duration: '02:45',
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          tags: ['Showreel', 'Color Grading', 'ARRI Alexa', '4K']
        },
        {
          id: 'video-2',
          type: 'video',
          title: 'Obsidian — Luxury Watch Brand Commercial',
          description: 'Macro cinematography and 1000fps slow-motion captures highlighting titanium craftsmanship, mechanical tourbillon, and dark gold luxury tone curve.',
          category: 'Commercial Ads',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          thumbnail: '/assets/aistudio/IMG_6153.JPG_7ebde17b.jpeg',
          sizeBytes: 19800000,
          mimeType: 'video/mp4',
          duration: '01:30',
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
          tags: ['Commercial', 'Luxury', 'Slow Motion', 'Sound Design']
        },
        {
          id: 'doc-1',
          type: 'document',
          title: 'Dhinesh_Kumar_Creative_Director_Resume_2026.pdf',
          description: 'Curated curriculum vitae detailing 8+ years of commercial video directing, film color grading, awards, client roster, and technical proficiencies.',
          category: 'Resumes & CV',
          url: '/api/documents/download/resume',
          fileName: 'Dhinesh_Kumar_Creative_Director_Resume_2026.pdf',
          fileExtension: 'pdf',
          sizeBytes: 1840000,
          mimeType: 'application/pdf',
          downloadCount: 142,
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          tags: ['Resume', 'Curriculum Vitae', 'Credentials']
        },
        {
          id: 'doc-2',
          type: 'document',
          title: 'Commercial_Production_Standard_Rate_Card.xlsx',
          description: 'Transparent pricing matrix covering half-day/full-day director rates, DaVinci Resolve color grading suites, drone cinematography packages, and licensing.',
          category: 'Contracts & Rates',
          url: '/api/documents/download/rates',
          fileName: 'Commercial_Production_Standard_Rate_Card.xlsx',
          fileExtension: 'xlsx',
          sizeBytes: 540000,
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          downloadCount: 89,
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
          tags: ['Rates', 'Estimates', 'Commercial', 'Production']
        }
      ]
    };
  }
}

export async function uploadPortfolioItem(payload: {
  title: string;
  description: string;
  category: string;
  type: 'photo' | 'video' | 'document';
  fileName?: string;
  fileData?: string;
  externalUrl?: string;
  mimeType?: string;
  duration?: string;
  featured?: boolean;
  tags?: string[];
}): Promise<PortfolioItem> {
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Upload failed');
  return data.item;
}

export async function updatePortfolioItem(id: string, payload: {
  title?: string;
  description?: string;
  category?: string;
  featured?: boolean;
  tags?: string[];
}): Promise<PortfolioItem> {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Update failed');
  return data.item;
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Delete failed');
  return true;
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Failed to send message');
  return data.message;
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/api/messages`);
    const data = await res.json();
    return data.messages || [];
  } catch (err) {
    return [];
  }
}

export async function adminLogin(credentials: { email?: string; password?: string; pin?: string }): Promise<{ token: string; user: AdminUser }> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Login failed');
  return { token: data.token, user: data.user };
}

// AI Services
export async function generateImageDescription(payload: {
  title?: string;
  category?: string;
  mood?: string;
  style?: string;
  imageBase64?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/describe-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI generation failed');
  return data.result;
}

export async function generateWritingAssistant(payload: {
  topic: string;
  format: string;
  targetAudience?: string;
  tone?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/writing-assistant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI generation failed');
  return data.result;
}

export async function summarizeText(payload: {
  text: string;
  targetLength?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/summarize-text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI summarization failed');
  return data.result;
}

export async function analyzeImage(payload: {
  imageBase64: string;
  customFocus?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/analyze-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI analysis failed');
  return data.result;
}

export async function generateVideoDescription(payload: {
  title: string;
  genre: string;
  music?: string;
  pacing?: string;
  cameraUsed?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/video-description`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI generation failed');
  return data.result;
}

export async function summarizeDocument(payload: {
  documentName: string;
  documentText?: string;
  documentType?: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/document-summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI summarization failed');
  return data.result;
}

export async function sendAiChatMessage(payload: {
  messages: Array<{ role: 'user' | 'model'; text: string }>;
  userMessage: string;
}): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI chat failed');
  return data.text;
}
