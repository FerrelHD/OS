import React from 'react';

const HANDLES = [
  { dir: 'n', cursor: 'ns-resize', className: 'top-0 left-2 right-2 h-1.5' },
  { dir: 's', cursor: 'ns-resize', className: 'bottom-0 left-2 right-2 h-1.5' },
  { dir: 'e', cursor: 'ew-resize', className: 'top-2 bottom-2 right-0 w-1.5' },
  { dir: 'w', cursor: 'ew-resize', className: 'top-2 bottom-2 left-0 w-1.5' },
  { dir: 'nw', cursor: 'nwse-resize', className: 'top-0 left-0 w-3 h-3' },
  { dir: 'ne', cursor: 'nesw-resize', className: 'top-0 right-0 w-3 h-3' },
  { dir: 'se', cursor: 'nwse-resize', className: 'bottom-0 right-0 w-3 h-3' },
  { dir: 'sw', cursor: 'nesw-resize', className: 'bottom-0 left-0 w-3 h-3' },
];

export default function ResizeHandles({ onStartResize, disabled }) {
  if (disabled) return null;

  return (
    <>
      {HANDLES.map(({ dir, cursor, className }) => (
        <div
          key={dir}
          onPointerDown={(e) => onStartResize(dir, e)}
          style={{ cursor }}
          className={`absolute z-30 select-none ${className}`}
        />
      ))}
    </>
  );
}
