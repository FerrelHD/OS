import { useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { useWindow } from '../context/WindowContext';

export const useShortcuts = () => {
  const {
    isSpotlightOpen,
    setIsSpotlightOpen,
    isControlCenterOpen,
    setIsControlCenterOpen,
    isLaunchpadOpen,
    setIsLaunchpadOpen,
    isAboutMacOpen,
    setIsAboutMacOpen,
    setIsLocked,
  } = useSystem();
  const { activeWindowId, closeWindow, minimizeWindow } = useWindow();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      const isAlt = e.altKey;

      // Close active window: Cmd+W or Ctrl+W
      if (isMeta && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        if (activeWindowId) {
          closeWindow(activeWindowId);
        }
        return;
      }

      // Minimize active window: Cmd+M or Ctrl+M
      if (isMeta && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        if (activeWindowId) {
          minimizeWindow(activeWindowId);
        }
        return;
      }

      // Spotlight: Cmd+K or Cmd+Space
      if ((isMeta && e.key.toLowerCase() === 'k') || (isMeta && e.code === 'Space')) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
        setIsControlCenterOpen(false);
        setIsLaunchpadOpen(false);
        return;
      }

      // Launchpad: F4
      if (e.key === 'F4') {
        e.preventDefault();
        setIsLaunchpadOpen((prev) => !prev);
        setIsSpotlightOpen(false);
        setIsControlCenterOpen(false);
        return;
      }

      // Lock Screen: Cmd+Option+L or Ctrl+Alt+L
      if (isMeta && isAlt && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsLocked(true);
        setIsSpotlightOpen(false);
        setIsControlCenterOpen(false);
        setIsLaunchpadOpen(false);
        return;
      }

      // Escape: Close active overlays
      if (e.key === 'Escape') {
        if (isSpotlightOpen) setIsSpotlightOpen(false);
        if (isControlCenterOpen) setIsControlCenterOpen(false);
        if (isLaunchpadOpen) setIsLaunchpadOpen(false);
        if (isAboutMacOpen) setIsAboutMacOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSpotlightOpen,
    setIsSpotlightOpen,
    isControlCenterOpen,
    setIsControlCenterOpen,
    isLaunchpadOpen,
    setIsLaunchpadOpen,
    isAboutMacOpen,
    setIsAboutMacOpen,
    setIsLocked,
    activeWindowId,
    closeWindow,
    minimizeWindow,
  ]);
};
