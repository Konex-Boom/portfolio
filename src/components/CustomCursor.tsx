import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { isDark } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const followerRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number;
    const followerEl = document.getElementById('cursor-follower');

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button,a,.cursor-pointer') ||
        target.getAttribute('role') === 'button';
      setIsHovered(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const follow = () => {
      const fx = followerRef.current;
      const px = posRef.current;
      fx.x += (px.x - fx.x) * 0.18;
      fx.y += (px.y - fx.y) * 0.18;
      if (followerEl) {
        followerEl.style.transform = `translate3d(${fx.x}px, ${fx.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(follow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);
    animationFrameId = requestAnimationFrame(follow);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ${
            isHovered
              ? isDark
                ? 'bg-cyan-300 scale-150 shadow-[0_0_12px_rgba(0,242,254,0.9)]'
                : 'bg-[#ff5500] scale-150 shadow-[0_0_12px_rgba(255,85,0,0.8)]'
              : isDark
              ? 'bg-cyan-400/80 shadow-[0_0_8px_rgba(0,242,254,0.6)]'
              : 'bg-[#ff5500]/80 shadow-[0_0_8px_rgba(255,85,0,0.5)]'
          }`}
        />
      </div>

      <div
        id="cursor-follower"
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${followerRef.current.x}px, ${followerRef.current.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 border ${
            isHovered
              ? isDark
                ? 'w-10 h-10 border-cyan-400/80 bg-cyan-400/10 scale-110 shadow-[0_0_20px_rgba(0,242,254,0.25)]'
                : 'w-10 h-10 border-orange-500/80 bg-orange-500/10 scale-110 shadow-[0_0_20px_rgba(255,85,0,0.25)]'
              : isDark
              ? 'w-7 h-7 border-slate-500/40 bg-transparent'
              : 'w-7 h-7 border-black/20 bg-transparent'
          }`}
        />
      </div>
    </>
  );
};
