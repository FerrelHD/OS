import { useState, useCallback } from 'react';

export const useDockMagnification = ({ maxScale = 1.35, distanceThreshold = 120, enabled = true }) => {
  const [mouseX, setMouseX] = useState(null);

  const onMouseMove = useCallback((e) => {
    if (!enabled) return;
    setMouseX(e.clientX);
  }, [enabled]);

  const onMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const getScale = useCallback(
    (itemCenterX) => {
      if (!enabled || mouseX === null || itemCenterX === null) {
        return 1;
      }
      const distance = Math.abs(mouseX - itemCenterX);
      if (distance > distanceThreshold) {
        return 1;
      }
      // Gaussian curve
      const factor = Math.cos((distance / distanceThreshold) * (Math.PI / 2));
      return 1 + (maxScale - 1) * Math.max(0, factor);
    },
    [enabled, mouseX, distanceThreshold, maxScale]
  );

  return {
    onMouseMove,
    onMouseLeave,
    getScale,
    mouseX,
  };
};
