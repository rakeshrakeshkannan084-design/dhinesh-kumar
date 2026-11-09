import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  PenTool,
  FileText,
  Eye,
  Film,
  FileSearch,
  MessageSquare,
  Copy,
  Check,
  Send,
  Loader2,
  Upload,
  RefreshCw,
  Zap,
  HelpCircle
} from 'lucide-react';
import {
  generateImageDescription,
  generateWritingAssistant,
  summarizeText,
  analyzeImage,
  generateVideoDescription,
  summarizeDocument,
  sendAiChatMessage
} from '../services/api';

type AiToolKey =
  | 'image-desc'
  | 'writing'
  | 'summarizer'
  | 'image-analysis'
  | 'video-desc'
  | 'doc-summary'
  | 'chat';

export const AiStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<AiToolKey>('image-desc');
  const [copied, setCopied] = useState(false);

  // 1. Image Description State
  const [imgTitle, setImgTitle] = useState('Golden Hour Obsidian Silhouette');
  const [imgCategory, setImgCategory] = useState('Editorial Fashion');
  const [imgMood, setImgMood] = useState('Moody amber backlight with violet shadows');
  const [imgStyle, setImgStyle] = useState('Vogue Magazine & Film Emulation');
  const [imgPreview, setImgPreview] = useState<string>('/src/assets/images/photo_editorial_fashion_1794229046225.jpg');
  const [imgResult, setImgResult] = useState('');
  const [loadingImg, setLoadingImg] = useState(false);

  // 2. Writing Assistant State
  const [writeTopic, setWriteTopic] = useState('High-End Luxury Watch Commercial Video Pitch');
  const [writeFormat, setWriteFormat] = useState('Client Proposal Pitch Deck');
  const [writeAudience, setWriteAudience] = useState('Luxury Brand CMOs & Producers');
  const [writeTone, setWriteTone] = useState('Authoritative, Cinematic, Premium');
  const [writeResult, setWriteResult] = useState('');
  const [loadingWrite, setLoadingWrite] = useState(false);

  // 3. Text Summarizer State
  const [summaryInput, setSummaryInput] = useState(
    `We need a high-impact 60-second commercial film for an electric supercar launch. The creative vision requires night cinematography in an urban downtown area with wet asphalt reflections, drone aerial tracking shots at 90mph, and seamless match cuts to the vehicle interior. The color grade must feature deep blacks, subtle cyan undertones, and warm tungsten headlight flares. Sound design should emphasize visceral motor synthesis, custom sub-bass drops, and minimal dialogue. Deliverables: 1x 60s broadcast master in 4K ProRes 4444, 2x 15s Instagram reels, and 5x 8K hero keyframes. Shoot date is scheduled in 3 weeks with a strict 10-day post-production turnaround.`
  );
  const [summaryLength, setSummaryLength] = useState('executive one-page summary');
  const [summaryResult, setSummaryResult] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // 4. Image Analysis State
  const [visionImage, setVisionImage] = useState<string>('/assets/dhinesh_video_editor.jpg');
  const [visionFocus, setVisionFocus] = useState('Cinematographic lighting, color grading contrast ratio, and DaVinci Resolve node advice');
  const [visionResult, setVisionResult] = useState('');
  const [loadingVision, setLoadingVision] = useState(false);

  // 5. Video Description State
  const [vidTitle, setVidTitle] = useState('PARALLEL HORIZONS — 4K Director Showreel');
  const [vidGenre, setVidGenre] = useState('Commercial Automotive & Fashion');
  const [vidCamera, setVidCamera] = useState('ARRI Alexa Mini LF + Cooke Anamorphic / DaVinci Resolve Studio');
  const [vidMusic, setVidMusic] = useState('Electronic Ambient Synth with Rhythmic Cutting');
  const [vidResult, setVidResult] = useState('');
  const [loadingVid, setLoadingVid] = useState(false);

  // 6. Document Summarizer State
  const [docName, setDocName] = useState('Commercial_Film_Master_Service_Agreement_2026.pdf');
  const [docContent, setDocContent] = useState(
    `MASTER PRODUCTION AGREEMENT
Client: Vanguard Films
Director & Colorist: DHINESH KUMAR (Phone: 9360302306)

1. Scope: Post-production editing, color grading, sound design, and master delivery.
2. Revisions: Includes 3 rounds of creative client revisions. Additional revisions billed at $120/hr.
3. Deliverables: Master delivery in 4K DCI ProRes 4444 XQ and Rec.709 web delivery.
4. Payment: 50% advance deposit prior to project inception; 50% upon final master export approval.
5. Rights: Commercial broadcast and web usage worldwide in perpetuity upon full compensation.`
  );
  const [docResult, setDocResult] = useState('');
  const [loadingDoc, setLoadingDoc] = useState(false);

  // 7. AI Chat Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    {
      role: 'model',
      text: "Greetings! I am Dhinesh Kumar's AI Studio Assistant. How can I assist you with video editing treatments, color grading consultations, or scheduling creative projects today?"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tool Handlers
  const handleDescribeImage = async () => {
    setLoadingImg(true);
    try {
      const res = await generateImageDescription({
        title: imgTitle,
        category: imgCategory,
        mood: imgMood,
        style: imgStyle,
        imageBase64: imgPreview.startsWith('data:') ? imgPreview : undefined
      });
      setImgResult(res);
    } catch (err: any) {
      setImgResult(`Error: ${err.message || 'Unable to generate description'}`);
    } finally {
      setLoadingImg(false);
    }
  };

  const handleWritingAssistant = async () => {
    setLoadingWrite(true);
    try {
      const res = await generateWritingAssistant({
        topic: writeTopic,
        format: writeFormat,
        targetAudience: writeAudience,
        tone: writeTone
      });
      setWriteResult(res);
    } catch (err: any) {
      setWriteResult(`Error: ${err.message || 'Unable to generate content'}`);
    } finally {
      setLoadingWrite(false);
    }
  };

  const handleSummarizeText = async () => {
    setLoadingSummary(true);
    try {
      const res = await summarizeText({
        text: summaryInput,
        targetLength: summaryLength
      });
      setSummaryResult(res);
    } catch (err: any) {
      setSummaryResult(`Error: ${err.message || 'Unable to summarize text'}`);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleAnalyzeImage = async () => {
    setLoadingVision(true);
    try {
      let base64 = visionImage;
      if (!base64.startsWith('data:')) {
        // Fetch and convert image to base64 for API
        const response = await fetch(visionImage);
        const blob = await response.blob();
        base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }
      const res = await analyzeImage({
        imageBase64: base64,
        customFocus: visionFocus
      });
      setVisionResult(res);
    } catch (err: any) {
      setVisionResult(`Error: ${err.message || 'Unable to analyze image'}`);
    } finally {
      setLoadingVision(false);
    }
  };

  const handleVideoDesc = async () => {
    setLoadingVid(true);
    try {
      const res = await generateVideoDescription({
        title: vidTitle,
        genre: vidGenre,
        cameraUsed: vidCamera,
        music: vidMusic
      });
      setVidResult(res);
    } catch (err: any) {
      setVidResult(`Error: ${err.message || 'Unable to generate video metadata'}`);
    } finally {
      setLoadingVid(false);
    }
  };

  const handleDocSummary = async () => {
    setLoadingDoc(true);
    try {
      const res = await summarizeDocument({
        documentName: docName,
        documentText: docContent
      });
      setDocResult(res);
    } catch (err: any) {
      setDocResult(`Error: ${err.message || 'Unable to summarize document'}`);
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loadingChat) return;
    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoadingChat(true);

    try {
      const reply = await sendAiChatMessage({
        messages: chatMessages,
        userMessage: userText
      });
      setChatMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'model', text: `Apologies, I encountered an error: ${err.message}. Please connect with Dhinesh Kumar directly at 9360302306.` }
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const tools = [
    { id: 'image-desc', label: 'Image Description', icon: Camera, desc: 'Generate poetic, commercial photo narratives' },
    { id: 'writing', label: 'Writing Assistant', icon: PenTool, desc: 'Draft proposals, pitch decks & film treatments' },
    { id: 'summarizer', label: 'Text Summarizer', icon: FileText, desc: 'Distill briefs, screenplays & manuscripts' },
    { id: 'image-analysis', label: 'Vision Analysis', icon: Eye, desc: 'Multi-modal analysis of lighting, contrast & color' },
    { id: 'video-desc', label: 'Video SEO & Metadata', icon: Film, desc: 'Create YouTube/Vimeo chapters, titles & tags' },
    { id: 'doc-summary', label: 'Document Summary', icon: FileSearch, desc: 'Analyze contracts, rate cards & technical agreements' },
    { id: 'chat', label: 'Creative Chatbot', icon: MessageSquare, desc: 'Interactive assistant for client consultation' },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-purple-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Studio Engine · Powered by Gemini</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            Dhinesh Kumar AI Studio
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Seven state-of-the-art creative intelligence tools engineered to augment video directing, color grading workflows, editorial copywriting, and visual analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono bg-zinc-900/80 border border-zinc-800 px-3.5 py-2 rounded-xl">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Server-Side Gemini 3.8 Flash Active</span>
        </div>
      </div>

      {/* Tool Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as AiToolKey)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isActive
                  ? 'bg-gradient-to-br from-purple-950/70 to-zinc-900 border-purple-500/80 shadow-lg shadow-purple-500/10'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <div className={`p-2 rounded-xl w-fit ${isActive ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                  {t.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Tool Execution Pane */}
      <div className="rounded-3xl border border-zinc-800 bg-[#121218] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. IMAGE DESCRIPTION GENERATOR */}
        {activeTool === 'image-desc' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-400" />
                  <span>AI Image Description Generator</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Craft museum-grade gallery statements, technical lighting breakdowns, and commercial metadata.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Artwork Title</label>
                  <input
                    type="text"
                    value={imgTitle}
                    onChange={(e) => setImgTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-300">Category</label>
                    <input
                      type="text"
                      value={imgCategory}
                      onChange={(e) => setImgCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-300">Style</label>
                    <input
                      type="text"
                      value={imgStyle}
                      onChange={(e) => setImgStyle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Lighting & Mood</label>
                  <textarea
                    rows={2}
                    value={imgMood}
                    onChange={(e) => setImgMood(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  onClick={handleDescribeImage}
                  disabled={loadingImg}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  {loadingImg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Generate Editorial Description</span>
                </button>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">AI Generated Output</span>
                  {imgResult && (
                    <button
                      onClick={() => copyToClipboard(imgResult)}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 min-h-[220px] text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {imgResult ? imgResult : <span className="text-zinc-600 italic">Click "Generate Editorial Description" to craft artistic and commercial metadata...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. WRITING ASSISTANT */}
        {activeTool === 'writing' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PenTool className="w-5 h-5 text-purple-400" />
                <span>AI Writing Assistant</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Draft client proposals, pitch treatments, film director statements, and social media copy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Project / Topic</label>
                  <input
                    type="text"
                    value={writeTopic}
                    onChange={(e) => setWriteTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Format</label>
                  <select
                    value={writeFormat}
                    onChange={(e) => setWriteFormat(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    <option>Client Proposal Pitch Deck</option>
                    <option>Director Treatment Statement</option>
                    <option>Commercial Production Estimate Letter</option>
                    <option>Instagram / LinkedIn Carousel Copy</option>
                    <option>Film Festival Submission Synopsis</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-300">Target Audience</label>
                    <input
                      type="text"
                      value={writeAudience}
                      onChange={(e) => setWriteAudience(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-300">Tone</label>
                    <input
                      type="text"
                      value={writeTone}
                      onChange={(e) => setWriteTone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <button
                  onClick={handleWritingAssistant}
                  disabled={loadingWrite}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-500/10"
                >
                  {loadingWrite ? <Loader2 className="w-4 h-4 animate-spin" /> : <PenTool className="w-4 h-4" />}
                  <span>Generate Copy</span>
                </button>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Output Treatment</span>
                  {writeResult && (
                    <button
                      onClick={() => copyToClipboard(writeResult)}
                      className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 min-h-[260px] text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {writeResult || <span className="text-zinc-600 italic">Click "Generate Copy" to draft tailored proposal text...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TEXT SUMMARIZER */}
        {activeTool === 'summarizer' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>AI Text Summarizer</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Distill long client briefs, screenplays, shoot schedules, and technical requirements into key action items.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Paste Script or Brief</label>
                  <textarea
                    rows={7}
                    value={summaryInput}
                    onChange={(e) => setSummaryInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed font-mono"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="executive one-page summary">Executive Summary</option>
                    <option value="bulleted action items list">Action Items List</option>
                    <option value="technical director punchlist">Technical Director Punchlist</option>
                  </select>

                  <button
                    onClick={handleSummarizeText}
                    disabled={loadingSummary}
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {loadingSummary ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                    <span>Summarize Brief</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Executive Summary</span>
                  {summaryResult && (
                    <button
                      onClick={() => copyToClipboard(summaryResult)}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 min-h-[220px] text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {summaryResult || <span className="text-zinc-600 italic">Click "Summarize Brief" to extract key deliverables...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. VISION / IMAGE ANALYSIS */}
        {activeTool === 'image-analysis' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-400" />
                <span>AI Image & Visual Analysis (Multimodal Vision)</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Deep technical critique of composition, lighting ratios, color palettes, and DaVinci Resolve grading curves.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
                  <img
                    src={visionImage}
                    alt="Vision Target"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 backdrop-blur-md bg-black/60 px-2 py-1 rounded text-[10px] text-zinc-300">
                    Sample Frame
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Focus of Analysis</label>
                  <input
                    type="text"
                    value={visionFocus}
                    onChange={(e) => setVisionFocus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <button
                  onClick={handleAnalyzeImage}
                  disabled={loadingVision}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loadingVision ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                  <span>Run Multimodal Vision Audit</span>
                </button>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Cinematography & Color Audit</span>
                  {visionResult && (
                    <button
                      onClick={() => copyToClipboard(visionResult)}
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 min-h-[260px] text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
                  {visionResult || <span className="text-zinc-600 italic">Click "Run Multimodal Vision Audit" to inspect color temperature, composition lines, and dynamic range...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. VIDEO DESCRIPTION GENERATOR */}
        {activeTool === 'video-desc' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Film className="w-5 h-5 text-purple-400" />
                <span>AI Video Description & SEO Generator</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Produce YouTube/Vimeo chapters, timestamps, production credits, high-CTR titles, and tags.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Video Title</label>
                  <input
                    type="text"
                    value={vidTitle}
                    onChange={(e) => setVidTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-300">Genre</label>
                    <input
                      type="text"
                      value={vidGenre}
                      onChange={(e) => setVidGenre(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-300">Camera / Tools</label>
                    <input
                      type="text"
                      value={vidCamera}
                      onChange={(e) => setVidCamera(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Music & Pacing</label>
                  <input
                    type="text"
                    value={vidMusic}
                    onChange={(e) => setVidMusic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <button
                  onClick={handleVideoDesc}
                  disabled={loadingVid}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loadingVid ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
                  <span>Generate Video SEO Package</span>
                </button>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Video Metadata & Chapters</span>
                  {vidResult && (
                    <button
                      onClick={() => copyToClipboard(vidResult)}
                      className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 min-h-[260px] text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto">
                  {vidResult || <span className="text-zinc-600 italic">Click "Generate Video SEO Package" for titles, chapters, and keywords...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. DOCUMENT SUMMARIZER */}
        {activeTool === 'doc-summary' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-amber-400" />
                <span>AI Document & Contract Summarizer</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Parse client contracts, licensing agreements, resumes, and technical specification PDFs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Document Name</label>
                  <input
                    type="text"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-300">Document Text</label>
                  <textarea
                    rows={6}
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400 font-mono text-[11px] leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleDocSummary}
                  disabled={loadingDoc}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loadingDoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSearch className="w-4 h-4" />}
                  <span>Summarize Document</span>
                </button>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Analysis & Legal Highlights</span>
                  {docResult && (
                    <button
                      onClick={() => copyToClipboard(docResult)}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 min-h-[220px] text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {docResult || <span className="text-zinc-600 italic">Click "Summarize Document" to extract clauses, milestones, and payment terms...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. AI CHAT ASSISTANT */}
        {activeTool === 'chat' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  <span>Dhinesh Kumar AI Chat Assistant</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Ask questions about Dhinesh's services, portfolio pieces, rates, or request a custom creative consultation.
                </p>
              </div>

              <a
                href="tel:9360302306"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/30"
              >
                <span>Direct Line: 9360302306</span>
              </a>
            </div>

            <div className="space-y-4">
              {/* Chat Log Window */}
              <div className="h-80 overflow-y-auto rounded-2xl bg-zinc-950/70 border border-zinc-800 p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-amber-400 text-zinc-950 font-medium'
                          : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loadingChat && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 text-zinc-400 rounded-2xl p-3 text-xs flex items-center gap-2 border border-zinc-800">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                      <span>Dhinesh Kumar Studio AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleChatSend} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about directing rates, color grading suites, or portfolio projects..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  disabled={loadingChat || !chatInput.trim()}
                  className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
