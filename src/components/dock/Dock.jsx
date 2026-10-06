import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { useWindow } from '../../context/WindowContext';
import { useDockMagnification } from '../../hooks/useDockMagnification';
import { APPS } from '../../constants/appRegistry';
import { LaunchpadIcon } from '../common/icons/AppIcons';
import DockItem from './DockItem';

export default function Dock() {
  const { dockMagnification, isLaunchpadOpen, setIsLaunchpadOpen } = useSystem();
  const { windows, openWindow, focusWindow } = useWindow();
  const { onMouseMove, onMouseLeave, getScale, mouseX } = useDockMagnification({
    enabled: dockMagnification,
    maxScale: 1.35,
    distanceThreshold: 110,
  });

  const handleDockClick = (appId) => {
    // Trigger macOS dock bounce animation on click
    const itemEl = document.getElementById(`dock-item-${appId}`);
    if (itemEl) {
      itemEl.classList.remove('dock-item-bounce');
      void itemEl.offsetWidth; // force reflow
      itemEl.classList.add('dock-item-bounce');
    }

    const existing = windows.find((w) => w.id === appId);
    if (existing && existing.isOpen) {
      focusWindow(appId);
    } else {
      openWindow(appId);
    }
  };

  const launchpadApp = { id: 'launchpad', name: 'Launchpad', icon: LaunchpadIcon };

  return (
    <footer className="absolute bottom-2 left-0 right-0 flex justify-center z-40 pointer-events-none">
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="pointer-events-auto h-[62px] px-3.5 pb-1 pt-1.5 rounded-full glass-chrome shadow-dock flex items-end space-x-1.5 border border-white/30 dark:border-white/10"
      >
        {/* Finder App */}
        {APPS.slice(0, 1).map((app) => {
          const windowState = windows.find((w) => w.id === app.id);
          return (
            <DockItem
              key={app.id}
              app={app}
              isRunning={Boolean(windowState && windowState.isOpen)}
              isMinimized={Boolean(windowState && windowState.isMinimized)}
              onClick={() => handleDockClick(app.id)}
              getScale={getScale}
              mouseX={mouseX}
            />
          );
        })}

        {/* Launchpad Utility Item */}
        <DockItem
          app={launchpadApp}
          isRunning={isLaunchpadOpen}
          isMinimized={false}
          onClick={() => setIsLaunchpadOpen(!isLaunchpadOpen)}
          getScale={getScale}
          mouseX={mouseX}
        />

        {/* Remaining Apps */}
        {APPS.slice(1).map((app) => {
          const windowState = windows.find((w) => w.id === app.id);
          const isRunning = Boolean(windowState && windowState.isOpen);
          const isMinimized = Boolean(windowState && windowState.isMinimized);

          return (
            <DockItem
              key={app.id}
              app={app}
              isRunning={isRunning}
              isMinimized={isMinimized}
              onClick={() => handleDockClick(app.id)}
              getScale={getScale}
              mouseX={mouseX}
            />
          );
        })}
      </div>
    </footer>
  );
}
