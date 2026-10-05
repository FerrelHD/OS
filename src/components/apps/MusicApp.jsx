import React, { useState, useEffect, useRef } from 'react';
import { useSystem } from '../../context/SystemContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Repeat,
  Shuffle,
  Music2,
  Radio,
  Compass,
  Clock,
  ListMusic,
} from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: 'Starboy (feat. Daft Punk)',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: '3:50',
    durationSec: 230,
    genre: 'Synthpop / R&B',
    coverGradient: 'from-purple-700 via-pink-600 to-amber-500',
  },
  {
    id: 2,
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We’re Dreaming',
    duration: '4:03',
    durationSec: 243,
    genre: 'Electronic / Synthwave',
    coverGradient: 'from-blue-700 via-indigo-600 to-cyan-400',
  },
  {
    id: 3,
    title: 'Resonance',
    artist: 'HOME',
    album: 'Odyssey',
    duration: '3:32',
    durationSec: 212,
    genre: 'Chillwave',
    coverGradient: 'from-amber-600 via-rose-500 to-violet-600',
  },
  {
    id: 4,
    title: 'Golden Gate Sunset',
    artist: 'Ambient Soundscape',
    album: 'San Francisco Sessions',
    duration: '2:45',
    durationSec: 165,
    genre: 'Lo-Fi Ambient',
    coverGradient: 'from-emerald-600 via-teal-500 to-sky-600',
  },
];

export default function MusicApp() {
  const { volume, updateSetting } = useSystem();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(45);
  const [activeCategory, setActiveCategory] = useState('Listen Now');
  const [isLiked, setIsLiked] = useState(false);

  const currentTrack = TRACKS[currentTrackIndex];

  // Simulation playback timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            // Next track
            setCurrentTrackIndex((idx) => (idx + 1) % TRACKS.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.durationSec]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgressSec(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgressSec(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#1A1A1A] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-48 bg-slate-50 dark:bg-white/[0.03] border-r border-black/10 dark:border-white/10 p-3 flex flex-col justify-between flex-shrink-0 text-xs">
          <div className="space-y-4">
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Apple Music
              </div>
              <div className="space-y-0.5 mt-1">
                {['Listen Now', 'Browse', 'Radio'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                      activeCategory === cat
                        ? 'bg-rose-500 text-white font-medium shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat === 'Listen Now' && <Music2 className="w-3.5 h-3.5" />}
                    {cat === 'Browse' && <Compass className="w-3.5 h-3.5" />}
                    {cat === 'Radio' && <Radio className="w-3.5 h-3.5" />}
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Playlists
              </div>
              <div className="space-y-0.5 mt-1">
                {['Lo-Fi Beats', 'Synthwave Night', 'Coding Focus'].map((pl) => (
                  <button
                    key={pl}
                    onClick={() => setActiveCategory(pl)}
                    className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                      activeCategory === pl
                        ? 'bg-rose-500 text-white font-medium shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <ListMusic className="w-3.5 h-3.5 text-rose-500" />
                    <span>{pl}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {/* Hero Album Banner */}
          <div
            className={`w-full rounded-2xl bg-gradient-to-tr ${currentTrack.coverGradient} p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-6`}
          >
            {/* Artwork */}
            <div className="w-36 h-36 rounded-xl bg-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center flex-shrink-0 border border-white/30">
              <Music2 className="w-16 h-16 text-white/80 animate-pulse" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                Featured Album
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {currentTrack.album}
              </h1>
              <p className="text-sm text-white/90 mt-1 font-medium">
                {currentTrack.artist} • {currentTrack.genre}
              </p>

              <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={togglePlay}
                  className="px-5 py-2 rounded-full bg-white text-slate-900 font-semibold text-xs hover:scale-105 transition active:scale-95 shadow-lg flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full backdrop-blur-md transition ${
                    isLiked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title="Favorite Track"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Tracklist Table */}
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 px-3 mb-2">
              Songs ({TRACKS.length})
            </h3>
            {TRACKS.map((track, idx) => {
              const isCurrent = idx === currentTrackIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setProgressSec(0);
                    setIsPlaying(true);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition select-none group ${
                    isCurrent
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="w-4 text-xs text-slate-400 text-center font-mono">
                      {isCurrent && isPlaying ? '▶' : idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate leading-tight">
                        {track.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {track.artist}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span className="hidden md:inline truncate max-w-[140px]">{track.album}</span>
                    <span className="font-mono">{track.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Bottom Control Playback Bar */}
      <div className="h-16 px-4 bg-slate-100/90 dark:bg-[#141414] border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
        {/* Track Thumbnail Info */}
        <div className="flex items-center space-x-3 w-56">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${currentTrack.coverGradient} shadow-md flex items-center justify-center text-white flex-shrink-0`}
          >
            <Music2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate leading-tight">{currentTrack.title}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentTrack.artist}</div>
          </div>
        </div>

        {/* Center Controls & Progress */}
        <div className="flex-1 max-w-md flex flex-col items-center gap-1">
          <div className="flex items-center space-x-3">
            <button onClick={handlePrev} className="p-1 hover:text-rose-500 transition">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition shadow-sm active:scale-95"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button onClick={handleNext} className="p-1 hover:text-rose-500 transition">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full flex items-center space-x-2 text-[10px] font-mono text-slate-500">
            <span>{formatTime(progressSec)}</span>
            <div
              className="flex-1 h-1 bg-black/10 dark:bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickRatio = (e.clientX - rect.left) / rect.width;
                setProgressSec(Math.round(clickRatio * currentTrack.durationSec));
              }}
            >
              <div
                className="bg-rose-500 h-full rounded-full transition-all"
                style={{ width: `${(progressSec / currentTrack.durationSec) * 100}%` }}
              />
            </div>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Volume & Aux */}
        <div className="w-44 flex items-center justify-end space-x-2">
          <button
            onClick={() => updateSetting('volume', volume > 0 ? 0 : 80)}
            className="hover:opacity-75"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => updateSetting('volume', parseInt(e.target.value, 10))}
            className="w-24 h-2 bg-black/10 dark:bg-white/20 rounded-full appearance-none accent-rose-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
