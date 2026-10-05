import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSystem } from '../../context/SystemContext';
import { useWindow } from '../../context/WindowContext';
import { APPS } from '../../constants/appRegistry';
import { Search, X } from 'lucide-react';

export default function Launchpad() {
  const { isLaunchpadOpen, setIsLaunchpadOpen } = useSystem();
  const { openWindow } = useWindow();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isLaunchpadOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLaunchpadOpen]);

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return APPS;
    return APPS.filter(
      (app) => app.name.toLowerCase().includes(q) || app.id.toLowerCase().includes(q)
    );
  }, [query]);

  // Handle keyboard events (Escape, Arrows, Enter)
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsLaunchpadOpen(false);
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredApps.length > 0 ? (prev + 1) % filteredApps.length : 0));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredApps.length > 0 ? (prev - 1 + filteredApps.length) % filteredApps.length : 0
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredApps.length > 0 ? Math.min(filteredApps.length - 1, prev + 5) : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredApps.length > 0 ? Math.max(0, prev - 5) : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredApps[selectedIndex]) {
        openWindow(filteredApps[selectedIndex].id);
        setIsLaunchpadOpen(false);
      }
    }
  };

  if (!isLaunchpadOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 bg-black/45 backdrop-blur-3xl animate-in fade-in zoom-in-105 duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsLaunchpadOpen(false);
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Top Search Filter */}
      <div className="w-full max-w-sm flex items-center justify-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search Apps"
            className="w-full py-1.5 pl-10 pr-9 bg-white/15 hover:bg-white/20 focus:bg-white/25 text-white placeholder-white/50 rounded-lg text-sm border border-white/20 focus:border-white/40 focus:outline-none transition shadow-lg text-center"
            aria-label="Search apps in Launchpad"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/20 text-white/70"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Apps Grid */}
      <div className="w-full max-w-4xl flex-1 flex items-center justify-center py-6">
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-8 sm:gap-12 md:gap-14 justify-items-center">
          {filteredApps.map((app, index) => {
            const Icon = app.icon;
            const isSelected = index === selectedIndex;

            return (
              <button
                key={app.id}
                onClick={() => {
                  openWindow(app.id);
                  setIsLaunchpadOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex flex-col items-center group cursor-pointer focus:outline-none transition-all duration-200 ${
                  isSelected ? 'scale-110 drop-shadow-2xl' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 transition-all ${
                    isSelected
                      ? 'ring-2 ring-white/70 shadow-2xl bg-white/10'
                      : 'drop-shadow-lg'
                  }`}
                >
                  <Icon className="w-full h-full" />
                </div>
                <span
                  className={`mt-2.5 text-xs sm:text-sm font-medium tracking-tight truncate max-w-[90px] text-center drop-shadow ${
                    isSelected ? 'text-white font-semibold' : 'text-white/85 group-hover:text-white'
                  }`}
                >
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pagination / Dots indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
