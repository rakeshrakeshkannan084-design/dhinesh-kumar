/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhotoGallery } from './components/PhotoGallery';
import { VideoGallery } from './components/VideoGallery';
import { DocumentManager } from './components/DocumentManager';
import { AiStudio } from './components/AiStudio';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { LightboxModal } from './components/LightboxModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#0A0A0E] text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <Hero />}
        {activeTab === 'photos' && <PhotoGallery />}
        {activeTab === 'videos' && <VideoGallery />}
        {activeTab === 'documents' && <DocumentManager />}
        {activeTab === 'ai-studio' && <AiStudio />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'contact' && <ContactSection />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <LightboxModal />
      <VideoPlayerModal />
      <DocumentPreviewModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
