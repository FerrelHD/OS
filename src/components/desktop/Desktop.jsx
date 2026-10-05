import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { useWindow } from '../../context/WindowContext';
import MenuBar from '../menubar/MenuBar';
import DesktopIcons from './DesktopIcons';
import DesktopWidgets from './DesktopWidgets';
import Dock from '../dock/Dock';
import WindowFrame from '../window/WindowFrame';
import AppDispatcher from '../apps/AppDispatcher';
import Spotlight from '../overlays/Spotlight';
import ControlCenter from '../overlays/ControlCenter';
import Launchpad from '../overlays/Launchpad';
import AboutThisMac from '../overlays/AboutThisMac';
import LockScreen from '../overlays/LockScreen';

export default function Desktop() {
  const { currentWallpaper, brightness } = useSystem();
  const { windows } = useWindow();

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none transition-all duration-300"
      style={{
        background: currentWallpaper.gradient,
        filter: `brightness(${brightness})`,
      }}
    >
      {/* Top Fixed Menubar (h-28px) */}
      <MenuBar />

      {/* Main Desktop Viewport Canvas */}
      <div className="relative w-full h-[calc(100vh-28px)] overflow-hidden">
        {/* Desktop Widgets (Cupertino Weather & Calendar) */}
        <DesktopWidgets />

        {/* Desktop Icons (VFS Shortcuts) */}
        <DesktopIcons />

        {/* Window Manager Layer */}
        {windows.map((win) => {
          return (
            <WindowFrame key={win.id} window={win}>
              <AppDispatcher appId={win.id} windowProps={win.customProps} />
            </WindowFrame>
          );
        })}
      </div>

      {/* Bottom Floating Dock (h-58px) */}
      <Dock />

      {/* System Overlays (Fase 3) */}
      <Spotlight />
      <ControlCenter />
      <Launchpad />
      <AboutThisMac />
      <LockScreen />
    </div>
  );
}
