import React, { useRef, useEffect, useState } from 'react';

export default function DockItem({ app, isRunning, isMinimized, onClick, getScale, mouseX }) {
  const itemRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    setScale(getScale(centerX));
  }, [mouseX, getScale]);

  const IconComponent = app.icon;

  return (
    <div
      ref={itemRef}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative flex flex-col items-center justify-end px-1"
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-10 px-2.5 py-1 rounded-md glass-modal text-[11px] font-medium text-slate-800 dark:text-slate-100 shadow-md border border-white/20 whitespace-nowrap animate-in fade-in duration-150 pointer-events-none">
          {app.name}
        </div>
      )}

      {/* Scaled App Icon Button */}
      <button
        onClick={onClick}
        style={{
          transform: `scale(${scale}) translateY(-${(scale - 1) * 16}px)`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)',
        }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center focus:outline-none drop-shadow-md cursor-pointer select-none"
        title={app.name}
      >
        <div className="w-11 h-11">
          <IconComponent />
        </div>
      </button>

      {/* Running Indicator Dot */}
      <div className="h-1.5 flex items-center justify-center mt-0.5">
        {isRunning && (
          <span
            className={`w-1 h-1 rounded-full transition-all ${
              isMinimized ? 'bg-amber-400 dark:bg-amber-300' : 'bg-slate-800 dark:bg-white'
            }`}
          />
        )}
      </div>
    </div>
  );
}
