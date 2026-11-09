import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ViewTab } from '../types';
import { Phone, MessageCircle, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; tab: ViewTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Photo Gallery', tab: 'photos' },
    { label: 'Video Showcase', tab: 'videos' },
    { label: 'Documents', tab: 'documents' },
    { label: 'AI Studio', tab: 'ai-studio' },
    { label: 'About Me', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
    { label: 'Admin Portal', tab: 'admin' },
  ];

  return (
    <footer className="mt-24 border-t border-zinc-800/80 bg-[#0A0A0E] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-purple-500 to-amber-300 p-[1.5px] shadow-lg shadow-purple-500/10 overflow-hidden shrink-0">
                <img
                  src="/assets/dhinesh_video_editor.jpg"
                  alt="Dhinesh Kumar"
                  className="w-full h-full object-cover object-top rounded-[10px]"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-wider text-white uppercase block">
                  DHINESH KUMAR
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase">
                  Professional Video Editor · Film & Motion
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Ultra-premium creative portfolio dedicated to professional video editing, cinematic storytelling, and DaVinci Resolve color grading.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:9360302306"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-amber-300 hover:border-amber-400/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>9360302306</span>
              </a>
              <a
                href="mailto:2kdhinesh2k@gmail.com"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-purple-300 hover:border-purple-400/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>2kdhinesh2k@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919360302306"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-emerald-400 hover:border-emerald-400/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase text-zinc-300 tracking-wider">
              Studio Portals
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => {
                    setActiveTab(link.tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-zinc-400 hover:text-amber-400 transition-colors py-1 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Booking & Inquiries */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-zinc-300 tracking-wider">
              Studio Base
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Available for commercial productions, feature film color grading, and on-location editorial shoots worldwide.
            </p>
            <div className="pt-2 text-xs text-zinc-300 font-mono">
              <div>Ramanathapuram, Tamil Nadu</div>
              <a href="mailto:2kdhinesh2k@gmail.com" className="text-amber-400 hover:underline">
                2kdhinesh2k@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © 2026 DHINESH KUMAR. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Ramanathapuram · Worldwide</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
