import React, { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Film,
  Phone,
  MessageCircle
} from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideoItem, closeVideoPlayer } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoPlayer();
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeVideoPlayer]);

  if (!activeVideoItem) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);

    const format = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };
    setCurrentTime(format(current));
    setDuration(format(total));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = targetTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#121218] border border-zinc-800 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 bg-[#0E0E14]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-300 px-2.5 py-1 rounded-md border border-purple-500/20">
              {activeVideoItem.category}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
              {activeVideoItem.title}
            </h2>
          </div>
          <button
            onClick={closeVideoPlayer}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={activeVideoItem.url}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Center Play Overlay Icon when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2">
            {/* Scrubber Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-zinc-700 accent-amber-400 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs text-zinc-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="hover:text-amber-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="hover:text-amber-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-zinc-400">
                  {currentTime} / {duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest hidden sm:inline">
                  4K ProRes Master
                </span>
                <button
                  onClick={handleFullscreen}
                  className="hover:text-amber-400 transition-colors"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details Strip */}
        <div className="p-5 bg-[#0E0E14] border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeVideoItem.description}
            </p>
            <div className="text-[11px] text-zinc-500 font-mono">
              Directed & Color Graded by DHINESH KUMAR · Contact: 9360302306
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="tel:9360302306"
              className="px-3.5 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Inquire Rate</span>
            </a>
            <a
              href={`https://wa.me/919360302306?text=Hi%20Dhinesh,%20I%20am%20watching%20your%20video%20"${encodeURIComponent(activeVideoItem.title)}"%20and%20would%20like%20to%20collaborate`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
