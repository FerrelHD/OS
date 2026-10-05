import React, { useState, useEffect, useRef } from 'react';
import { useSystem } from '../../context/SystemContext';
import { useWindow } from '../../context/WindowContext';
import {
  Wifi,
  Bluetooth,
  Radio,
  Moon,
  Sun,
  SunMedium,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Layers,
} from 'lucide-react';

export default function ControlCenter() {
  const {
    isControlCenterOpen,
    setIsControlCenterOpen,
    theme,
    toggleTheme,
    brightness,
    volume,
    updateSetting,
  } = useSystem();

  const { openWindow } = useWindow();

  // Local states for connectivity modules
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airDropEnabled, setAirDropEnabled] = useState(true);
  const [stageManagerEnabled, setStageManagerEnabled] = useState(false);

  // Mini Now Playing state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(38); // 38%

  const popoverRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        // Only close if click is not inside the menubar control center trigger button
        const isMenubarTrigger = e.target.closest('[title="Control Center"]');
        if (!isMenubarTrigger) {
          setIsControlCenterOpen(false);
        }
      }
    };
    if (isControlCenterOpen) {
      window.addEventListener('pointerdown', handleOutsideClick);
    }
    return () => window.removeEventListener('pointerdown', handleOutsideClick);
  }, [isControlCenterOpen, setIsControlCenterOpen]);

  if (!isControlCenterOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed top-[34px] right-3 z-50 w-[320px] rounded-2xl glass-modal shadow-2xl p-3 border border-white/30 dark:border-white/10 text-slate-800 dark:text-slate-100 select-none animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-2.5"
    >
      {/* Top 2-Column Section */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Connectivity Module */}
        <div className="bg-white/40 dark:bg-black/30 p-2.5 rounded-xl border border-white/20 dark:border-white/5 flex flex-col gap-2 shadow-sm">
          {/* Wi-Fi */}
          <button
            onClick={() => setWifiEnabled(!wifiEnabled)}
            className="flex items-center space-x-2 text-left w-full group focus:outline-none"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                wifiEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-black/10 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Wifi className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold leading-tight">Wi-Fi</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {wifiEnabled ? 'GoldenGate_5G' : 'Off'}
              </div>
            </div>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            className="flex items-center space-x-2 text-left w-full group focus:outline-none"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                bluetoothEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-black/10 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Bluetooth className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold leading-tight">Bluetooth</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {bluetoothEnabled ? 'On' : 'Off'}
              </div>
            </div>
          </button>

          {/* AirDrop */}
          <button
            onClick={() => setAirDropEnabled(!airDropEnabled)}
            className="flex items-center space-x-2 text-left w-full group focus:outline-none"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                airDropEnabled
                  ? 'bg-blue-600 text-white'
                  : 'bg-black/10 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Radio className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold leading-tight">AirDrop</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {airDropEnabled ? 'Contacts Only' : 'Off'}
              </div>
            </div>
          </button>
        </div>

        {/* Right Stack: Dark Mode & Stage Manager */}
        <div className="flex flex-col gap-2.5">
          {/* Dark Mode Tile */}
          <button
            onClick={toggleTheme}
            className={`flex-1 p-2.5 rounded-xl border border-white/20 dark:border-white/5 flex items-center space-x-2.5 text-left transition shadow-sm focus:outline-none ${
              theme === 'dark'
                ? 'bg-blue-600/90 text-white'
                : 'bg-white/40 dark:bg-black/30 hover:bg-white/50'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-slate-700'
              }`}
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-[12px] font-semibold leading-tight">Dark Mode</div>
              <div
                className={`text-[10px] ${
                  theme === 'dark' ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {theme === 'dark' ? 'On' : 'Off'}
              </div>
            </div>
          </button>

          {/* Stage Manager Tile */}
          <button
            onClick={() => setStageManagerEnabled(!stageManagerEnabled)}
            className={`flex-1 p-2.5 rounded-xl border border-white/20 dark:border-white/5 flex items-center space-x-2.5 text-left transition shadow-sm focus:outline-none ${
              stageManagerEnabled
                ? 'bg-blue-600/90 text-white'
                : 'bg-white/40 dark:bg-black/30 hover:bg-white/50'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                stageManagerEnabled ? 'bg-white/20 text-white' : 'bg-black/10 dark:bg-white/10 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[12px] font-semibold leading-tight">Stage Manager</div>
              <div
                className={`text-[10px] ${
                  stageManagerEnabled ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {stageManagerEnabled ? 'On' : 'Off'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Sliders Card: Display Brightness & System Sound */}
      <div className="bg-white/40 dark:bg-black/30 p-2.5 rounded-xl border border-white/20 dark:border-white/5 flex flex-col gap-2.5 shadow-sm">
        {/* Display Brightness */}
        <div>
          <div className="flex justify-between items-center text-[11px] mb-1 font-medium text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <SunMedium className="w-3.5 h-3.5 text-amber-500" />
              <span>Display</span>
            </span>
            <span className="font-mono">{Math.round((brightness / 1.15) * 100)}%</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0.5"
              max="1.15"
              step="0.05"
              value={brightness}
              onChange={(e) => updateSetting('brightness', parseFloat(e.target.value))}
              className="w-full h-4 bg-black/10 dark:bg-white/15 rounded-full appearance-none cursor-pointer accent-blue-600"
              aria-label="Display Brightness Slider"
            />
          </div>
        </div>

        {/* Sound Volume */}
        <div>
          <div className="flex justify-between items-center text-[11px] mb-1 font-medium text-slate-700 dark:text-slate-300">
            <button
              onClick={() => updateSetting('volume', volume > 0 ? 0 : 80)}
              className="flex items-center gap-1.5 hover:opacity-75 focus:outline-none"
              title={volume === 0 ? 'Unmute' : 'Mute'}
            >
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-blue-500" />
              )}
              <span>Sound</span>
            </button>
            <span className="font-mono">{volume}%</span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volume}
              onChange={(e) => updateSetting('volume', parseInt(e.target.value, 10))}
              className="w-full h-4 bg-black/10 dark:bg-white/15 rounded-full appearance-none cursor-pointer accent-blue-600"
              aria-label="Sound Volume Slider"
            />
          </div>
        </div>
      </div>

      {/* Now Playing Card */}
      <div className="bg-white/40 dark:bg-black/30 p-2.5 rounded-xl border border-white/20 dark:border-white/5 flex items-center space-x-3 shadow-sm">
        {/* Album Artwork */}
        <div
          onClick={() => {
            openWindow('music');
            setIsControlCenterOpen(false);
          }}
          className="w-11 h-11 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md hover:scale-105 transition"
          title="Open Music App"
        >
          <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
        </div>

        {/* Info & Progress */}
        <div className="flex-1 min-w-0">
          <div
            onClick={() => {
              openWindow('music');
              setIsControlCenterOpen(false);
            }}
            className="cursor-pointer group"
          >
            <div className="text-[12px] font-semibold truncate leading-tight group-hover:text-blue-500 transition">
              Starboy (feat. Daft Punk)
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              The Weeknd — Starboy
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full bg-black/10 dark:bg-white/20 h-1 rounded-full mt-1.5 cursor-pointer relative overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
              setProgress(newProgress);
            }}
            title={`Progress: ${progress}%`}
          >
            <div
              className="bg-slate-800 dark:bg-slate-200 h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={() => setProgress((p) => Math.max(0, p - 15))}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition text-slate-700 dark:text-slate-300"
            title="Previous / Rewind"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 bg-black/10 dark:bg-white/15 hover:bg-black/20 dark:hover:bg-white/25 rounded-full transition text-slate-800 dark:text-slate-100"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            onClick={() => setProgress((p) => Math.min(100, p + 15))}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition text-slate-700 dark:text-slate-300"
            title="Next / Fast Forward"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
