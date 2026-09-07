import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Terminal } from 'lucide-react';

const marqueeItems = [
  { name: 'REACT.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', tag: 'UI' },
  { name: 'TYPESCRIPT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', tag: 'STRICT' },
  { name: 'NEXT.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', tag: 'SSR' },
  { name: 'NODE.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', tag: 'RUNTIME' },
  { name: 'TAILWIND CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', tag: 'DESIGN' },
  { name: 'PHP / LARAVEL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', tag: 'BACKEND' },
  { name: 'POSTGRESQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', tag: 'SQL' },
  { name: 'MONGODB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', tag: 'NOSQL' },
  { name: 'DOCKER', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', tag: 'DEVOPS' },
  { name: 'GIT & GITHUB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', tag: 'CI/CD' },
  { name: 'REST & GRAPHQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', tag: 'APIS' },
  { name: 'PYTHON', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', tag: 'SCRIPTING' },
];

export const InfiniteMarqueeRibbon: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative w-full overflow-hidden py-3 sm:py-3.5 border-y select-none transition-colors duration-300 ${
        isDark
          ? 'bg-[#080d1a]/95 border-cyan-500/20 text-slate-200 shadow-[0_0_25px_rgba(0,242,254,0.05)]'
          : 'bg-[#faf9f6] border-black/[0.08] text-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.02)]'
      }`}
    >
      {/* Edge Gradient Masks for Butter-Smooth Infinite Entrance & Exit */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 ${
          isDark
            ? 'bg-gradient-to-r from-[#05070f] via-[#080d1a] to-transparent'
            : 'bg-gradient-to-r from-[#f4f3f0] via-[#faf9f6] to-transparent'
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 ${
          isDark
            ? 'bg-gradient-to-l from-[#05070f] via-[#080d1a] to-transparent'
            : 'bg-gradient-to-l from-[#f4f3f0] via-[#faf9f6] to-transparent'
        }`}
      />

      {/* Infinite Continuous Ticker Track (Double Array for True Loop) */}
      <div className="animate-infinite-marquee flex items-center gap-6 sm:gap-8">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-3 sm:gap-4 shrink-0 transition-transform duration-200 hover:scale-105"
          >
            {/* Tech Logo & Name */}
            <div
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border ${
                isDark
                  ? 'bg-[#050814]/80 border-slate-800/90 hover:border-cyan-400/50 shadow-sm'
                  : 'bg-white border-black/[0.06] hover:border-orange-500/40 shadow-sm'
              }`}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-4 h-4 object-contain filter drop-shadow-sm pointer-events-none"
              />
              <span className="font-syne text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
                {item.name}
              </span>
              <span
                className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded font-semibold ${
                  isDark
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'bg-orange-500/10 text-[#ff5500] border border-orange-500/20'
                }`}
              >
                {item.tag}
              </span>
            </div>

            {/* Glowing Accent Separator */}
            <span
              className={`font-mono-code text-xs font-black ${
                isDark ? 'text-cyan-400/50' : 'text-[#ff5500]/50'
              }`}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
