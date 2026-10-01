import React, { useState, useEffect, useRef } from 'react';
import { useSystem } from '../../context/SystemContext';
import { useWindow } from '../../context/WindowContext';
import { AppleLogoIcon } from '../common/icons/AppIcons';
import { Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';

export default function MenuBar() {
  const {
    activeApp,
    setIsSpotlightOpen,
    isSpotlightOpen,
    setIsControlCenterOpen,
    isControlCenterOpen,
    setIsAboutMacOpen,
    setIsLocked,
    toggleTheme,
  } = useSystem();
  const { openWindow } = useWindow();

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [activeMenu, setActiveMenu] = useState(null); // 'apple', 'file', 'edit', 'view', 'window', 'help'
  const menuRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDateStr(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    window.addEventListener('pointerdown', handleClickOutside);
    return () => window.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const handleAppleAction = (action) => {
    setActiveMenu(null);
    if (action === 'about') setIsAboutMacOpen(true);
    if (action === 'settings') openWindow('settings');
    if (action === 'lock') setIsLocked(true);
    if (action === 'restart') window.location.reload();
    if (action === 'theme') toggleTheme();
  };

  return (
    <header
      ref={menuRef}
      className="relative h-[28px] w-full glass-chrome flex items-center justify-between px-3 text-[13px] font-medium z-50 text-slate-800 dark:text-slate-100 border-b border-black/10 dark:border-white/10"
    >
      {/* Left Menu Items */}
      <div className="flex items-center space-x-1">
        {/* Apple Logo Dropdown */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
            className={`px-2 py-0.5 rounded transition ${
              activeMenu === 'apple' ? 'bg-black/15 dark:bg-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Apple Menu"
          >
            <AppleLogoIcon className="w-3.5 h-3.5" />
          </button>

          {activeMenu === 'apple' && (
            <div className="absolute left-0 top-[26px] w-56 rounded-xl glass-modal shadow-2xl py-1.5 text-xs text-slate-800 dark:text-slate-200 z-50 border border-black/10 dark:border-white/10 animate-in fade-in zoom-in-95 duration-100">
              <button
                onClick={() => handleAppleAction('about')}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md mx-auto flex items-center justify-between"
              >
                <span>About This Mac</span>
              </button>
              <div className="h-px bg-black/10 dark:bg-white/10 my-1"></div>
              <button
                onClick={() => handleAppleAction('settings')}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md"
              >
                <span>System Settings...</span>
              </button>
              <button
                onClick={() => handleAppleAction('theme')}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md"
              >
                <span>Toggle Dark / Light Mode</span>
              </button>
              <div className="h-px bg-black/10 dark:bg-white/10 my-1"></div>
              <button
                onClick={() => handleAppleAction('lock')}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md flex items-center justify-between"
              >
                <span>Lock Screen</span>
                <span className="opacity-60 text-[10px]">⌘⌥L</span>
              </button>
              <button
                onClick={() => handleAppleAction('restart')}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md"
              >
                <span>Restart...</span>
              </button>
            </div>
          )}
        </div>

        {/* Dynamic App Title */}
        <span className="font-bold px-2 py-0.5">{activeApp}</span>

        {/* Contextual Menus */}
        {['File', 'Edit', 'View', 'Window', 'Help'].map((item) => (
          <div key={item} className="relative hidden sm:block">
            <button
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
              className={`px-2 py-0.5 rounded transition ${
                activeMenu === item ? 'bg-black/15 dark:bg-white/20' : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              {item}
            </button>
            {activeMenu === item && (
              <div className="absolute left-0 top-[26px] w-48 rounded-xl glass-modal shadow-2xl py-1.5 text-xs text-slate-800 dark:text-slate-200 z-50 border border-black/10 dark:border-white/10">
                <div className="px-3.5 py-1 text-slate-500 dark:text-slate-400 font-semibold text-[11px]">
                  {activeApp} {item}
                </div>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  New {item === 'File' ? 'Window' : 'Action'}
                </button>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white rounded-md"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Status Bar */}
      <div className="flex items-center space-x-2 text-xs">
        <button
          onClick={() => {}}
          className="hover:opacity-75 p-1 rounded transition"
          title="Wi-Fi: Connected to GoldenGate_5G"
        >
          <Wifi className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center space-x-1" title="Battery: 98% (Power Adapter Connected)">
          <span className="text-[11px]">98%</span>
          <Battery className="w-4 h-4" />
        </div>

        <button
          onClick={() => {
            setIsSpotlightOpen(!isSpotlightOpen);
            setIsControlCenterOpen(false);
          }}
          className="hover:opacity-75 p-1 rounded transition"
          title="Spotlight Search (Cmd+K / Cmd+Space)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => {
            setIsControlCenterOpen(!isControlCenterOpen);
            setIsSpotlightOpen(false);
          }}
          className="hover:opacity-75 p-1 rounded transition"
          title="Control Center"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center space-x-1 pl-1 cursor-default font-mono text-[12px]">
          <span>{dateStr}</span>
          <span className="font-semibold">{timeStr}</span>
        </div>
      </div>
    </header>
  );
}
