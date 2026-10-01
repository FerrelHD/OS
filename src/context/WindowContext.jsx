import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const WindowContext = createContext(null);

const DEFAULT_WINDOW_CONFIGS = {
  finder: {
    id: 'finder',
    appName: 'Finder',
    title: 'Finder',
    icon: 'finder',
    defaultSize: { width: 840, height: 500 },
    minSize: { width: 480, height: 320 },
  },
  safari: {
    id: 'safari',
    appName: 'Safari',
    title: 'Safari',
    icon: 'safari',
    defaultSize: { width: 920, height: 580 },
    minSize: { width: 500, height: 360 },
  },
  gemini: {
    id: 'gemini',
    appName: 'Gemini',
    title: 'Gemini Desktop',
    icon: 'gemini',
    defaultSize: { width: 880, height: 600 },
    minSize: { width: 520, height: 400 },
  },
  music: {
    id: 'music',
    appName: 'Music',
    title: 'Music',
    icon: 'music',
    defaultSize: { width: 820, height: 520 },
    minSize: { width: 500, height: 340 },
  },
  photos: {
    id: 'photos',
    appName: 'Photos',
    title: 'Photos',
    icon: 'photos',
    defaultSize: { width: 860, height: 540 },
    minSize: { width: 480, height: 340 },
  },
  messages: {
    id: 'messages',
    appName: 'Messages',
    title: 'Messages',
    icon: 'messages',
    defaultSize: { width: 780, height: 520 },
    minSize: { width: 480, height: 360 },
  },
  notes: {
    id: 'notes',
    appName: 'Notes',
    title: 'Notes',
    icon: 'notes',
    defaultSize: { width: 760, height: 480 },
    minSize: { width: 460, height: 300 },
  },
  terminal: {
    id: 'terminal',
    appName: 'Terminal',
    title: 'Terminal — zsh',
    icon: 'terminal',
    defaultSize: { width: 680, height: 440 },
    minSize: { width: 400, height: 260 },
  },
  calculator: {
    id: 'calculator',
    appName: 'Calculator',
    title: 'Calculator',
    icon: 'calculator',
    defaultSize: { width: 300, height: 440 },
    minSize: { width: 280, height: 420 },
  },
  settings: {
    id: 'settings',
    appName: 'Settings',
    title: 'System Settings',
    icon: 'settings',
    defaultSize: { width: 760, height: 520 },
    minSize: { width: 500, height: 360 },
  },
};

export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const zIndexCounter = useRef(10);

  // Focus a window and bring to front
  const focusWindow = useCallback((id) => {
    zIndexCounter.current += 1;
    const nextZ = zIndexCounter.current;
    setActiveWindowId(id);
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win))
    );
  }, []);

  // Open app or focus if already open
  const openWindow = useCallback(
    (appId, customProps = {}) => {
      const config = DEFAULT_WINDOW_CONFIGS[appId] || {
        id: appId,
        appName: appId,
        title: appId,
        icon: appId,
        defaultSize: { width: 640, height: 440 },
        minSize: { width: 320, height: 220 },
      };

      setWindows((prev) => {
        const existing = prev.find((w) => w.id === appId);
        if (existing) {
          zIndexCounter.current += 1;
          const nextZ = zIndexCounter.current;
          setActiveWindowId(appId);
          return prev.map((w) =>
            w.id === appId
              ? {
                  ...w,
                  isOpen: true,
                  isMinimized: false,
                  zIndex: nextZ,
                  customProps: { ...w.customProps, ...customProps },
                }
              : w
          );
        }

        // Calculate center cascade position
        const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
        const cascadeOffset = (prev.length % 6) * 28;
        const posX = Math.max(40, Math.min(screenW - config.defaultSize.width - 40, (screenW - config.defaultSize.width) / 2 + cascadeOffset));
        const posY = Math.max(40, Math.min(screenH - config.defaultSize.height - 80, (screenH - config.defaultSize.height) / 2 - 30 + cascadeOffset));

        zIndexCounter.current += 1;
        const newWindow = {
          ...config,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: { x: posX, y: posY },
          size: config.defaultSize,
          prevRect: null,
          zIndex: zIndexCounter.current,
          customProps,
        };

        setActiveWindowId(appId);
        return [...prev, newWindow];
      });
    },
    []
  );

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((win) => win.id !== id));
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
    );
    setActiveWindowId((prevActive) => (prevActive === id ? null : prevActive));
  }, []);

  const maximizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id !== id) return win;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const topMenubarH = 28;
        const bottomDockPadding = 70;

        if (win.isMaximized) {
          // Restore
          return {
            ...win,
            isMaximized: false,
            position: win.prevRect ? win.prevRect.position : win.position,
            size: win.prevRect ? win.prevRect.size : win.size,
            prevRect: null,
          };
        } else {
          // Maximize
          return {
            ...win,
            isMaximized: true,
            prevRect: { position: win.position, size: win.size },
            position: { x: 0, y: topMenubarH },
            size: { width: screenW, height: screenH - topMenubarH - bottomDockPadding },
          };
        }
      })
    );
  }, []);

  const updatePosition = useCallback((id, newPos) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, position: newPos } : win))
    );
  }, []);

  const updateSize = useCallback((id, newSize, newPos) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? {
              ...win,
              size: newSize,
              ...(newPos ? { position: newPos } : {}),
            }
          : win
      )
    );
  }, []);

  const snapWindow = useCallback((id, direction) => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const topBar = 28;
    const bottomDock = 70;
    const availableH = screenH - topBar - bottomDock;

    setWindows((prev) =>
      prev.map((win) => {
        if (win.id !== id) return win;
        let newPos = win.position;
        let newSize = win.size;

        if (direction === 'left') {
          newPos = { x: 0, y: topBar };
          newSize = { width: Math.floor(screenW / 2), height: availableH };
        } else if (direction === 'right') {
          newPos = { x: Math.floor(screenW / 2), y: topBar };
          newSize = { width: Math.floor(screenW / 2), height: availableH };
        } else if (direction === 'full') {
          newPos = { x: 0, y: topBar };
          newSize = { width: screenW, height: availableH };
        }

        return {
          ...win,
          position: newPos,
          size: newSize,
          isMaximized: direction === 'full',
          isMinimized: false,
        };
      })
    );
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        focusWindow,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        updatePosition,
        updateSize,
        snapWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (!context) throw new Error('useWindow must be used within WindowProvider');
  return context;
};
