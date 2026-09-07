import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Layers,
  Sparkles,
  Atom,
  FileCode2,
  Layout,
  Palette,
  Server,
  Cpu,
  Database,
  HardDrive,
  Terminal,
  Binary,
  Coffee,
  Code,
  GitBranch,
  Brain,
  Users,
  Globe,
  Cloud,
  Wrench,
  BookOpen,
  Smartphone,
  CalendarCheck,
  MessageSquare,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { techSkillsData } from '../data/konexData';
import { TechSkill } from '../types';
import { useTheme } from '../context/ThemeContext';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Atom, FileCode2, Layout, Palette, Layers, Server, Cpu, Database,
  HardDrive, Terminal, Binary, Coffee, Code, Sparkles, GitBranch,
  Brain, Users, Globe, Cloud, Wrench, BookOpen, Smartphone,
  CalendarCheck, MessageSquare, ShieldCheck, Compass,
};

const getSkillIcon = (skill: TechSkill) => {
  const Cmp = ICON_MAP[skill.icon] || Sparkles;
  return <Cmp className="w-full h-full" style={{ color: skill.color }} />;
};

interface ResponsiveGridConfig {
  cols: number;
  stepX: number;
  stepY: number;
  centerCol: number;
  centerRow: number;
  isMobile: boolean;
  isTablet: boolean;
}

const getResponsiveConfig = (width: number): ResponsiveGridConfig => {
  if (width < 380) {
    return { cols: 3, stepX: 96, stepY: 62, centerCol: 1.0, centerRow: 2.5, isMobile: true, isTablet: false };
  } else if (width < 640) {
    return { cols: 3, stepX: 110, stepY: 68, centerCol: 1.0, centerRow: 2.5, isMobile: true, isTablet: false };
  } else if (width < 1024) {
    return { cols: 6, stepX: 116, stepY: 104, centerCol: 2.5, centerRow: 1.0, isMobile: false, isTablet: true };
  } else {
    return { cols: 6, stepX: 165, stepY: 140, centerCol: 2.5, centerRow: 1.0, isMobile: false, isTablet: false };
  }
};

interface TechCardProps {
  skill: TechSkill;
  index: number;
  totalCards: number;
  progress: any;
  isDark: boolean;
  gridConfig: ResponsiveGridConfig;
  onHover: (skill: TechSkill | null) => void;
  isHovered: boolean;
}

