import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Film,
  Camera,
  Layers,
  Award,
  Sliders,
  CheckCircle2,
  Calendar,
  Globe,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile, setActiveTab } = usePortfolio();

  const skills = [
    { name: 'DaVinci Resolve Studio (Color Grading)', level: 98, category: 'Color Science' },
    { name: 'Adobe Premiere Pro (Commercial Video Editing)', level: 96, category: 'Post-Production' },
    { name: 'Adobe After Effects (Motion Graphics & VFX)', level: 90, category: 'Motion' },
    { name: 'Adobe Lightroom Classic & Photoshop (High-End Retouching)', level: 95, category: 'Stills' },
    { name: 'ARRI Alexa & RED IPP2 Film Workflow', level: 92, category: 'Cinematography' },
    { name: 'Sound Design & Audio Mastering', level: 88, category: 'Audio' },
    { name: 'Creative Directing & Treatment Pitching', level: 94, category: 'Direction' },
    { name: '3D LUT Formulation (Kodak 250D / Fuji Eterna Emulation)', level: 96, category: 'Color Science' }
  ];

  const milestones = [
    {
      year: '2026',
      title: 'Global Commercial Campaigns & AI Studio Launch',
      desc: 'Directed international brand spots and established an AI-augmented post-production suite integrating Gemini multimodal vision.'
    },
    {
      year: '2024 - 2025',
      title: 'Senior Colorist & Lead Commercial Editor',
      desc: 'Delivered color grading and editing for 50+ fashion films, automotive broadcasts, and charting music videos across India and Southeast Asia.'
    },
    {
      year: '2021 - 2023',
      title: 'Editorial Photography & Showreel Recognition',
      desc: 'Recognized for high-contrast noir and golden hour editorial portraiture. Expanded studio client base to luxury lifestyle brands.'
    },
    {
      year: '2018 - 2020',
      title: 'Studio Inception & Independent Filmmaking',
      desc: 'Founded DHINESH KUMAR Creative Studio in Ramanathapuram, mastering DaVinci Resolve color science and 35mm film aesthetics.'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header & Personal Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#121216] shadow-2xl">
            <img
              src={profile?.avatar || '/assets/dhinesh_video_editor.jpg'}
              alt="Dhinesh Kumar — Professional Video Editor"
              referrerPolicy="no-referrer"
              className="w-full h-[500px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/70 border border-white/10 p-4 rounded-2xl space-y-1">
              <div className="text-xs font-mono uppercase text-amber-400">The Editor</div>
              <div className="text-xl font-extrabold text-white">DHINESH KUMAR</div>
              <div className="text-xs text-amber-300 font-medium">Professional Video Editor · Director · Colorist</div>
              <div className="pt-2 flex flex-col gap-1 text-xs text-zinc-400 font-mono">
                <div className="flex items-center justify-between">
                  <span>Direct: 9360302306</span>
                  <span>Ramanathapuram / Global</span>
                </div>
                <div className="text-purple-300">2kdhinesh2k@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Philosophy & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            About DHINESH KUMAR
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            I am a <strong className="text-amber-400 font-bold">Professional Video Editor</strong>, filmmaker, and colorist dedicated to creating high-impact visual stories that command attention, evoke emotion, and drive engagement.
          </p>

          <p className="text-zinc-400 text-sm leading-relaxed">
            With over eight years behind the monitor and editing suite, I specialize in commercial video editing, YouTube and social media video pacing, DaVinci Resolve color science (Kodak 250D, Fuji 3513, and ARRI LogC4 curves), and high-fashion editorial retouching. I transform raw production footage into polished broadcast masters.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <Film className="w-5 h-5 text-purple-400" />
              <div className="text-sm font-bold text-white">Video Editing</div>
              <div className="text-xs text-zinc-400">Rhythm, match cuts & pacing</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <Sliders className="w-5 h-5 text-amber-400" />
              <div className="text-sm font-bold text-white">Color Science</div>
              <div className="text-xs text-zinc-400">DaVinci Resolve studio grade</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1 col-span-2 sm:col-span-1">
              <Camera className="w-5 h-5 text-emerald-400" />
              <div className="text-sm font-bold text-white">Fine Art Stills</div>
              <div className="text-xs text-zinc-400">Editorial & studio portraits</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              Book Video Editing
            </button>
            <a
              href="tel:9360302306"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: 9360302306</span>
            </a>
            <a
              href="mailto:2kdhinesh2k@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-950/40 border border-purple-800 hover:border-purple-600 text-purple-200 text-xs font-semibold"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>2kdhinesh2k@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Technical Skill Matrix */}
      <div className="space-y-6 pt-6 border-t border-zinc-800/80">
        <div>
          <div className="text-xs font-mono uppercase text-amber-400 tracking-wider">Proficiency</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Technical Mastery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{skill.name}</span>
                <span className="font-mono text-amber-400 tabular-nums">{skill.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-purple-500 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-[11px] font-mono text-zinc-500">{skill.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Timeline & Milestones */}
      <div className="space-y-6 pt-6 border-t border-zinc-800/80">
        <div>
          <div className="text-xs font-mono uppercase text-purple-400 tracking-wider">Evolution</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Career Milestones</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#121216] border border-zinc-800/90 space-y-3 relative">
              <div className="text-2xl font-black font-mono text-amber-400">{m.year}</div>
              <h3 className="text-sm font-bold text-white">{m.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
