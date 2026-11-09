import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ArrowRight,
  Play,
  Camera,
  Film,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, profile, items, openLightbox, openVideoPlayer } = usePortfolio();

  const featuredPhotos = items.filter((it) => it.type === 'photo' && it.featured).slice(0, 2);
  const featuredVideo = items.find((it) => it.type === 'video' && it.featured);

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle Background Glows (Gold and Violet) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Available for Global Commissions & Editorial Directing</span>
              <span className="text-zinc-500">·</span>
              <span className="text-amber-400 font-semibold tabular-nums">2026 Season</span>
            </div>

            {/* Oversized Brand Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
                DHINESH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400">
                  KUMAR
                </span>
              </h1>
              <p className="text-base sm:text-lg text-amber-300 font-semibold tracking-wide">
                Professional Video Editor · Film Director · Master Colorist
              </p>
            </div>

            {/* Introduction Lead Copy */}
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Crafting high-impact visual stories through professional video editing, rhythmic pacing, DaVinci Resolve color science, and cinematic motion. Based in Ramanathapuram, delivering commercial productions worldwide.
            </p>

            {/* Contact Quick Connect Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="tel:9360302306"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 text-xs font-semibold text-zinc-200 hover:text-amber-300 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: 9360302306</span>
              </a>
              <a
                href="https://wa.me/919360302306?text=Hi%20Dhinesh,%20I%20am%20interested%20in%20your%20video%20editing%20services"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 text-xs font-semibold text-zinc-200 hover:text-emerald-400 transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:2kdhinesh2k@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-purple-500/50 text-xs font-semibold text-zinc-200 hover:text-purple-300 transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>2kdhinesh2k@gmail.com</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('videos')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Explore My Works</span>
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-semibold text-sm border border-zinc-800 hover:border-zinc-700 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Photo Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-semibold text-sm border border-purple-800/50 hover:border-purple-600 transition-all cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/30 via-purple-600/30 to-amber-400/20 rounded-3xl blur-xl opacity-75" />

              {/* Main Portrait Card */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800/90 bg-[#121216] shadow-2xl">
                <img
                  src={profile?.avatar || '/assets/dhinesh_video_editor.jpg'}
                  alt="Dhinesh Kumar — Professional Video Editor"
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] sm:h-[540px] object-cover object-center hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Gradient Over Photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-90" />

                {/* Floating Glassmorphic Badges */}
                <div className="absolute top-4 right-4 backdrop-blur-md bg-black/60 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-300 flex items-center gap-1.5 shadow-lg">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span>Professional Video Editor</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 backdrop-blur-md bg-black/70 border border-white/10 p-4 rounded-xl space-y-1.5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base tracking-wide">
                      DHINESH KUMAR
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                      Video Editing Studio
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Premiere Pro & DaVinci Resolve Studio Master · Commercial & YouTube Video Editor
                  </p>
                  <div className="pt-1 flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                    <span>9360302306</span>
                    <span>·</span>
                    <span>2kdhinesh2k@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative Statistics Strip */}
        <div className="mt-16 pt-10 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight font-mono tabular-nums">
                {profile?.stats.projectsCompleted || 260}+
              </div>
              <div className="text-sm font-semibold text-white">Creative Projects</div>
              <div className="text-xs text-zinc-400">Campaigns, films & exhibitions</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 tracking-tight font-mono tabular-nums">
                {profile?.stats.videosEdited || 94}+
              </div>
              <div className="text-sm font-semibold text-white">Edited Videos</div>
              <div className="text-xs text-zinc-400">Commercial ads & music films</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight font-mono tabular-nums">
                {profile?.stats.photosRetouched || 1450}+
              </div>
              <div className="text-sm font-semibold text-white">Photos Retouched</div>
              <div className="text-xs text-zinc-400">Editorial, street & portraits</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight font-mono tabular-nums">
                {profile?.stats.clientSatisfaction || 99.8}%
              </div>
              <div className="text-sm font-semibold text-white">Client Satisfaction</div>
              <div className="text-xs text-zinc-400">Global retention & accolades</div>
            </div>
          </div>
        </div>

        {/* Featured Creative Work Spotlight Bento */}
        <div className="mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Curated Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Creative Works
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('photos')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View Complete Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Video Card (Spans 7 cols) */}
            {featuredVideo && (
              <div
                onClick={() => openVideoPlayer(featuredVideo)}
                className="md:col-span-7 group relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#121216] cursor-pointer shadow-xl hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-400/90 text-zinc-950 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-amber-300 transition-all">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 backdrop-blur-md bg-black/60 px-3 py-1 rounded-lg text-xs font-mono text-zinc-200">
                    {featuredVideo.duration || '02:45'}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                    {featuredVideo.category}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {featuredVideo.description}
                  </p>
                </div>
              </div>
            )}

            {/* Featured Photo Cards (Spans 5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {featuredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                  className="group relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#121216] cursor-pointer shadow-lg hover:border-purple-500/50 transition-all flex flex-col sm:flex-row flex-1"
                >
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <img
                      src={photo.thumbnail || photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="sm:w-3/5 p-4 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="text-[11px] text-purple-400 font-mono uppercase tracking-wider">
                        {photo.category}
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                        {photo.description}
                      </p>
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      {photo.dimensions || 'High Resolution'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
