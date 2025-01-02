"use client"
import { useEffect, useRef, useState } from "react";

const InfiniteScroll = ({ images }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth) / 2) {
        container.scrollLeft = 0;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      }
    };

    let scrollInterval;
    if (!isPaused && !isDragging) {
      scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        checkScroll();
      }, 20);
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className="scroll-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className="scroll-wrapper">
        {[...images, ...images, ...images].map((src, index) => (
          <div className="post-img" key={index}>
            <img src={src.src} alt={`Image ${index}`} draggable="false" />
          </div>
        ))}
      </div>
      <style jsx>{`
        .scroll-container {
          overflow-x: scroll;
          overflow-y: hidden;
          position: relative;
          cursor: grab;
          width: 100%;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .scroll-container:active {
          cursor: grabbing;
        }

        .scroll-wrapper {
          display: flex;
          flex-wrap: nowrap;
          white-space: nowrap;
          gap:2px;
        }

        .post-img {
          flex: 0 0 auto;
          width: 300px;
         
          user-select: none;
          aspect-ratio:1/1;
          background:red;
          overflow:hidden;
          
        }

        .post-img img {
          width: 100%;
          height: 100%;
          object-fit:cover;
          display: block;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroll;