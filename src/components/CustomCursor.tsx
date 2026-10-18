import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() => window.matchMedia('(hover: none), (pointer: coarse)').matches);
  const dotRef = useRef<HTMLDivElement>(null);
  const followerElementRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouchDevice(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    let frame = 0;
    let visible = false;
    const follow = () => {
      frame = 0;
      const target = posRef.current;
      const follower = followerRef.current;
      follower.x += (target.x - follower.x) * 0.18;
      follower.y += (target.y - follower.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = 'translate3d(' + target.x + 'px,' + target.y + 'px,0)';
      if (followerElementRef.current) followerElementRef.current.style.transform = 'translate3d(' + follower.x + 'px,' + follower.y + 'px,0)';
      if (visible && Math.hypot(target.x - follower.x, target.y - follower.y) > 0.1) frame = requestAnimationFrame(follow);
    };
    const hide = () => {
      visible = false;
      cancelAnimationFrame(frame);
      frame = 0;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (followerElementRef.current) followerElementRef.current.style.opacity = '0';
    };
    const handleMouseMove = (event: MouseEvent) => {
      posRef.current = { x: event.clientX, y: event.clientY };
      if (!visible) {
        visible = true;
        followerRef.current = { ...posRef.current };
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (followerElementRef.current) followerElementRef.current.style.opacity = '1';
      }
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      setIsHovered(target instanceof Element && !!target.closest('button,a,.cursor-pointer,[role="button"]'));
    };
    const handleVisibility = () => { if (document.hidden) hide(); };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      hide();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('blur', hide);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
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
        ref={followerElementRef}
        id="cursor-follower"
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
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
