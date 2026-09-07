import React from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  User,
  ShieldCheck,
  Code2,
  Layers,
  Sparkles,
  Zap,
  Smile,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { portfolioImages } from '../data/konexData';
import { TerminalScanline } from './TerminalScanline';
import { Lightfall } from './Lightfall';
import { ParticleText } from './ParticleText';
import { useTheme } from '../context/ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';

interface HeroSectionProps {
  scrollProgress: number;
  onNavigate: (sectionId: string) => void;
  onOpenCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgress,
  onNavigate,
  onOpenCV,
}) => {
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className={`relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-8 lg:px-14 overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#070b13]' : 'bg-[#f4f3f0]'
      }`}
    >
      {/* Background Ambience & Soft Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* React Bits Lightfall WebGL shader background */}
        <div className="absolute inset-0 opacity-60">
          <ErrorBoundary>
            <Lightfall
            colors={
              isDark
                ? ['#00f2fe', '#38bdf8', '#6366f1', '#a855f7']
                : ['#ff8a00', '#ff5500', '#fb923c', '#f59e0b']
            }
            backgroundColor={isDark ? '#070b13' : '#f4f3f0'}
            speed={0.45}
            streakCount={4}
            streakWidth={1.2}
            streakLength={1.2}
            glow={isDark ? 1.2 : 0.8}
            density={0.5}
            twinkle={0.8}
            zoom={2.4}
            backgroundGlow={isDark ? 0.35 : 0.15}
            opacity={isDark ? 0.45 : 0.25}
            mouseInteraction={true}
            mouseStrength={0.6}
            mouseRadius={0.8}
            mixBlendMode={isDark ? 'screen' : 'multiply'}
          />
          </ErrorBoundary>
        </div>

        {isDark ? (
          <>
            {/* Subtle Dark Cyber Grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(to right, #00f2fe 1px, transparent 1px), linear-gradient(to bottom, #00f2fe 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Giant Radial Glow on Right under Avatar */}
            <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[140px]" />
            {/* Left Radial Glow behind Title */}
            <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px]" />
          </>
        ) : (
          <>
            {/* Soft Tech Dot Grid for Light Mode */}
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage: `radial-gradient(#d4d4d8 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            {/* Soft Warm Orange Halo on Right */}
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-400/10 via-amber-300/10 to-transparent rounded-full blur-[130px]" />
            {/* Soft Cream Highlight on Left */}
            <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-[120px]" />
          </>
        )}
      </div>

      {/* Terminal CRT Scanline - Enabled in Dark Mode */}
      {isDark && <TerminalScanline defaultEnabled={true} showToggle={true} />}

      {/* Top Meta-Data HUD Bar (SYS.LOC // STATUS // ENV.DEPLOY) - Hidden on Mobile/Android for clean responsive layout */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto hidden lg:flex items-center justify-between flex-wrap gap-4 pt-1 pb-6 text-[11px] font-mono-code border-b ${
          isDark ? 'border-slate-800/60' : 'border-black/[0.07]'
        }`}
      >
        {/* Left: GPS Location */}
        <div
          className={`flex items-center gap-2 ${
            isDark ? 'text-slate-400' : 'text-zinc-600'
          }`}
        >
          <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`}>
            📍 SYS.LOC
          </span>
          <span className={isDark ? 'text-slate-600' : 'text-zinc-400'}>//</span>
          <span>LAT: -18.8792° S</span>
          <span>LON: 47.5079° E</span>
        </div>

        {/* Center: Live Status Pill */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1 rounded-full ${
            isDark
              ? 'bg-[#0c1222] border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
              : 'bg-white border border-black/[0.07] text-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.04)]'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider text-[10px] sm:text-xs uppercase">
            DISPONIBLE POUR PROJETS & MISSIONS
          </span>
          <span className={isDark ? 'text-slate-600' : 'text-zinc-300'}>|</span>
          <span
            className={`text-[10px] ${
              isDark ? 'text-slate-400' : 'text-[#ff5500] font-semibold'
            }`}
          >
            LATENCY: 8ms
          </span>
        </div>

        {/* Right: Environment Deploy */}
        <div
          className={`flex items-center gap-2 ${
            isDark ? 'text-slate-400' : 'text-zinc-600'
          }`}
        >
          <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`}>
            ENV.DEPLOY
          </span>
          <span className={isDark ? 'text-slate-600' : 'text-zinc-400'}>//</span>
          <span className={isDark ? 'text-slate-300' : 'text-zinc-800 font-semibold'}>
            PROD_RELEASE_2026
          </span>
        </div>
      </div>

      {/* Main Hero Split Content (3-Column Layout: Left Pitch, Center Avatar, Right HUD Widgets) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-auto py-6">
        
        {/* Left Column: Branding, Title, Pitch & Action Buttons (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          
          {/* Subtitle / Role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${
              isDark
                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                : 'bg-orange-500/10 border border-orange-500/25 text-[#ff5500]'
            }`}
          >
            <span className="font-mono-code text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              DÉVELOPPEUR WEB & FULL-STACK
            </span>
          </motion.div>

          {/* Main Title: KONEX DEV with Interactive ParticleText */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="w-full max-w-[560px] h-[100px] sm:h-[120px] lg:h-[135px] mb-3 relative flex items-center"
          >
            <ParticleText
              key={isDark ? 'dark-konex' : 'light-konex'}
              text="KONEX DEV"
              particleSize={2.4}
              density={3}
              color={isDark ? '#ffffff' : '#18181b'}
              highlightColor={isDark ? '#00f2fe' : '#ff5500'}
              scatter={160}
              gatherDuration={1500}
              stagger={360}
              pointerRepel={45}
              repelRadius={110}
              idleDrift={0.6}
              trigger="hover"
              fontSize="clamp(2.8rem, 6.2vw, 4.8rem)"
              fontWeight={900}
              fontFamily="Syne, sans-serif"
              glow={true}
              className="w-full h-full"
            />
          </motion.div>

          {/* Pitch Paragraph with Orange Highlights in Light Mode / Cyan in Dark */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-sm sm:text-base leading-relaxed max-w-lg mb-7 ${
              isDark ? 'text-slate-300' : 'text-zinc-600'
            }`}
          >
            Je conçois et développe des solutions{' '}
            <span
              className={`font-semibold ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            >
              modernes
            </span>
            ,{' '}
            <span
              className={`font-semibold ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            >
              performantes
            </span>{' '}
            et centrées sur l'
            <span
              className={`font-semibold ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            >
              expérience utilisateur
            </span>
            .
          </motion.p>

          {/* Action Buttons: [↗ VOIR MES PROJETS] & [👤 EN SAVOIR PLUS] */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 w-full sm:w-auto"
          >
            {/* Primary Button: VOIR MES PROJETS */}
            <button
              onClick={() => onNavigate('projects')}
              className={`group relative px-6 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(0,242,254,0.4)]'
                  : 'bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#ff4400] hover:to-[#ff6600] text-white shadow-[0_8px_24px_-4px_rgba(255,85,0,0.45)] hover:shadow-[0_12px_28px_-4px_rgba(255,85,0,0.55)]'
              }`}
            >
              <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span>VOIR MES PROJETS</span>
            </button>

            {/* Secondary Button: EN SAVOIR PLUS */}
            <button
              onClick={() => onNavigate('about')}
              className={`group px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-[#0c1222]/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white shadow-md'
                  : 'bg-white border border-black/[0.08] hover:border-orange-500/40 text-zinc-800 hover:text-[#ff5500] shadow-[0_4px_14px_rgba(0,0,0,0.04)]'
              }`}
            >
              <User
                className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              />
              <span>EN SAVOIR PLUS</span>
            </button>
          </motion.div>

        </div>

        {/* Center Column: Avatar & Status Bubble & Floating Bottom Badge (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative my-4 lg:my-0">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative flex flex-col items-center"
          >
            {/* Concentric Aura & Filigree Orbit Ring */}
            <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
              {/* Outer Dashed Orbit Ring */}
              <div
                className={`w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed animate-spin-slow ${
                  isDark ? 'border-cyan-500/25' : 'border-orange-500/25'
                }`}
              />
              {/* Thin Inner Ring */}
              <div
                className={`absolute w-[250px] h-[250px] sm:w-[310px] sm:h-[310px] rounded-full border ${
                  isDark ? 'border-cyan-500/35' : 'border-orange-500/20'
                }`}
              />
              {/* Radial Glowing Aura */}
              <div
                className={`absolute w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rounded-full blur-2xl opacity-75 ${
                  isDark
                    ? 'bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-purple-600/20'
                    : 'bg-gradient-to-tr from-orange-500/25 via-amber-400/20 to-rose-400/15'
                }`}
              />
            </div>

            {/* Top-Left Floating Status Bubble with Green LED + Orange/Cyan Audio Wave */}
            <div
              className={`absolute -top-4 -left-4 sm:-left-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg ${
                isDark
                  ? 'bg-[#0c1222] border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                  : 'bg-white border border-black/[0.08] text-zinc-800 shadow-[0_6px_20px_rgba(0,0,0,0.08)]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono-code text-[10px] font-bold tracking-tight">
                ● DISPONIBLE
              </span>
              {/* Animated Audio Wave */}
              <div className="flex items-center gap-0.5 h-3 ml-1">
                <span
                  className={`w-0.5 rounded-full animate-audio-bar-1 ${
                    isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full animate-audio-bar-2 ${
                    isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full animate-audio-bar-3 ${
                    isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full animate-audio-bar-4 ${
                    isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'
                  }`}
                />
              </div>
            </div>

            {/* Circular Portrait Frame */}
            <div
              className={`relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-[3.5px] z-10 ${
                isDark
                  ? 'bg-gradient-to-tr from-cyan-400 via-blue-500 to-cyan-300 shadow-[0_0_40px_rgba(0,242,254,0.4)]'
                  : 'bg-gradient-to-tr from-[#ff5500] via-amber-400 to-[#ff7700] shadow-[0_0_45px_rgba(255,85,0,0.3)]'
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative border-4 border-white/20">
                <img
                  src={portfolioImages.heroPortrait}
                  alt="KONEX DEV Avatar Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-[0.98]"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Status Tag DEV */}
              <div
                className={`absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold ${
                  isDark
                    ? 'bg-[#0a0f1d] border border-cyan-400/80 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                    : 'bg-zinc-950 border border-orange-500 text-[#ff5500] shadow-[0_2px_10px_rgba(255,85,0,0.35)]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>DEV</span>
              </div>
            </div>

            {/* Floating Bottom Capsule Badge: 🛡️ KONEX // ARCHITECTE & FULL-STACK */}
            <div
              className={`mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-code shadow-xl z-10 ${
                isDark
                  ? 'bg-[#0c1222] border border-cyan-500/40 text-slate-200'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-200'
              }`}
            >
              <ShieldCheck
                className={`w-4 h-4 ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              />
              <span className="tracking-wide">
                <strong className="text-white">KONEX</strong> // ARCHITECTE & FULL-STACK
              </span>
              <span
                className={`px-1.5 py-0.2 rounded font-bold text-[9px] border ${
                  isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-orange-500/20 text-[#ff5500] border-orange-500/40'
                }`}
              >
                &lt;/&gt;
              </span>
            </div>

          </motion.div>

        </div>

        {/* Right Column: 3 Stacked HUD Widgets (Desktop only - Hidden on Android / Mobile screens) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-3.5">
          {/* Widget 1: Deployment (ENV.DEPLOY) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2 ${
              isDark
                ? 'bg-[#0c1222]/85 border-slate-800/90 hover:border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,254,0.06)]'
                : 'bg-white border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-2 text-xs font-bold font-mono-code ${
                  isDark ? 'text-slate-200' : 'text-zinc-800'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isDark
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'bg-orange-500/10 text-[#ff5500]'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <span>ENV.DEPLOY</span>
              </div>
              <span
                className={`text-[9px] font-mono-code px-2 py-0.5 rounded-full font-bold border ${
                  isDark
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                }`}
              >
                ONLINE
              </span>
            </div>
            <div
              className={`text-[11px] font-mono-code font-semibold ${
                isDark ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              PROD_RELEASE_2026
            </div>
            {/* Animated Wave Graph */}
            <div
              className={`w-full h-7 rounded-lg border p-1 flex items-center ${
                isDark
                  ? 'bg-cyan-500/[0.05] border-cyan-500/20'
                  : 'bg-orange-500/[0.04] border-orange-500/10'
              }`}
            >
              <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                <path
                  d="M0,15 Q15,5 30,12 T60,8 T80,18 T100,10"
                  fill="none"
                  stroke={isDark ? '#00f2fe' : '#ff5500'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,15 Q15,5 30,12 T60,8 T80,18 T100,10 L100,25 L0,25 Z"
                  fill={isDark ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 85, 0, 0.08)'}
                />
              </svg>
            </div>
          </motion.div>

          {/* Widget 2: Stack Favori */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2 ${
              isDark
                ? 'bg-[#0c1222]/85 border-slate-800/90 hover:border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,254,0.06)]'
                : 'bg-white border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-bold font-mono-code ${
                isDark ? 'text-slate-200' : 'text-zinc-800'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  isDark
                    ? 'bg-blue-500/15 text-cyan-400'
                    : 'bg-amber-500/10 text-amber-600'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>STACK FAVORI</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'Node.js', 'TypeScript', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono-code font-semibold border ${
                    isDark
                      ? 'bg-slate-900/90 text-slate-300 border-slate-800'
                      : 'bg-zinc-100 text-zinc-700 border-black/[0.04]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Widget 3: Latency & Reactivity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
              isDark
                ? 'bg-[#0c1222]/85 border-slate-800/90 hover:border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,254,0.06)]'
                : 'bg-white border-black/[0.06] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`p-1.5 rounded-lg ${
                  isDark
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-emerald-500/10 text-emerald-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div
                  className={`text-xs font-mono-code font-bold ${
                    isDark ? 'text-slate-200' : 'text-zinc-900'
                  }`}
                >
                  LATENCY: 8ms
                </div>
                <div
                  className={`text-[10px] font-mono-code ${
                    isDark ? 'text-slate-400' : 'text-zinc-500'
                  }`}
                >
                  RÉACTIVITÉ OPTIMALE
                </div>
              </div>
            </div>
            <Zap
              className={`w-4 h-4 ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom Section: Left Statistics Cards + Right Scroll Down Indicator */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isDark ? 'border-slate-800/60' : 'border-black/[0.07]'
        }`}
      >
        {/* Bottom Left: 3 Independent Stat Cards */}
        <div className="w-full sm:w-auto grid grid-cols-3 gap-2.5 sm:gap-4 flex-1 max-w-xl">
          {/* Card 1: +20 Projets */}
          <div
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0c1222]/70 border-cyan-500/20 backdrop-blur-sm'
                : 'bg-white border-black/[0.06] shadow-[0_6px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg w-fit mb-1.5 ${
                isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-orange-500/10 text-[#ff5500]'
              }`}
            >
              <Code2 className="w-4 h-4" />
            </div>
            <div
              className={`font-syne text-base sm:text-lg font-bold leading-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              +20
            </div>
            <div
              className={`text-[9px] font-mono-code uppercase leading-tight ${
                isDark ? 'text-slate-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              PROJETS RÉALISÉS
            </div>
          </div>

          {/* Card 2: 5+ Années */}
          <div
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0c1222]/70 border-cyan-500/20 backdrop-blur-sm'
                : 'bg-white border-black/[0.06] shadow-[0_6px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg w-fit mb-1.5 ${
                isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-600'
              }`}
            >
              <Layers className="w-4 h-4" />
            </div>
            <div
              className={`font-syne text-base sm:text-lg font-bold leading-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              5+
            </div>
            <div
              className={`text-[9px] font-mono-code uppercase leading-tight ${
                isDark ? 'text-slate-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              ANNÉES D'EXP.
            </div>
          </div>

          {/* Card 3: 100% Engagement */}
          <div
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0c1222]/70 border-cyan-500/20 backdrop-blur-sm'
                : 'bg-white border-black/[0.06] shadow-[0_6px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg w-fit mb-1.5 ${
                isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600'
              }`}
            >
              <Smile className="w-4 h-4" />
            </div>
            <div
              className={`font-syne text-base sm:text-lg font-bold leading-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              100%
            </div>
            <div
              className={`text-[9px] font-mono-code uppercase leading-tight ${
                isDark ? 'text-slate-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              ENGAGEMENT
            </div>
          </div>
        </div>

        {/* Bottom Right: Scroll Down Indicator */}
        <div className="flex items-center justify-center my-1 sm:self-end">
          <button
            onClick={() => onNavigate('about')}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all focus:outline-none cursor-pointer group ${
              isDark
                ? 'bg-[#0c1222]/70 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 shadow-sm'
                : 'bg-white border-black/[0.06] text-zinc-600 hover:text-[#ff5500] hover:border-orange-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
            }`}
          >
            <div
              className={`w-4 h-6 rounded-full border flex justify-center pt-0.5 transition-colors ${
                isDark
                  ? 'border-slate-600 group-hover:border-cyan-400'
                  : 'border-zinc-400 group-hover:border-[#ff5500]'
              }`}
            >
              <span
                className={`w-1 h-1 rounded-full animate-bounce ${
                  isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'
                }`}
              />
            </div>
            <span className="text-[10px] font-mono-code uppercase tracking-widest font-bold">
              DÉCOUVRIR
            </span>
          </button>
        </div>

      </div>

    </section>
  );
};

