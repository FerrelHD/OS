import { useEffect } from 'react';
import { useSystem } from '../context/SystemContext';

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      const isAlt = e.altKey;

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
  ]);
};
