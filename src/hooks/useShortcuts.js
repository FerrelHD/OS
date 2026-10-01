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
  } = useSystem();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;

      // Spotlight: Cmd+K or Cmd+Space
      if ((isMeta && e.key.toLowerCase() === 'k') || (isMeta && e.code === 'Space')) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
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
  ]);
};
