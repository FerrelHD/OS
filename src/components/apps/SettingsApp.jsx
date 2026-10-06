import React, { useState } from 'react';
import { useSystem, WALLPAPERS, ACCENT_COLORS } from '../../context/SystemContext';
import {
  Palette,
  Image,
  Sliders,
  Sun,
  Volume2,
  Info,
  Check,
  Moon,
  Laptop,
} from 'lucide-react';

const SETTINGS_SECTIONS = [
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'wallpaper', name: 'Wallpaper', icon: Image },
  { id: 'dock', name: 'Dock & Menu Bar', icon: Sliders },
  { id: 'displays', name: 'Displays', icon: Sun },
  { id: 'sound', name: 'Sound', icon: Volume2 },
  { id: 'about', name: 'About', icon: Info },
];

export default function SettingsApp() {
  const {
    theme,
    wallpaper,
    accentColor,
    brightness,
    volume,
    dockSize,
    dockMagnification,
    minimizeEffect = 'genie',
    updateSetting,
  } = useSystem();

  const [activeSection, setActiveSection] = useState('appearance');

  return (
    <div className="flex-1 flex h-full bg-white dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-slate-50/90 dark:bg-white/[0.03] border-r border-black/10 dark:border-white/10 p-3 flex flex-col flex-shrink-0 text-xs">
        <div className="px-2 py-1 font-semibold text-slate-500 dark:text-slate-400 mb-2">
          System Settings
        </div>
        <div className="space-y-1">
          {SETTINGS_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Settings Panel */}
      <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {activeSection === 'appearance' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="text-base font-bold mb-1">Appearance</h2>
              <p className="text-xs text-slate-500 mb-4">
                Select your preferred appearance and accent colors.
              </p>

              {/* Light / Dark Mode selector */}
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <button
                  onClick={() => updateSetting('theme', 'light')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-black/10 dark:border-white/10 hover:bg-black/5'
                  }`}
                >
                  <div className="w-16 h-10 rounded-lg bg-slate-100 border border-slate-300 shadow-inner flex items-center justify-center text-amber-500">
                    <Sun className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold">Light</span>
                </button>

                <button
                  onClick={() => updateSetting('theme', 'dark')}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-black/10 dark:border-white/10 hover:bg-black/5'
                  }`}
                >
                  <div className="w-16 h-10 rounded-lg bg-slate-900 border border-slate-700 shadow-inner flex items-center justify-center text-blue-400">
                    <Moon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold">Dark</span>
                </button>
              </div>
            </div>

            {/* Accent Color Picker */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <h3 className="text-xs font-bold mb-3">Accent Color</h3>
              <div className="flex items-center space-x-3">
                {Object.entries(ACCENT_COLORS).map(([colorKey, hex]) => {
                  const isSelected = accentColor === colorKey;
                  return (
                    <button
                      key={colorKey}
                      onClick={() => updateSetting('accentColor', colorKey)}
                      style={{ backgroundColor: hex }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-all shadow-sm ${
                        isSelected ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-105'
                      }`}
                      title={colorKey}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'wallpaper' && (
          <div className="max-w-2xl">
            <h2 className="text-base font-bold mb-1">Wallpaper</h2>
            <p className="text-xs text-slate-500 mb-4">
              Choose from dynamic Liquid Glass desktop ribbons.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(WALLPAPERS).map(([key, wp]) => {
                const isSelected = wallpaper === key;
                return (
                  <button
                    key={key}
                    onClick={() => updateSetting('wallpaper', key)}
                    className={`rounded-xl overflow-hidden border p-1 text-left transition flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                        : 'border-black/10 dark:border-white/10 hover:border-black/20'
                    }`}
                  >
                    <div
                      className="w-full h-24 rounded-lg shadow-inner"
                      style={{ background: wp.gradient }}
                    />
                    <div className="px-1 py-0.5 flex items-center justify-between">
                      <span className="text-xs font-medium truncate">{wp.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'dock' && (
          <div className="max-w-md space-y-6">
            <div>
              <h2 className="text-base font-bold mb-1">Dock & Menu Bar</h2>
              <p className="text-xs text-slate-500 mb-4">Configure Dock magnification and styling.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span>Magnification Effect</span>
                <input
                  type="checkbox"
                  checked={dockMagnification}
                  onChange={(e) => updateSetting('dockMagnification', e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Dock Size</span>
                  <span className="font-mono text-slate-400">{dockSize}px</span>
                </div>
                <input
                  type="range"
                  min="48"
                  max="76"
                  value={dockSize}
                  onChange={(e) => updateSetting('dockSize', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-black/10 dark:bg-white/20 rounded-full appearance-none accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-black/10 dark:border-white/10">
                <div className="flex justify-between mb-1.5">
                  <span className="font-medium">Minimize windows using</span>
                  <span className="font-mono text-slate-400 capitalize">{minimizeEffect} Effect</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => updateSetting('minimizeEffect', 'genie')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition flex flex-col items-center gap-1 ${
                      minimizeEffect === 'genie'
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-900/25 text-blue-600 dark:text-blue-400 font-semibold ring-2 ring-blue-500/20'
                        : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>Genie Effect</span>
                    <span className="text-[10px] text-slate-400 font-normal">Classic vacuum suction</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSetting('minimizeEffect', 'scale')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition flex flex-col items-center gap-1 ${
                      minimizeEffect === 'scale'
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-900/25 text-blue-600 dark:text-blue-400 font-semibold ring-2 ring-blue-500/20'
                        : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>Scale Effect</span>
                    <span className="text-[10px] text-slate-400 font-normal">Minimal dock scale</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'displays' && (
          <div className="max-w-md space-y-4">
            <h2 className="text-base font-bold mb-1">Displays</h2>
            <p className="text-xs text-slate-500">Liquid Retina XDR Display Settings.</p>

            <div className="pt-2 text-xs">
              <div className="flex justify-between mb-1">
                <span>Brightness</span>
                <span className="font-mono text-slate-400">
                  {Math.round((brightness / 1.15) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.15"
                step="0.05"
                value={brightness}
                onChange={(e) => updateSetting('brightness', parseFloat(e.target.value))}
                className="w-full h-2 bg-black/10 dark:bg-white/20 rounded-full appearance-none accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeSection === 'sound' && (
          <div className="max-w-md space-y-4">
            <h2 className="text-base font-bold mb-1">Sound</h2>
            <p className="text-xs text-slate-500">Output volume and audio master channels.</p>

            <div className="pt-2 text-xs">
              <div className="flex justify-between mb-1">
                <span>Output Volume</span>
                <span className="font-mono text-slate-400">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => updateSetting('volume', parseInt(e.target.value, 10))}
                className="w-full h-2 bg-black/10 dark:bg-white/20 rounded-full appearance-none accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-md space-y-4">
            <h2 className="text-base font-bold mb-1">About</h2>
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Operating System:</span>
                <span className="font-semibold">macOS Golden Gate 15.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hardware:</span>
                <span className="font-semibold">MacBook Pro 16" (M3 Max)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unified Memory:</span>
                <span className="font-semibold">36 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Built With:</span>
                <span className="font-semibold">React 18, Vite, Tailwind CSS</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
