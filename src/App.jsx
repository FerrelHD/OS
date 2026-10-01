import React from 'react';
import { SystemProvider, useSystem, WALLPAPERS } from './context/SystemContext';
import { FileSystemProvider, useFileSystem } from './context/FileSystemContext';
import { WindowProvider, useWindow } from './context/WindowContext';
import { useShortcuts } from './hooks/useShortcuts';
import { APPS, getAppIcon } from './constants/appRegistry';
import { AppleLogoIcon } from './components/common/icons/AppIcons';

function DesktopContent() {
  useShortcuts();
  const { currentWallpaper, brightness, theme, isSpotlightOpen, setIsSpotlightOpen } = useSystem();
  const { windows, openWindow, closeWindow, focusWindow } = useWindow();
  const { fs } = useFileSystem();

  return (
    <div
      className="relative w-screen h-screen overflow-hidden transition-all duration-300 select-none"
      style={{
        background: currentWallpaper.gradient,
        filter: `brightness(${brightness})`,
      }}
    >
      {/* Top Menubar */}
      <header className="h-[28px] w-full glass-chrome flex items-center justify-between px-3 text-[13px] font-medium z-50 text-slate-800 dark:text-slate-100">
        <div className="flex items-center space-x-4">
          <button className="hover:opacity-70 transition-opacity" title="Apple Menu">
            <AppleLogoIcon className="w-3.5 h-3.5" />
          </button>
          <span className="font-semibold">Finder</span>
          <span className="hidden sm:inline-block opacity-80 hover:opacity-100 cursor-pointer">File</span>
          <span className="hidden sm:inline-block opacity-80 hover:opacity-100 cursor-pointer">Edit</span>
          <span className="hidden sm:inline-block opacity-80 hover:opacity-100 cursor-pointer">View</span>
          <span className="hidden md:inline-block opacity-80 hover:opacity-100 cursor-pointer">Go</span>
          <span className="hidden md:inline-block opacity-80 hover:opacity-100 cursor-pointer">Window</span>
          <span className="hidden md:inline-block opacity-80 hover:opacity-100 cursor-pointer">Help</span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setIsSpotlightOpen(!isSpotlightOpen)}
            className="hover:opacity-75 px-1.5 py-0.5 rounded transition"
            title="Spotlight Search (Cmd+K)"
          >
            🔍
          </button>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      {/* Desktop Workspace */}
      <main className="relative w-full h-[calc(100vh-28px-70px)] p-4">
        {/* Desktop Icons */}
        <div className="grid grid-flow-col grid-rows-6 gap-6 w-max">
          <button
            onDoubleClick={() => openWindow('finder')}
            className="flex flex-col items-center w-20 group focus:outline-none"
          >
            <div className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform drop-shadow-md">
              {React.createElement(getAppIcon('finder'))}
            </div>
            <span className="mt-1 text-xs text-white font-medium text-center drop-shadow-md px-1.5 py-0.5 rounded group-focus:bg-blue-600">
              Macintosh HD
            </span>
          </button>

          <button
            onDoubleClick={() => openWindow('notes')}
            className="flex flex-col items-center w-20 group focus:outline-none"
          >
            <div className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform drop-shadow-md">
              {React.createElement(getAppIcon('notes'))}
            </div>
            <span className="mt-1 text-xs text-white font-medium text-center drop-shadow-md px-1.5 py-0.5 rounded group-focus:bg-blue-600">
              Welcome.txt
            </span>
          </button>
        </div>

        {/* Windows Rendering */}
        {windows.map((win) => {
          if (!win.isOpen || win.isMinimized) return null;
          const AppIcon = getAppIcon(win.icon);
          return (
            <div
              key={win.id}
              onClick={() => focusWindow(win.id)}
              style={{
                left: `${win.position.x}px`,
                top: `${win.position.y}px`,
                width: `${win.size.width}px`,
                height: `${win.size.height}px`,
                zIndex: win.zIndex,
              }}
              className="absolute rounded-window bg-white dark:bg-[#1E1E1E] shadow-window-active border border-black/10 dark:border-white/10 flex flex-col overflow-hidden transition-shadow"
            >
              {/* Window Header */}
              <div className="h-9 px-3 bg-slate-100 dark:bg-[#252525] border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2 traffic-group">
                  <button
                    onClick={() => closeWindow(win.id)}
                    className="traffic-btn bg-traffic-close border border-traffic-close-border"
                    title="Close"
                  >
                    <span className="text-[8px] text-[#540000] font-bold">×</span>
                  </button>
                  <button
                    className="traffic-btn bg-traffic-minimize border border-traffic-minimize-border"
                    title="Minimize"
                  >
                    <span className="text-[8px] text-[#543b00] font-bold">−</span>
                  </button>
                  <button
                    className="traffic-btn bg-traffic-maximize border border-traffic-maximize-border"
                    title="Maximize"
                  >
                    <span className="text-[8px] text-[#003b07] font-bold">+</span>
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5">{React.createElement(AppIcon)}</div>
                  <span>{win.title}</span>
                </div>
                <div className="w-12"></div>
              </div>

              {/* Window Body */}
              <div className="flex-1 p-4 overflow-auto text-sm text-slate-700 dark:text-slate-200">
                <p className="font-semibold mb-2">{win.appName} Application Content</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Virtual File System nodes loaded: {Object.keys(fs).length} items.
                </p>
              </div>
            </div>
          );
        })}
      </main>

      {/* Floating Bottom Dock */}
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[58px] px-3.5 py-1.5 rounded-full glass-chrome shadow-dock flex items-center space-x-2.5 z-50">
        {APPS.map((app) => {
          const Icon = app.icon;
          const isRunning = windows.some((w) => w.id === app.id && w.isOpen);
          return (
            <button
              key={app.id}
              onClick={() => openWindow(app.id)}
              className="relative group flex flex-col items-center justify-center p-1 hover:-translate-y-1.5 transition-transform duration-150 focus:outline-none"
              title={app.name}
            >
              <div className="w-10 h-10 drop-shadow-md">
                <Icon />
              </div>
              {isRunning && (
                <span className="w-1 h-1 rounded-full bg-slate-800 dark:bg-white absolute -bottom-0.5"></span>
              )}
            </button>
          );
        })}
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SystemProvider>
      <FileSystemProvider>
        <WindowProvider>
          <DesktopContent />
        </WindowProvider>
      </FileSystemProvider>
    </SystemProvider>
  );
}
