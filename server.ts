import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Set body size limits to allow base64 file uploads (up to 50MB)
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Ensure upload directory exists
const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Gemini client initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Seed data setup if database does not exist
function initializeDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const seedData = {
      profile: {
        name: 'DHINESH KUMAR',
        brand: 'DHINESH KUMAR CREATIVE STUDIO',
        title: 'Professional Video Editor, Film Director & Master Colorist',
        phone: '9360302306',
        email: '2kdhinesh2k@gmail.com',
        location: 'Ramanathapuram, Tamil Nadu & Worldwide',
        bio: 'Professional Video Editor and creative filmmaker specializing in commercial video editing, cinematic pacing, DaVinci Resolve color science, and high-fidelity visual storytelling. Over 8+ years collaborating with international brands, creators, and commercial productions.',
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
          title: 'Studio Portrait — Creative Masterclass',
          description: 'Master portrait of Dhinesh Kumar behind the monitor, showcasing the precision of ARRI and DaVinci color workspaces.',
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
          id: 'video-3',
          type: 'video',
          title: 'KAVITHAI — Indie Music Film & Visualizer',
          description: 'A lyrical visual odyssey edited with rhythmic match cuts, film burn transitions, and vintage Kodak 250D emulation.',
          category: 'Music Videos',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnail: '/src/assets/images/photo_cinematic_street_1794229046276.jpg',
          sizeBytes: 15400000,
          mimeType: 'video/mp4',
          duration: '03:12',
          featured: false,
          createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
          tags: ['Music Video', 'Kodak 250D', 'Indie', 'Transitions']
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
        },
        {
          id: 'doc-3',
          type: 'document',
          title: 'Client_NDA_Master_Service_Agreement.docx',
          description: 'Standard intellectual property handover agreement, confidentiality clause, and deliverables approval protocol for commercial clients.',
          category: 'Contracts & Rates',
          url: '/api/documents/download/agreement',
          fileName: 'Client_NDA_Master_Service_Agreement.docx',
          fileExtension: 'docx',
          sizeBytes: 320000,
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          downloadCount: 67,
          featured: false,
          createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
          tags: ['Legal', 'Contract', 'NDA', 'MSA']
        },
        {
          id: 'doc-4',
          type: 'document',
          title: 'LUT_Pack_FilmEmulation_Kodak_Fuji_RAW.zip',
          description: 'Exclusive custom 3D LUT package designed by Dhinesh Kumar for Blackmagic Pocket Cinema Cameras, Sony FX3 S-Log3, and ARRI LogC3.',
          category: 'Tech Specs',
          url: '/api/documents/download/lutpack',
          fileName: 'LUT_Pack_FilmEmulation_Kodak_Fuji_RAW.zip',
          fileExtension: 'zip',
          sizeBytes: 12400000,
          mimeType: 'application/zip',
          downloadCount: 310,
          featured: true,
          createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
          tags: ['LUTs', 'Color Grading', 'Assets', 'LogC3']
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(seedData, null, 2));
  }

  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
}

initializeDatabase();

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error reading db:', err);
    return { profile: {}, categories: {}, items: [] };
  }
}

function writeDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Serve uploaded static files
app.use('/uploads', express.static(UPLOAD_DIR));

// ----------------- PORTFOLIO ENDPOINTS -----------------

app.get('/api/portfolio', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db });
});

// Admin authentication endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password, pin } = req.body;
  // Master credentials for Dhinesh Kumar
  // Also accepts PIN 9360 (first 4 digits of phone number) for effortless access
  if (
    (email === '2kdhinesh2k@gmail.com' && password === 'Dhinesh@2026') ||
    (email === 'dhinesh.creative@gmail.com' && password === 'Dhinesh@2026') ||
    (email === 'admin@dhineshkumar.com' && password === 'admin123') ||
    pin === '9360' ||
    password === 'dhinesh9360'
  ) {
    const token = 'dhinesh-token-' + Date.now();
    return res.json({
      success: true,
      token,
      user: {
        name: 'DHINESH KUMAR',
        role: 'admin',
        email: '2kdhinesh2k@gmail.com',
        phone: '9360302306'
      }
    });
  }
  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. You can also log in with PIN 9360 or password dhinesh9360.'
  });
});

