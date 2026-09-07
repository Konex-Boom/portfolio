import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Target, Code2, Sparkles, CheckCircle2, Terminal } from 'lucide-react';
import { aboutData } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';

const ModelViewer = React.lazy(() => import('./ModelViewer').then(m => ({ default: m.ModelViewer })));

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 overflow-hidden"
    >
      {/* Section Header with Framer Motion reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-col mb-12 border-b pb-6 ${
          isDark ? 'border-slate-800/80' : 'border-black/[0.08]'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`font-mono-code text-xs font-bold tracking-[0.2em] ${
              isDark ? 'text-cyan-400' : 'text-[#ff5500]'
            }`}
          >
            01 // PROFILE
          </span>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`h-[1px] ${
              isDark ? 'bg-cyan-500/40' : 'bg-orange-500/40'
            }`}
          />
        </div>
        <h2
          className={`font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          À PROPOS DE MOI
        </h2>
        <p
          className={`text-sm sm:text-base mt-1 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-zinc-600'
          }`}
        >
          Découvrir mon parcours, mes compétences fondamentales et ma vision du développement web.
        </p>
      </motion.div>

      {/* Main Grid: Left Tech Dossier / Workspace Card, Right Detailed Biography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Visual Card with Workspace Setup & Technical Specs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark
                ? 'bg-[#0c101d] border border-slate-800 shadow-2xl hover:border-cyan-500/50 hover:shadow-[0_20px_40px_rgba(0,242,254,0.15)]'
                : 'bg-white border border-black/[0.07] shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,85,0,0.12)] hover:border-orange-500/30'
            }`}
          >
            {/* Top Terminal Bar */}
            <div
              className={`h-9 px-4 flex items-center justify-between border-b ${
                isDark
                  ? 'bg-[#080c16] border-slate-800/70'
                  : 'bg-zinc-100/90 border-black/[0.06]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span
                className={`text-[10px] font-mono-code flex items-center gap-1.5 font-bold ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                konex@workstation:~
              </span>
              <div className="w-6" />
            </div>

            {/* Interactive 3D Model */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <React.Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                <span className={`font-mono-code text-xs ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`}>CHARGEMENT 3D ...</span>
              </div>}>
                <ErrorBoundary>
                  <ModelViewer className="absolute inset-0 w-full h-full" />
                </ErrorBoundary>
              </React.Suspense>
              <div
                className={`pointer-events-none absolute inset-0 opacity-70 ${
                  isDark
                    ? 'bg-gradient-to-t from-[#0c101d] via-transparent to-transparent'
                    : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'
                }`}
              />

              {/* Status pill overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold backdrop-blur-md bg-black/70 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </div>
            </div>

            {/* Bottom Info HUD */}
            <div
              className={`p-5 flex flex-col gap-3 ${
                isDark ? 'bg-[#0c101d]' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 text-xs font-bold font-mono-code ${
                    isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                  }`}
                >
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{aboutData.location}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                    isDark
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : 'bg-orange-500/10 text-[#ff5500] border border-orange-500/25'
                  }`}
                >
                  REMOTE READY
                </span>
              </div>

              <div
                className={`grid grid-cols-2 gap-2 pt-2 border-t text-xs ${
                  isDark ? 'border-slate-800' : 'border-black/[0.06]'
                }`}
              >
                
               
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Bio, Philosophy, Objectives */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          
          {/* Main Title & Role */}
          <div>
            <h3
              className={`font-syne text-2xl sm:text-3xl font-bold leading-snug ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {aboutData.title}
            </h3>
          </div>

          {/* Profile Paragraph */}
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-zinc-600'
            }`}
          >
            {aboutData.profile}
          </p>

          {/* Specialization Block */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`p-4 sm:p-5 rounded-2xl space-y-2 border transition-all ${
              isDark
                ? 'bg-[#0c101d]/70 border-slate-800 backdrop-blur-sm hover:border-cyan-500/40 hover:shadow-[0_10px_25px_rgba(0,242,254,0.08)]'
                : 'bg-white border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:border-orange-500/30 hover:shadow-[0_10px_25px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div
              className={`flex items-center gap-2 font-bold text-xs sm:text-sm font-mono-code uppercase ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Spécialisation & Expertise</span>
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-zinc-600'
              }`}
            >
              {aboutData.specialization}
            </p>
          </motion.div>

          {/* Objective Block */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`p-4 sm:p-5 rounded-2xl space-y-2 border transition-all ${
              isDark
                ? 'bg-[#0c101d]/70 border-slate-800 backdrop-blur-sm hover:border-purple-500/40 hover:shadow-[0_10px_25px_rgba(168,85,247,0.08)]'
                : 'bg-white border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:border-amber-500/30 hover:shadow-[0_10px_25px_rgba(245,158,11,0.08)]'
            }`}
          >
            <div
              className={`flex items-center gap-2 font-bold text-xs sm:text-sm font-mono-code uppercase ${
                isDark ? 'text-purple-400' : 'text-amber-600'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Objectif Professionnel</span>
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-zinc-600'
              }`}
            >
              {aboutData.objective}
            </p>
          </motion.div>

          {/* Stats Bar with Staggered Framer Motion cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {aboutData.stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`p-3 rounded-xl border text-center sm:text-left transition-all ${
                  isDark
                    ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/40'
                    : 'bg-white border-black/[0.06] shadow-sm hover:border-orange-500/30'
                }`}
              >
                <span
                  className={`text-[10px] font-mono-code uppercase block mb-1 ${
                    isDark ? 'text-slate-400' : 'text-zinc-500 font-semibold'
                  }`}
                >
                  {st.label}
                </span>
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-cyan-300' : 'text-[#ff5500]'
                  }`}
                >
                  {st.value}
                </span>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

