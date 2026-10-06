import React, { createContext, useContext, useState, useEffect } from 'react';

const SystemContext = createContext(null);

const DEFAULT_SETTINGS = {
  theme: 'dark',
  wallpaper: 'gold', // gold, blue, purple, green, night
  accentColor: 'blue',
  brightness: 1.0,
  volume: 80,
  dockSize: 58,
  dockMagnification: true,
  minimizeEffect: 'genie', // 'genie' | 'scale'
};

export const WALLPAPERS = {
  gold: {
    name: 'Golden Gate Gold',
    bgClass: 'from-[#0B192C] via-[#1E3E62] to-[#F1C40F]',
    gradient: 'linear-gradient(135deg, #09122C 0%, #154868 45%, #D4A373 100%)',
  },
  blue: {
    name: 'Pacific Blue',
    bgClass: 'from-[#03045E] via-[#0077B6] to-[#90E0EF]',
    gradient: 'linear-gradient(135deg, #021B38 0%, #0077B6 55%, #74C0DC 100%)',
  },
  purple: {
    name: 'Nebula Purple',
    bgClass: 'from-[#190019] via-[#522B5B] to-[#DFB6B2]',
    gradient: 'linear-gradient(135deg, #130026 0%, #4A154B 50%, #C084FC 100%)',
  },
  green: {
    name: 'Muir Woods Green',
    bgClass: 'from-[#081C15] via-[#1B4332] to-[#95D5B2]',
    gradient: 'linear-gradient(135deg, #051A14 0%, #1B4332 50%, #52B788 100%)',
  },
  night: {
    name: 'Midnight Black',
    bgClass: 'from-[#050505] via-[#121212] to-[#242424]',
    gradient: 'linear-gradient(135deg, #050505 0%, #111827 50%, #1F2937 100%)',
  },
};

export const ACCENT_COLORS = {
  blue: '#007AFF',
  purple: '#AF52DE',
  pink: '#FF2D55',
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#34C759',
  graphite: '#8E8E93',
};

export const SystemProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('macos_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isLocked, setIsLocked] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [isAboutMacOpen, setIsAboutMacOpen] = useState(false);
  const [activeApp, setActiveApp] = useState('Finder');

  // Persist settings changes
  useEffect(() => {
    try {
      localStorage.setItem('macos_settings', JSON.stringify(settings));
    } catch {
      // Fallback
    }
    // Update dark class on root document
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTheme = () => {
    updateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <SystemContext.Provider
      value={{
        ...settings,
        updateSetting,
        toggleTheme,
        currentWallpaper: WALLPAPERS[settings.wallpaper] || WALLPAPERS.gold,
        accentHex: ACCENT_COLORS[settings.accentColor] || ACCENT_COLORS.blue,
        isLocked,
        setIsLocked,
        isSpotlightOpen,
        setIsSpotlightOpen,
        isControlCenterOpen,
        setIsControlCenterOpen,
        isLaunchpadOpen,
        setIsLaunchpadOpen,
        isAboutMacOpen,
        setIsAboutMacOpen,
        activeApp,
        setActiveApp,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within SystemProvider');
  return context;
};
