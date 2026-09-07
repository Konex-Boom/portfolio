import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calendar, MapPin, CheckCircle2, Briefcase, Sparkles, Building2 } from 'lucide-react';
import { experienceData } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));

export const ExperienceTimelineSection: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [nodeProgresses, setNodeProgresses] = useState<number[]>(() =>
    new Array(experienceData.length).fill(0)
  );

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 1. Overall timeline section scroll progress (0 -> 1)
    const triggerStart = windowHeight * 0.75;
    const scrollableDistance = sectionRect.height;
    const currentScroll = triggerStart - sectionRect.top;
    const progress = clamp(currentScroll / scrollableDistance, 0, 1);
    setScrollProgress(progress);

    // 2. Individual experience node progress (0 -> 1)
    const itemTriggerPoint = windowHeight * 0.72;
    const progresses = itemRefs.current.map((itemEl) => {
      if (!itemEl) return 0;
      const itemRect = itemEl.getBoundingClientRect();
      const distFromTrigger = itemTriggerPoint - itemRect.top;
      return clamp(distFromTrigger / 200, 0, 1);
    });

    setNodeProgresses(progresses);
  }, []);

  useEffect(() => {
    let animFrame: number;

    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    const timer1 = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
      cancelAnimationFrame(animFrame);
    };
  }, [handleScroll]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <div
        className={`flex flex-col mb-12 border-b pb-6 ${
          isDark ? 'border-slate-800/80' : 'border-black/[0.08]'
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`font-mono-code text-xs font-bold tracking-[0.2em] ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              >
                04 // TIMELINE & EXPÉRIENCE
              </span>
              <span
                className={`h-[1px] w-8 ${
                  isDark ? 'bg-cyan-500/40' : 'bg-orange-500/40'
                }`}
              />
            </div>
            <h2
              className={`font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              PARCOURS PROFESSIONNEL
            </h2>
            <p
              className={`text-sm sm:text-base mt-1 max-w-2xl ${
                isDark ? 'text-slate-400' : 'text-zinc-600'
              }`}
            >
              Chronologie éditoriale interactive révélée au fil du scroll : rôles clés, livrables et stack technique.
            </p>
          </div>

          {/* Timeline HUD Status */}
          <div
            className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl font-mono-code text-xs shadow-md border ${
              isDark
                ? 'bg-[#0c101d] border-slate-800/90'
                : 'bg-white border-black/[0.06]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'
              }`}
            />
            <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>
              PROGRESSION :
            </span>
            <span
              className={`font-bold ${
                isDark ? 'text-cyan-300' : 'text-[#ff5500]'
              }`}
            >
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* STATE 1: Editorial Horizontal Axis Progress Bar */}
        <div className="relative w-full mt-4">
          {/* Rail */}
          <div
            className={`w-full h-[1px] ${
              isDark ? 'bg-slate-800/80' : 'bg-zinc-300/80'
            }`}
          />
          
          {/* Active progressive scaleX line */}
          <div
            className={`absolute top-0 left-0 w-full h-[1px] origin-left transition-transform duration-75 ease-out ${
              isDark
                ? 'bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 shadow-[0_0_8px_rgba(0,242,254,0.6)]'
                : 'bg-gradient-to-r from-[#ff5500] via-orange-500 to-amber-500 shadow-[0_0_8px_rgba(255,85,0,0.4)]'
            }`}
            style={{
              transform: `scaleX(${scrollProgress})`,
              transformOrigin: 'left center',
            }}
          />

          {/* Step markers along the horizontal line */}
          <div
            className={`flex items-center justify-between text-[11px] font-mono-code pt-2 ${
              isDark ? 'text-slate-500' : 'text-zinc-500'
            }`}
          >
            {experienceData.map((exp, idx) => {
              const nodeP = nodeProgresses[idx] || 0;
              const isPassed = nodeP > 0.5;
              return (
                <div
                  key={exp.id}
                  className={`flex items-center gap-1.5 transition-colors duration-200 ${
                    isPassed
                      ? isDark
                        ? 'text-cyan-300 font-bold'
                        : 'text-[#ff5500] font-bold'
                      : isDark
                      ? 'text-slate-600'
                      : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isPassed
                        ? isDark
                          ? 'bg-cyan-400 shadow-[0_0_6px_rgba(0,242,254,0.8)]'
                          : 'bg-[#ff5500] shadow-[0_0_6px_rgba(255,85,0,0.5)]'
                        : isDark
                        ? 'bg-slate-800'
                        : 'bg-zinc-300'
                    }`}
                  />
                  <span className="hidden sm:inline">{exp.period}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Editorial Timeline Stream */}
      <div ref={timelineRef} className="relative ml-2 sm:ml-8 pl-8 sm:pl-12 space-y-16 lg:space-y-20">
        
        {/* Base Background Vertical Line */}
        <div
          className={`absolute left-0 top-3 bottom-3 w-[1px] rounded-full ${
            isDark ? 'bg-slate-800/60' : 'bg-zinc-300/80'
          }`}
        />

        {/* Scroll-Driven Revealing Line */}
        <div
          className={`absolute left-0 top-3 bottom-3 w-[1.5px] origin-top transition-transform duration-75 ease-out ${
            isDark
              ? 'bg-gradient-to-b from-cyan-400 via-indigo-400 to-purple-500 shadow-[0_0_10px_rgba(0,242,254,0.6)]'
              : 'bg-gradient-to-b from-[#ff5500] via-orange-500 to-amber-500 shadow-[0_0_10px_rgba(255,85,0,0.4)]'
          }`}
          style={{
            transform: `scaleY(${scrollProgress})`,
            transformOrigin: 'top center',
          }}
        />

        {experienceData.map((exp, index) => {
          const progress = nodeProgresses[index] || 0;
          
          const pointScale = lerp(1, 1.25, progress);
          const pointOpacity = lerp(0.5, 1, progress);

          const cardTranslateY = lerp(40, 0, progress);
          const cardScale = lerp(0.96, 1, progress);
          const cardOpacity = progress;

          const isActive = progress >= 0.75;

          return (
            <div
              key={exp.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="relative"
            >
              {/* Timeline Node Marker */}
              <div 
                className="absolute -left-[40px] sm:-left-[57px] top-4 flex items-center justify-center pointer-events-none transition-all duration-150"
                style={{
                  transform: `scale(${pointScale})`,
                  opacity: pointOpacity,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? isDark
                        ? 'bg-[#05070f] border-cyan-400 shadow-[0_0_14px_rgba(0,242,254,0.9)] ring-2 ring-cyan-500/25'
                        : 'bg-white border-[#ff5500] shadow-[0_0_14px_rgba(255,85,0,0.4)] ring-2 ring-orange-500/25'
                      : isDark
                      ? 'bg-[#0c101d] border-slate-700 shadow-none'
                      : 'bg-white border-zinc-300 shadow-none'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      isActive
                        ? isDark
                          ? 'bg-cyan-400'
                          : 'bg-[#ff5500]'
                        : isDark
                        ? 'bg-slate-600'
                        : 'bg-zinc-400'
                    }`}
                  />
                </div>
              </div>

              {/* Experience Card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border ${
                  isDark
                    ? `bg-[#0c101d] shadow-xl ${
                        isActive
                          ? 'border-slate-800 hover:border-cyan-500/50 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                          : 'border-slate-800/40'
                      }`
                    : `bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(255,85,0,0.08)] ${
                        isActive
                          ? 'border-black/[0.08] hover:border-orange-500/30'
                          : 'border-black/[0.05]'
                      }`
                }`}
                style={{
                  transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
                  opacity: cardOpacity,
                  pointerEvents: progress > 0.25 ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Header: Period, Type & Location */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold border ${
                        isDark
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          : 'bg-orange-500/10 border-orange-500/25 text-[#ff5500]'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono-code ${
                        isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-zinc-100 text-zinc-700 border border-black/[0.04]'
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-1 text-xs font-mono-code ${
                      isDark ? 'text-slate-400' : 'text-zinc-500'
                    }`}
                  >
                    <MapPin
                      className={`w-3.5 h-3.5 ${
                        isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                      }`}
                    />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Role Title & Organization */}
                <div className="mb-4">
                  <h3
                    className={`font-syne text-xl sm:text-2xl font-bold transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-cyan-300'
                        : 'text-zinc-900 group-hover:text-[#ff5500]'
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2
                      className={`w-4 h-4 ${
                        isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                      }`}
                    />
                    <span
                      className={`font-mono-code text-xs sm:text-sm font-semibold ${
                        isDark ? 'text-cyan-300' : 'text-[#ff5500]'
                      }`}
                    >
                      {exp.company}
                    </span>
                  </div>
                </div>

                {/* Description Narrative */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                    isDark ? 'text-slate-300' : 'text-zinc-600'
                  }`}
                >
                  {exp.description}
                </p>

                {/* Major Deliverables / Achievements */}
                <div
                  className={`space-y-2 mb-6 p-4 rounded-2xl border ${
                    isDark
                      ? 'bg-[#080d1a] border-slate-800/80 text-slate-300'
                      : 'bg-orange-500/[0.03] border-orange-500/15 text-zinc-700'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono-code uppercase tracking-wider font-bold block mb-2 ${
                      isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                    }`}
                  >
                    RÉALISATIONS MAJEURES :
                  </span>
                  {exp.achievements.map((ach, achIdx) => (
                    <div
                      key={achIdx}
                      className="flex items-start gap-2.5 text-xs"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                        }`}
                      />
                      <span className="leading-snug">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Applied Technologies */}
                <div
                  className={`pt-4 border-t flex items-center justify-between flex-wrap gap-3 ${
                    isDark ? 'border-slate-800/80' : 'border-black/[0.06]'
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono-code ${
                          isDark
                            ? 'bg-slate-900 border border-slate-800 text-slate-300'
                            : 'bg-zinc-100 border border-black/[0.05] text-zinc-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`text-[10px] font-mono-code ${
                      isDark ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    ÉTAPE 0{index + 1}
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