// Upload item (photos, videos, documents)
app.post('/api/upload', (req: Request, res: Response) => {
  try {
    const { title, description, category, type, fileName, fileData, mimeType, duration, tags } = req.body;
    if (!title || !type) {
      return res.status(400).json({ success: false, message: 'Title and type are required' });
    }

    let fileUrl = '';
    let fileSize = 0;

    if (fileData && fileData.startsWith('data:')) {
      // Decode base64
      const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = fileName ? path.extname(fileName) : `.${type === 'photo' ? 'jpg' : type === 'video' ? 'mp4' : 'pdf'}`;
        const uniqueName = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
        const targetPath = path.join(UPLOAD_DIR, uniqueName);
        const buffer = Buffer.from(matches[2], 'base64');
        fs.writeFileSync(targetPath, buffer);
        fileSize = buffer.length;
        fileUrl = `/uploads/${uniqueName}`;
      }
    } else if (req.body.externalUrl) {
      fileUrl = req.body.externalUrl;
      fileSize = req.body.sizeBytes || 5000000;
    } else {
      fileUrl = type === 'photo'
        ? '/src/assets/images/photo_editorial_fashion_1794229046225.jpg'
        : type === 'video'
        ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        : '/api/documents/download/resume';
      fileSize = 1200000;
    }

    const db = readDb();
    const newItem = {
      id: `${type}-${Date.now()}`,
      type,
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category || (type === 'photo' ? 'Editorial Fashion' : type === 'video' ? 'Director Showreel' : 'Project Briefs'),
      url: fileUrl,
      thumbnail: type === 'photo' ? fileUrl : (req.body.thumbnail || '/src/assets/images/video_showreel_thumb_1794229047119.jpg'),
      sizeBytes: fileSize,
      mimeType: mimeType || (type === 'photo' ? 'image/jpeg' : type === 'video' ? 'video/mp4' : 'application/pdf'),
      fileName: fileName || `${title.replace(/\s+/g, '_')}`,
      fileExtension: fileName ? path.extname(fileName).replace('.', '') : (type === 'photo' ? 'jpg' : type === 'video' ? 'mp4' : 'pdf'),
      duration: duration || (type === 'video' ? '01:45' : undefined),
      downloadCount: 0,
      featured: Boolean(req.body.featured),
      createdAt: new Date().toISOString(),
      tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(',').map((t: string) => t.trim()) : ['Portfolio', 'Dhinesh Kumar'])
    };

    db.items.unshift(newItem);
    writeDb(db);

    res.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ success: false, message: 'Server upload error' });
  }
});

// Update item details
app.put('/api/items/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, featured, tags } = req.body;
  const db = readDb();
  const index = db.items.findIndex((it: any) => it.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  if (title) db.items[index].title = title.trim();
  if (description !== undefined) db.items[index].description = description.trim();
  if (category) db.items[index].category = category;
  if (featured !== undefined) db.items[index].featured = Boolean(featured);
  if (tags) db.items[index].tags = Array.isArray(tags) ? tags : String(tags).split(',').map((t: string) => t.trim());

  writeDb(db);
  res.json({ success: true, item: db.items[index] });
});

// Delete item
app.delete('/api/items/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const item = db.items.find((it: any) => it.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  // Remove file from disk if local upload
  if (item.url && item.url.startsWith('/uploads/')) {
    const filename = path.basename(item.url);
    const localPath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
      } catch (err) {
        console.warn('Could not delete file from disk:', err);
      }
    }
  }

  db.items = db.items.filter((it: any) => it.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Item deleted successfully' });
});

// Mock document downloader returning clean generated sample file or raw content
app.get('/api/documents/download/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  let filename = 'Dhinesh_Kumar_Document.pdf';
  let content = 'DHINESH KUMAR CREATIVE STUDIO\nOfficial Portfolio Document\nPhone: 9360302306\n\nThank you for downloading.';
  let contentType = 'text/plain';

  if (slug === 'resume') {
    filename = 'Dhinesh_Kumar_Creative_Director_Resume_2026.pdf';
    contentType = 'application/pdf';
  } else if (slug === 'rates') {
    filename = 'Commercial_Production_Standard_Rate_Card.xlsx';
    contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  } else if (slug === 'agreement') {
    filename = 'Client_NDA_Master_Service_Agreement.docx';
    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  } else if (slug === 'lutpack') {
    filename = 'LUT_Pack_FilmEmulation_Kodak_Fuji_RAW.zip';
    contentType = 'application/zip';
  }

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', contentType);
  res.send(content);
});

