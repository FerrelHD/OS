import React from 'react';

export default function TrafficLights({ onClose, onMinimize, onMaximize, isMaximized }) {
  return (
    <div className="flex items-center space-x-2 traffic-group">
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="traffic-btn bg-traffic-close border border-traffic-close-border shadow-sm active:brightness-75"
        title="Close (Cmd+W)"
      >
        <svg className="w-2 h-2 text-[#4c0000]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="2" y1="2" x2="8" y2="8" />
          <line x1="8" y1="2" x2="2" y2="8" />
        </svg>
      </button>

      {/* Minimize */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        className="traffic-btn bg-traffic-minimize border border-traffic-minimize-border shadow-sm active:brightness-75"
        title="Minimize (Cmd+M)"
      >
        <svg className="w-2 h-2 text-[#4c3500]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="2" y1="5" x2="8" y2="5" />
        </svg>
      </button>

      {/* Maximize */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        className="traffic-btn bg-traffic-maximize border border-traffic-maximize-border shadow-sm active:brightness-75"
        title={isMaximized ? "Restore Window" : "Maximize Window"}
      >
        <svg className="w-2 h-2 text-[#004c08]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          {isMaximized ? (
            <polyline points="2,8 8,2" strokeLinecap="round" />
          ) : (
            <>
              <polyline points="2,5 8,2" />
              <polyline points="8,5 2,8" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
