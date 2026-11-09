import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ViewTab } from '../types';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  Shield,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, theme, toggleTheme, isAdmin } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; tab: ViewTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Photos', tab: 'photos' },
    { label: 'Videos', tab: 'videos' },
    { label: 'Documents', tab: 'documents' },
    { label: 'AI Studio', tab: 'ai-studio' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleNavClick = (tab: ViewTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0A0E]/85 dark:bg-[#0A0A0E]/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with gold/violet accents) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer shrink-0 focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-purple-500 to-amber-300 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:shadow-amber-500/30 transition-all duration-300 overflow-hidden shrink-0">
            <img
              src="/assets/dhinesh_video_editor.jpg"
              alt="Dhinesh Kumar"
              className="w-full h-full object-cover object-top rounded-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase whitespace-nowrap group-hover:text-amber-300 transition-colors">
              DHINESH KUMAR
            </span>
            <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase whitespace-nowrap">
              Professional Video Editor · Film & Motion
            </span>
          </div>
        </button>

        {/* Zone 2: Nav Links (Clean single-line typography) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.tab;
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`cursor-pointer transition-all duration-200 whitespace-nowrap relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Direct Call Button */}
          <a
            href="tel:9360302306"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-amber-300 bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-colors whitespace-nowrap"
            title="Direct Contact: 9360302306"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="tabular-nums">9360302306</span>
          </a>

          {/* AI Studio Trigger Icon */}
          <button
            onClick={() => handleNavClick('ai-studio')}
            aria-label="Open AI Studio"
            className={`p-2 rounded-lg text-xs font-medium border transition-all ${
              activeTab === 'ai-studio'
                ? 'bg-purple-950/60 border-purple-500/60 text-purple-200 shadow-sm shadow-purple-500/20'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-purple-300 hover:border-purple-500/30'
            }`}
            title="Launch AI Studio with Gemini"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Color Theme"
            className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-amber-300 hover:border-zinc-700 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-300" />
            )}
          </button>

          {/* Admin Dashboard Action */}
          <button
            onClick={() => handleNavClick('admin')}
            aria-label="Admin Portal"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isAdmin
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Active</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>Admin</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#0E0E14] border-b border-zinc-800/90 shadow-2xl space-y-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.tab;
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-amber-400 text-xs">●</span>}
              </button>
            );
          })}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            <a
              href="tel:9360302306"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dhinesh Kumar: 9360302306</span>
            </a>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-400" />
              <span>{isAdmin ? 'Admin Dashboard (Active)' : 'Admin Dashboard Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
