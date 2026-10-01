import { useState, useRef, useEffect, useCallback } from 'react';

export const useDraggable = ({ initialPosition, onDragEnd, isMaximized, minTop = 28 }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    origX: initialPosition.x,
    origY: initialPosition.y,
  });

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const onPointerDown = useCallback(
    (e) => {
      if (isMaximized) return;
      // Only drag on primary mouse button or touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: position.x,
        origY: position.y,
      };

      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [isMaximized, position]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      const newX = dragRef.current.origX + dx;
      const newY = Math.max(minTop, dragRef.current.origY + dy);

      setPosition({ x: newX, y: newY });
    },
    [isDragging, minTop]
  );

  const onPointerUp = useCallback(
    (e) => {
      if (!isDragging) return;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe release
      }
      if (onDragEnd) {
        onDragEnd(position);
      }
    },
    [isDragging, onDragEnd, position]
  );

  return {
    position,
    isDragging,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
};
