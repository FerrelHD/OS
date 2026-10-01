import React, { memo } from 'react';
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
  } = useWindow();
  const { setActiveApp } = useSystem();

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

  const handleFocus = () => {
    focusWindow(win.id);
    setActiveApp(win.appName);
  };

  const IconComponent = getAppIcon(win.icon);

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <div
      onClick={handleFocus}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: win.zIndex,
        transition: isDragging || isResizing ? 'none' : 'box-shadow 0.2s ease, width 0.15s ease, height 0.15s ease',
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
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
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
