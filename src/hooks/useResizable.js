import { useState, useRef, useEffect, useCallback } from 'react';

export const useResizable = ({ initialSize, initialPosition, minSize = { width: 320, height: 220 }, onResizeEnd, isMaximized }) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef({
    direction: '',
    startX: 0,
    startY: 0,
    origW: initialSize.width,
    origH: initialSize.height,
    origX: initialPosition.x,
    origY: initialPosition.y,
  });

  useEffect(() => {
    setSize(initialSize);
  }, [initialSize]);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const startResize = useCallback(
    (direction, e) => {
      if (isMaximized) return;
      e.stopPropagation();
      e.preventDefault();

      setIsResizing(true);
      resizeRef.current = {
        direction,
        startX: e.clientX,
        startY: e.clientY,
        origW: size.width,
        origH: size.height,
        origX: position.x,
        origY: position.y,
      };

      const handlePointerMove = (moveEvent) => {
        const dx = moveEvent.clientX - resizeRef.current.startX;
        const dy = moveEvent.clientY - resizeRef.current.startY;
        const { direction: dir, origW, origH, origX, origY } = resizeRef.current;

        let nextW = origW;
        let nextH = origH;
        let nextX = origX;
        let nextY = origY;

        // East / West
        if (dir.includes('e')) {
          nextW = Math.max(minSize.width, origW + dx);
        } else if (dir.includes('w')) {
          const possibleW = origW - dx;
          if (possibleW >= minSize.width) {
            nextW = possibleW;
            nextX = origX + dx;
          }
        }

        // North / South
        if (dir.includes('s')) {
          nextH = Math.max(minSize.height, origH + dy);
        } else if (dir.includes('n')) {
          const possibleH = origH - dy;
          if (possibleH >= minSize.height && origY + dy >= 28) {
            nextH = possibleH;
            nextY = origY + dy;
          }
        }

        setSize({ width: nextW, height: nextH });
        setPosition({ x: nextX, y: nextY });
      };

      const handlePointerUp = () => {
        setIsResizing(false);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        if (onResizeEnd) {
          onResizeEnd(size, position);
        }
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [isMaximized, minSize, onResizeEnd, position, size]
  );

  return {
    size,
    position,
    isResizing,
    startResize,
  };
};
