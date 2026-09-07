import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ScrollProgressProps {
  progress: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const sections = [
  { id: 'hero', label: '01' },
  { id: 'about', label: '02' },
  { id: 'tech-arsenal', label: '03' },
  { id: 'projects', label: '04' },
  { id: 'experiences', label: '05' },
  { id: 'formation', label: '06' },
  { id: 'soft-skills', label: '07' },
  { id: 'contact', label: '08' },
];

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  progress,
  activeSection,
  onNavigate,
}) => {
  const { isDark } = useTheme();
  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none pointer-events-auto">
      {/* Top percentage readout */}
      <div
        className={`font-mono-code text-[10px] font-bold tracking-wider ${
          isDark ? 'text-cyan-400/90' : 'text-[#ff5500]'
        }`}
      >
        {String(percentage).padStart(2, '0')}%
      </div>

      {/* Vertical Track */}
      <div
        className={`relative w-[2px] h-36 rounded-full overflow-hidden ${
          isDark ? 'bg-slate-800/80' : 'bg-zinc-300/80'
        }`}
      >
        <div
          className={`w-full rounded-full transition-all duration-75 ${
            isDark
              ? 'bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_6px_rgba(0,242,254,0.6)]'
              : 'bg-gradient-to-b from-[#ff5500] to-[#ff7700] shadow-[0_0_6px_rgba(255,85,0,0.4)]'
          }`}
          style={{ height: `${percentage}%` }}
        />
      </div>

      {/* Section Dots */}
      <div className="flex flex-col items-center gap-2">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none cursor-pointer"
              aria-label={`Scroll to section ${sec.id}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? 'w-2 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.9)] scale-125'
                      : 'w-2 h-2 bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.6)] scale-125'
                    : isDark
                    ? 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400'
                    : 'w-1.5 h-1.5 bg-zinc-400 group-hover:bg-zinc-600'
                }`}
              />
              <span
                className={`absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono-code px-1.5 py-0.5 rounded pointer-events-none uppercase whitespace-nowrap border shadow-sm ${
                  isDark
                    ? 'text-slate-300 bg-slate-900/95 border-slate-800'
                    : 'text-zinc-700 bg-white border-black/[0.08]'
                }`}
              >
                {sec.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
