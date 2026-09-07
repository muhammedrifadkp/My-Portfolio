import React, { useState, useRef, useEffect, useCallback } from 'react';
import './InteractiveImageViewer.css';

const InteractiveImageViewer = ({ src, alt }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  // Reset Zoom & Position
  const handleReset = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Mouse Wheel Zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev * 1.15, 5));
    } else {
      setZoom((prev) => {
        const nextZoom = Math.max(prev / 1.15, 0.8);
        if (nextZoom <= 1) {
          setPosition({ x: 0, y: 0 });
          return 1;
        }
        return nextZoom;
      });
    }
  };

  // Mouse Drag (Pan) Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag Support for mobile/tablets
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Double click to reset or toggle 2x zoom
  const handleDoubleClick = () => {
    if (zoom !== 1 || position.x !== 0 || position.y !== 0) {
      handleReset();
    } else {
      setZoom(2);
    }
  };

  // Keyboard navigation (+, -, 0, r, arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      const panStep = 50;
      switch (e.key) {
        case '=':
        case '+':
          setZoom((prev) => Math.min(prev * 1.2, 5));
          break;
        case '-':
        case '_':
          setZoom((prev) => {
            const next = prev / 1.2;
            if (next <= 1) {
              setPosition({ x: 0, y: 0 });
              return 1;
            }
            return next;
          });
          break;
        case 'r':
        case 'R':
        case '0':
          handleReset();
          break;
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y + panStep }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y - panStep }));
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: prev.x + panStep }));
          break;
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: prev.x - panStep }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset]);

  return (
    <div className="interactive-image-viewer clean-mode">
      <div
        ref={containerRef}
        className={`viewer-stage ${isDragging ? 'is-dragging' : ''} ${zoom > 1 ? 'can-pan' : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className="image-transform-wrapper"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
        >
          <img src={src} alt={alt || 'Visual Diagram'} className="interactive-img" draggable={false} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveImageViewer;
