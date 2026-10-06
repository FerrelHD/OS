import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import { useWindow } from '../../context/WindowContext';
import { useSystem } from '../../context/SystemContext';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import TrafficLights from './TrafficLights';
import ResizeHandles from './ResizeHandles';
import { getAppIcon } from '../../constants/appRegistry';

const WindowFrame = memo(function WindowFrame({ window: win, children }) {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition,
    updateSize,
    focusTopWindow,
  } = useWindow();
  const { setActiveApp, minimizeEffect = 'genie' } = useSystem();

  const frameRef = useRef(null);
  const animatingRef = useRef(false);
  const prevMinimizedRef = useRef(win.isMinimized);

  const [displayState, setDisplayState] = useState(win.isMinimized ? 'hidden' : 'visible');
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const isActive = activeWindowId === win.id;

  const { position, isDragging, dragProps } = useDraggable({
    initialPosition: win.position,
    isMaximized: win.isMaximized,
    minTop: 28,
    onDragEnd: (newPos) => updatePosition(win.id, newPos),
  });

  const { size, isResizing, startResize } = useResizable({
    initialSize: win.size,
    initialPosition: position,
    minSize: win.minSize,
    isMaximized: win.isMaximized,
    onResizeEnd: (newSize, newPos) => updateSize(win.id, newSize, newPos),
  });

  const handleFocus = useCallback(() => {
    if (isMinimizing || isRestoring || isClosing) return;
    focusWindow(win.id);
    setActiveApp(win.appName);
  }, [focusWindow, setActiveApp, win.id, win.appName, isMinimizing, isRestoring, isClosing]);

  const IconComponent = getAppIcon(win.icon);

  // Helper to locate dock icon coordinates
  const getDockTarget = useCallback(() => {
    const dockEl = document.getElementById(`dock-item-${win.id}`);
    if (dockEl) {
      const rect = dockEl.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        element: dockEl,
      };
    }
    return {
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
      y: typeof window !== 'undefined' ? window.innerHeight - 30 : 700,
      element: null,
    };
  }, [win.id]);

  // Run Genie or Scale Minimize Animation
  const runMinimizeAnimation = useCallback(() => {
    if (!frameRef.current || animatingRef.current) return;
    animatingRef.current = true;
    setIsMinimizing(true);
    if (focusTopWindow) focusTopWindow(win.id);

    const dockTarget = getDockTarget();
    const winX = position.x;
    const winY = position.y;
    const winW = size.width;
    const winH = size.height;

    let originXPercent = ((dockTarget.x - winX) / winW) * 100;
    originXPercent = Math.max(8, Math.min(92, originXPercent));

    const anchorX = winX + (originXPercent / 100) * winW;
    const anchorY = winY + winH;
    const deltaX = dockTarget.x - anchorX;
    const deltaY = dockTarget.y - anchorY;

    frameRef.current.style.transformOrigin = `${originXPercent}% 100%`;

    let keyframes;
    if (minimizeEffect === 'scale') {
      keyframes = [
        {
          transform: `translate3d(${winX}px, ${winY}px, 0) scale(1)`,
          opacity: 1,
        },
        {
          transform: `translate3d(${winX + deltaX}px, ${winY + deltaY}px, 0) scale(0.04)`,
          opacity: 0,
        },
      ];
    } else {
      // Authentic Genie effect suction funnel
      const p1Left = Math.max(0, originXPercent - 18);
      const p1Right = Math.min(100, originXPercent + 18);
      const p2Left = Math.max(0, originXPercent - 7);
      const p2Right = Math.min(100, originXPercent + 7);

      keyframes = [
        {
          transform: `translate3d(${winX}px, ${winY}px, 0) scale(1, 1)`,
          clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
          opacity: 1,
          filter: 'brightness(1)',
        },
        {
          transform: `translate3d(${winX + deltaX * 0.22}px, ${winY + deltaY * 0.2}px, 0) scale(0.88, 0.82)`,
          clipPath: `polygon(0% 0%, 100% 0%, ${p1Right}% 100%, ${p1Left}% 100%)`,
          opacity: 0.98,
          filter: 'brightness(1.05)',
          offset: 0.32,
        },
        {
          transform: `translate3d(${winX + deltaX * 0.68}px, ${winY + deltaY * 0.68}px, 0) scale(0.48, 0.4)`,
          clipPath: `polygon(14% 0%, 86% 0%, ${p2Right}% 100%, ${p2Left}% 100%)`,
          opacity: 0.88,
          filter: 'brightness(1.12)',
          offset: 0.68,
        },
        {
          transform: `translate3d(${winX + deltaX}px, ${winY + deltaY}px, 0) scale(0.04, 0.04)`,
          clipPath: `polygon(${originXPercent}% 100%, ${originXPercent}% 100%, ${originXPercent}% 100%, ${originXPercent}% 100%)`,
          opacity: 0,
          filter: 'brightness(1.2)',
        },
      ];
    }

    const anim = frameRef.current.animate(keyframes, {
      duration: minimizeEffect === 'scale' ? 320 : 390,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards',
    });

    if (dockTarget.element) {
      dockTarget.element.classList.remove('dock-item-bounce');
      void dockTarget.element.offsetWidth;
      dockTarget.element.classList.add('dock-item-bounce');
    }

    anim.onfinish = () => {
      animatingRef.current = false;
      setIsMinimizing(false);
      setDisplayState('hidden');
      minimizeWindow(win.id);
    };
  }, [position.x, position.y, size.width, size.height, minimizeEffect, focusTopWindow, win.id, getDockTarget, minimizeWindow]);

  // Run Genie or Scale Restore Animation
  const runRestoreAnimation = useCallback(() => {
    if (!frameRef.current) return;
    animatingRef.current = true;
    setIsRestoring(true);
    setDisplayState('visible');

    const dockTarget = getDockTarget();
    const winX = position.x;
    const winY = position.y;
    const winW = size.width;
    const winH = size.height;

    let originXPercent = ((dockTarget.x - winX) / winW) * 100;
    originXPercent = Math.max(8, Math.min(92, originXPercent));

    const anchorX = winX + (originXPercent / 100) * winW;
    const anchorY = winY + winH;
    const deltaX = dockTarget.x - anchorX;
    const deltaY = dockTarget.y - anchorY;

    frameRef.current.style.transformOrigin = `${originXPercent}% 100%`;

    let keyframes;
    if (minimizeEffect === 'scale') {
      keyframes = [
        {
          transform: `translate3d(${winX + deltaX}px, ${winY + deltaY}px, 0) scale(0.04)`,
          opacity: 0,
        },
        {
          transform: `translate3d(${winX}px, ${winY}px, 0) scale(1)`,
          opacity: 1,
        },
      ];
    } else {
      const p1Left = Math.max(0, originXPercent - 18);
      const p1Right = Math.min(100, originXPercent + 18);
      const p2Left = Math.max(0, originXPercent - 7);
      const p2Right = Math.min(100, originXPercent + 7);

      keyframes = [
        {
          transform: `translate3d(${winX + deltaX}px, ${winY + deltaY}px, 0) scale(0.04, 0.04)`,
          clipPath: `polygon(${originXPercent}% 100%, ${originXPercent}% 100%, ${originXPercent}% 100%, ${originXPercent}% 100%)`,
          opacity: 0,
          filter: 'brightness(1.2)',
        },
        {
          transform: `translate3d(${winX + deltaX * 0.68}px, ${winY + deltaY * 0.68}px, 0) scale(0.48, 0.4)`,
          clipPath: `polygon(14% 0%, 86% 0%, ${p2Right}% 100%, ${p2Left}% 100%)`,
          opacity: 0.88,
          filter: 'brightness(1.12)',
          offset: 0.32,
        },
        {
          transform: `translate3d(${winX + deltaX * 0.22}px, ${winY + deltaY * 0.2}px, 0) scale(0.88, 0.82)`,
          clipPath: `polygon(0% 0%, 100% 0%, ${p1Right}% 100%, ${p1Left}% 100%)`,
          opacity: 0.98,
          filter: 'brightness(1.05)',
          offset: 0.68,
        },
        {
          transform: `translate3d(${winX}px, ${winY}px, 0) scale(1, 1)`,
          clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
          opacity: 1,
          filter: 'brightness(1)',
        },
      ];
    }

    const anim = frameRef.current.animate(keyframes, {
      duration: minimizeEffect === 'scale' ? 300 : 360,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    });

    anim.onfinish = () => {
      animatingRef.current = false;
      setIsRestoring(false);
      if (frameRef.current) {
        frameRef.current.style.transformOrigin = '';
        frameRef.current.style.clipPath = '';
      }
    };
  }, [position.x, position.y, size.width, size.height, minimizeEffect, getDockTarget]);

  // Handle external minimization changes (e.g. shortcut Cmd+M or dock click)
  useEffect(() => {
    if (prevMinimizedRef.current && !win.isMinimized) {
      runRestoreAnimation();
    } else if (!prevMinimizedRef.current && win.isMinimized && !animatingRef.current) {
      runMinimizeAnimation();
    }
    prevMinimizedRef.current = win.isMinimized;
  }, [win.isMinimized, runRestoreAnimation, runMinimizeAnimation]);

  // Window entrance animation on mount
  useEffect(() => {
    if (frameRef.current && !win.isMinimized) {
      frameRef.current.style.transformOrigin = 'center center';
      frameRef.current.animate(
        [
          {
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(0.94)`,
            opacity: 0,
          },
          {
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(1)`,
            opacity: 1,
          },
        ],
        {
          duration: 180,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      );
    }
  }, []);

  // Smooth close animation
  const handleClose = useCallback(() => {
    if (isClosing || animatingRef.current) return;
    setIsClosing(true);
    animatingRef.current = true;
    if (focusTopWindow) focusTopWindow(win.id);

    if (frameRef.current) {
      frameRef.current.style.transformOrigin = 'center center';
      const anim = frameRef.current.animate(
        [
          {
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(1)`,
            opacity: 1,
          },
          {
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(0.92)`,
            opacity: 0,
          },
        ],
        {
          duration: 160,
          easing: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
          fill: 'forwards',
        }
      );
      anim.onfinish = () => {
        closeWindow(win.id);
      };
    } else {
      closeWindow(win.id);
    }
  }, [isClosing, position.x, position.y, focusTopWindow, win.id, closeWindow]);

  if (!win.isOpen) return null;

  return (
    <div
      ref={frameRef}
      onClick={handleFocus}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: win.zIndex,
        display: displayState === 'hidden' && win.isMinimized ? 'none' : 'flex',
        pointerEvents: isMinimizing || isRestoring || isClosing ? 'none' : 'auto',
        transition:
          isDragging || isResizing || isMinimizing || isRestoring || isClosing
            ? 'none'
            : 'box-shadow 0.2s ease, width 0.15s ease, height 0.15s ease',
      }}
      className={`absolute top-0 left-0 rounded-window flex flex-col overflow-hidden border ${
        isActive
          ? 'shadow-window-active border-black/15 dark:border-white/20'
          : 'shadow-window-inactive border-black/5 dark:border-white/10 opacity-95'
      } bg-white dark:bg-[#1C1C1E]`}
    >
      {/* 8-Way Resize Handles */}
      <ResizeHandles onStartResize={startResize} disabled={win.isMaximized} />

      {/* Window Titlebar (Draggable Area) */}
      <div
        {...dragProps}
        onDoubleClick={() => maximizeWindow(win.id)}
        className={`h-10 px-3.5 flex items-center justify-between select-none cursor-default border-b ${
          isActive
            ? 'bg-slate-100/90 dark:bg-[#2A2A2C] border-black/10 dark:border-white/10'
            : 'bg-slate-50/80 dark:bg-[#222224] border-black/5 dark:border-white/5'
        }`}
      >
        {/* Left: Traffic Lights */}
        <div className="w-16 flex items-center">
          <TrafficLights
            onClose={handleClose}
            onMinimize={runMinimizeAnimation}
            onMaximize={() => maximizeWindow(win.id)}
            isMaximized={win.isMaximized}
          />
        </div>

        {/* Center: Title & Icon */}
        <div className="flex-1 flex items-center justify-center space-x-2 text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
          <div className="w-4 h-4 flex-shrink-0">
            <IconComponent />
          </div>
          <span className="truncate">{win.title}</span>
        </div>

        {/* Right: Spacer for balance */}
        <div className="w-16"></div>
      </div>

      {/* Window Body Client Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-50 dark:bg-[#1E1E1E]">
        {children}
      </div>
    </div>
  );
});

export default WindowFrame;