const TechCard: React.FC<TechCardProps> = React.memo(({
  skill, index, totalCards, progress, isDark, gridConfig, onHover, isHovered,
}) => {
  const col = index % gridConfig.cols;
  const row = Math.floor(index / gridConfig.cols);

  const targetX = (col - gridConfig.centerCol) * gridConfig.stepX;
  const targetY = (row - gridConfig.centerRow) * gridConfig.stepY;

  const initialX = ((index % 5) - 2) * (gridConfig.isMobile ? 0.8 : 1.5);
  const initialY = -index * (gridConfig.isMobile ? 0.7 : 1.2);
  const initialRotate = ((index % 2 === 0 ? 1 : -1) * ((index % 7) * (gridConfig.isMobile ? 1.0 : 1.4)));

  const staggerStart = 0.06 + (index / totalCards) * 0.35;
  const staggerEnd = Math.min(0.92, staggerStart + 0.44);

  const x = useTransform(progress, [0.04, staggerStart, staggerEnd, 0.98], [initialX, initialX, targetX, targetX]);
  const y = useTransform(progress, [0.04, staggerStart, staggerEnd, 0.98], [initialY, initialY, targetY, targetY]);
  const rotate = useTransform(progress, [0.04, staggerStart, staggerEnd, 0.98], [initialRotate, initialRotate, 0, 0]);
  const scale = useTransform(progress, [0.04, staggerStart, staggerEnd, 0.98], [0.96, 0.96, 1, 1]);

  const cardShadow = useMemo(() => {
    if (isHovered) {
      return isDark
        ? `0 20px 45px -5px ${skill.color}55, 0 0 30px 2px ${skill.color}40`
        : `0 18px 40px -6px ${skill.color}50, 0 0 24px 1px ${skill.color}35`;
    }
    return isDark
      ? `0 ${3 + index * 0.4}px ${8 + index * 0.6}px -2px rgba(0, 0, 0, 0.75), 0 0 12px -2px ${skill.color}15`
      : `0 ${3 + index * 0.4}px ${8 + index * 0.6}px -2px rgba(0, 0, 0, 0.12), 0 0 10px -2px ${skill.color}15`;
  }, [isHovered, isDark, skill.color, index]);

  return (
    <motion.div
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(isHovered ? null : skill)}
      className={`group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl sm:rounded-2xl flex flex-col justify-between cursor-pointer select-none transition-all duration-300 ${
        gridConfig.isMobile ? 'w-[96px] min-w-[96px] h-[58px] p-1.5' : gridConfig.isTablet ? 'w-28 h-24 p-2' : 'w-38 h-32 p-3'
      } ${isDark ? 'bg-[#0a0f1d]/95 text-white' : 'bg-white/95 text-zinc-900'}`}
      style={{ x, y, rotate, scale: isHovered ? 1.08 : scale, zIndex: isHovered ? 99 : totalCards - index, boxShadow: cardShadow, willChange: 'transform' }}
    >
      <div className="flex items-center justify-between pointer-events-none relative z-10">
        <div className={`rounded flex items-center justify-center border shrink-0 ${gridConfig.isMobile ? 'w-5 h-5 p-1' : 'w-7 h-7 p-1'}`}
          style={{ backgroundColor: `${skill.color}18`, borderColor: `${skill.color}45` }}
        >
          {getSkillIcon(skill)}
        </div>
        <span className={`text-[8px] sm:text-[9px] font-mono-code font-bold ${isDark ? 'opacity-75 text-slate-300' : 'opacity-75 text-zinc-500'}`}>
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="pointer-events-none my-auto relative z-10">
        <h4 className={`font-syne text-[10px] sm:text-xs font-bold truncate leading-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          {skill.name}
        </h4>
        {!gridConfig.isMobile && (
          <span className={`text-[9px] font-mono-code block truncate ${isDark ? 'text-slate-400' : 'text-zinc-500'}`}>
            {skill.experienceYears}
          </span>
        )}
      </div>
      <div className={`flex items-center justify-between text-[7px] sm:text-[8px] font-mono-code uppercase border-t pt-0.5 border-current/10 ${isDark ? 'opacity-75 text-slate-300' : 'opacity-75 text-zinc-500'}`}>
        <span className="truncate">{skill.level}</span>
        <span className={`font-bold ml-1 ${isHovered ? 'animate-pulse' : ''}`} style={{ color: skill.color }}>●</span>
      </div>
    </motion.div>
  );
});

export const TechArsenalSection: React.FC = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<TechSkill | null>(null);

  // Only 18 cards to keep the deck animation light
  const skillSubset = useMemo(() => techSkillsData.slice(0, 18), []);

  const [gridConfig, setGridConfig] = useState<ResponsiveGridConfig>(() =>
    typeof window !== 'undefined' ? getResponsiveConfig(window.innerWidth) : getResponsiveConfig(1200)
  );

  useEffect(() => {
    const handleResize = () => setGridConfig(getResponsiveConfig(window.innerWidth));
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = skillSubset.length;

  return (
    <div
      ref={containerRef}
      id="competences"
      className={`relative h-[250vh] sm:h-[280vh] w-full transition-colors duration-300 ${
        isDark ? 'bg-[#05070f]' : 'bg-[#f4f3f0]'
      }`}
    >
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-4 sm:py-6 lg:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">

        <div className={`flex flex-col border-b pb-2 sm:pb-4 shrink-0 ${isDark ? 'border-slate-800/80' : 'border-black/[0.08]'}`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`font-mono-code text-[10px] sm:text-xs font-bold tracking-widest uppercase ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`}>
              // 03. COMPÉTENCES & STACK
            </span>
            <div className={`h-[1px] flex-1 ${isDark ? 'bg-cyan-500/20' : 'bg-orange-500/20'}`} />
          </div>
          <div className="flex items-center justify-between gap-2 mt-1 sm:mt-2">
            <div>
              <h2 className={`text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase font-syne leading-none ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                TECH <span className={isDark ? 'text-cyan-400' : 'text-[#ff5500]'}>ARSENAL</span>
              </h2>
              <p className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 max-w-xl font-body line-clamp-1 sm:line-clamp-none ${isDark ? 'text-slate-400' : 'text-zinc-600'}`}>
                Deck empilé au centre se dispersant en grille interactive au fil du défilement.
              </p>
            </div>
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl font-mono-code text-[10px] sm:text-xs shadow-sm border shrink-0 ${isDark ? 'bg-[#0c101d] border-slate-800/90' : 'bg-white border-black/[0.06]'}`}>
              <Layers className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`} />
              <span className="font-bold">{gridConfig.isMobile ? '18 CARTES' : '18 COMPÉTENCES // DECK'}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-5xl h-[380px] sm:h-[440px] lg:h-[480px] mx-auto my-auto flex items-center justify-center overflow-visible">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`rounded-full border border-dashed opacity-20 ${gridConfig.isMobile ? 'w-[280px] h-[280px]' : 'w-[440px] h-[440px]'} ${isDark ? 'border-cyan-500/30' : 'border-orange-500/30'}`} />
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
            {skillSubset.map((skill, index) => (
              <TechCard
                key={skill.id}
                skill={skill}
                index={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                isDark={isDark}
                gridConfig={gridConfig}
                onHover={setHoveredSkill}
                isHovered={hoveredSkill?.id === skill.id}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