// Contact form inquiries
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, phone, projectType, budget, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

  let messages: any[] = [];
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    }
  } catch (err) {
    messages = [];
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    projectType: projectType || 'Video Editing / Direction',
    budget: budget || 'Undisclosed',
    message,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  messages.unshift(newMessage);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  res.json({
    success: true,
    message: 'Thank you! Your message has been received by Dhinesh Kumar. Expect a response within 12 hours.'
  });
});

app.get('/api/messages', (req: Request, res: Response) => {
  try {
    const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    res.json({ success: true, messages });
  } catch (err) {
    res.json({ success: true, messages: [] });
  }
});

// ----------------- AI STUDIO (GEMINI API) ENDPOINTS -----------------

// Helper to sanitize Gemini response text
function getCleanText(response: any): string {
  return response.text || 'No response generated.';
}

// 1. AI Image Description Generator
app.post('/api/ai/describe-image', async (req: Request, res: Response) => {
  try {
    const { title, category, mood, style, imageBase64 } = req.body;
    let prompt = `You are the lead creative director for DHINESH KUMAR Creative Studio. 
Create an evocative, award-winning artistic and commercial description for a photograph titled "${title || 'Untitled Work'}".
Category: ${category || 'Fine Art'}
Mood / Lighting: ${mood || 'Moody, cinematic golden-amber and violet hour'}
Style: ${style || 'Editorial Magazine & High-End Gallery'}

Provide:
1. Title & Creative Concept: An impactful summary sentence.
2. Visual Narrative: 2-3 atmospheric sentences describing light, shadow, texture, and emotional resonance.
3. Technical Color Grading & Camera Note: (e.g. Hasselblad H6D, Leica Noctilux, Kodak 250D film curve).
4. Suggested Gallery / Social Tags: 5 high-impact tags.`;

    let contents: any = prompt;
    if (imageBase64 && imageBase64.startsWith('data:image')) {
      const parts = imageBase64.split(';base64,');
      const mime = parts[0].replace('data:', '');
      const rawBase64 = parts[1];
      contents = {
        parts: [
          { inlineData: { mimeType: mime, data: rawBase64 } },
          { text: prompt + '\nAnalyze the provided image visually to tailor this description.' }
        ]
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
    });

    res.json({ success: true, result: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini image description error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error' });
  }
});

// 2. AI Writing Assistant
app.post('/api/ai/writing-assistant', async (req: Request, res: Response) => {
  try {
    const { topic, format, targetAudience, tone } = req.body;
    const prompt = `You are the executive copywriter for DHINESH KUMAR's creative portfolio.
Generate a high-converting, ultra-professional ${format || 'Client Proposal Pitch'} on the topic: "${topic || 'Commercial Video Campaign'}".
Target Audience: ${targetAudience || 'Luxury Brands & Film Producers'}
Tone: ${tone || 'Authoritative, Artful, Sophisticated'}

Incorporate Dhinesh Kumar's signature craftsmanship (cinematic editing, DaVinci Resolve color science, avant-garde storytelling, Contact: 9360302306).
Ensure formatting is clean with crisp headings and bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ success: true, result: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini writing assistant error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error' });
  }
});

// 3. AI Text Summarizer
app.post('/api/ai/summarize-text', async (req: Request, res: Response) => {
  try {
    const { text, targetLength } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: 'Text content is required' });
    }

    const prompt = `Summarize the following creative project brief or manuscript for filmmaker DHINESH KUMAR into a ${targetLength || 'concise executive brief'}.
Highlight:
- Core Objective & Vision
- Key Deliverables & Timelines
- Technical Requirements & Aesthetic Tone
- Immediate Action Items

Text to summarize:
"""
${text.slice(0, 8000)}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ success: true, result: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini summarizer error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error' });
  }
});

// 4. AI Image Analysis (Multimodal Vision)
app.post('/api/ai/analyze-image', async (req: Request, res: Response) => {
  try {
    const { imageBase64, customFocus } = req.body;
    if (!imageBase64 || !imageBase64.includes(';base64,')) {
      return res.status(400).json({ success: false, error: 'Valid Base64 image is required' });
    }

    const parts = imageBase64.split(';base64,');
    const mime = parts[0].replace('data:', '');
    const rawData = parts[1];

    const prompt = `You are a legendary master cinematographer and master colorist evaluating this image for DHINESH KUMAR's creative portfolio.
Analyze this frame with deep technical rigor:
1. Composition & Framing (Rule of thirds, leading lines, framing depth)
2. Lighting & Contrast Ratio (Key vs fill, specular highlights, shadow falloff)
3. Color Palette & Harmony (Primary color harmonies, skin tone accuracy, color temperature)
4. Mood & Emotional Weight (Storytelling impact, viewer retention)
5. Color Grading Recommendations (DaVinci Resolve curves, lift/gamma/gain adjustments, LUT ideas)
Specific focus requested: ${customFocus || 'Comprehensive visual audit'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: mime, data: rawData } },
          { text: prompt }
        ]
      }
    });

    res.json({ success: true, result: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini image analysis error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error' });
  }
});

// 5. AI Video Description Generator
app.post('/api/ai/video-description', async (req: Request, res: Response) => {
  try {
    const { title, genre, music, pacing, cameraUsed } = req.body;
    const prompt = `You are a digital media specialist creating high-retention video metadata for DHINESH KUMAR's video showcase.
Video Title: "${title || 'Cinematic Film'}"
Genre: ${genre || 'Commercial Director Cut'}
Camera / Workflow: ${cameraUsed || 'ARRI Alexa Mini LF / DaVinci Resolve Studio'}
Music & Pacing: ${music || 'Atmospheric Synth & Rhythmic Match Cuts'}

Generate:
1. High-CTR YouTube / Showcase Title (3 options)
2. Compelling Video Synopsis (2 paragraphs optimized for client booking)
3. Production Credits Template (Director, Editor, Colorist: Dhinesh Kumar, Sound Design, Music)
4. Timestamp Chapter Structure (00:00 Intro, 00:30 Montage, 01:15 Climax, 02:00 Outro)
5. 15 High-Volume Tags & SEO Keywords
6. Instagram / TikTok Caption with hashtags`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ success: true, result: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini video description error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error' });
  }
});

// 6. AI Document Summarizer
app.post('/api/ai/document-summary', async (req: Request, res: Response) => {
  try {
    const { documentName, documentText, documentType } = req.body;
    const prompt = `Analyze this ${documentType || 'creative agreement / technical specification'} document for DHINESH KUMAR:
Document Name: "${documentName || 'Document'}"

Content:
"""
${(documentText || 'Production contract specifying video editing milestones, 3 revisions round, raw footage handover, color grade delivery in ProRes 4444 XQ, and commercial broadcast rights. Payment terms: 50% advance, 50% upon final master export. Contact: 9360302306').slice(0, 6000)}
"""

Please provide:
1. Executive Abstract (1 concise paragraph)
2. Critical Clauses / Obligations
3. Financial / Rate Terms (if present)
4. Potential Risks or Actionable Suggestions for Dhinesh Kumar`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ success: true, result: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini document summary error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI service error' });
  }
});

// 7. AI Chat Assistant
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;
    const systemPrompt = `You are the official AI Studio Creative Assistant for DHINESH KUMAR (Contact: 9360302306, brand: DHINESH KUMAR Creative Studio).
Dhinesh Kumar is an acclaimed Creative Director, Filmmaker, Commercial Video Editor, and Master Colorist based in Ramanathapuram, Tamil Nadu, available for projects worldwide.
His core competencies:
- Commercial Video Editing & Direction (Premiere Pro, DaVinci Resolve Studio, After Effects)
- Color Grading (Kodak/Fuji film emulation, ARRI LogC3/C4, Sony S-Log3, RED IPP2)
- High-End Photography Retouching & Direction (Fashion, Street, Studio)
- Sound Design & Rhythmic Cutting

Your role is to assist clients, answer questions about Dhinesh's services, provide rate estimates, brainstorm creative treatments, and help visitors explore his photo gallery, video portfolio, and documents.
Always maintain an elegant, sophisticated, welcoming, and confident tone. When appropriate, offer Dhinesh's direct phone (9360302306) or WhatsApp connection.`;

    const contents: any[] = [];
    if (Array.isArray(messages)) {
      messages.forEach((m: any) => {
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text || m.content }]
        });
      });
    }

    if (userMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: systemPrompt
      }
    });

    res.json({ success: true, text: getCleanText(response) });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI chat error' });
  }
});

// ----------------- VITE INTEGRATION -----------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DHINESH KUMAR Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
