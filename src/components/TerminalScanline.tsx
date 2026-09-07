import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TerminalScanlineProps {
  defaultEnabled?: boolean;
  showToggle?: boolean;
}

export const TerminalScanline: React.FC<TerminalScanlineProps> = ({
  defaultEnabled = true,
  showToggle = true,
}) => {
  const { isDark } = useTheme();
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('konex_hero_scanline');
      return saved !== null ? saved === 'true' : defaultEnabled;
    } catch {
      return defaultEnabled;
    }
  });

  const [intensity, setIntensity] = useState<'subtle' | 'standard' | 'high'>(() => {
    try {
      const saved = localStorage.getItem('konex_hero_intensity');
      return (saved as 'subtle' | 'standard' | 'high') || 'subtle';
    } catch {
      return 'subtle';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('konex_hero_scanline', String(isEnabled));
    } catch {
      // localStorage unavailable
    }
  }, [isEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('konex_hero_intensity', intensity);
    } catch {
      // localStorage unavailable
    }
  }, [intensity]);

  // Intensity opacity mappings
  const rasterOpacity = {
    subtle: isDark ? 'opacity-[0.03]' : 'opacity-[0.015]',
    standard: isDark ? 'opacity-[0.055]' : 'opacity-[0.03]',
    high: isDark ? 'opacity-[0.09]' : 'opacity-[0.05]',
  }[intensity];

  const beamOpacity = {
    subtle: isDark ? 'opacity-25' : 'opacity-15',
    standard: isDark ? 'opacity-45' : 'opacity-25',
    high: isDark ? 'opacity-75' : 'opacity-40',
  }[intensity];

  const flickerClass = {
    subtle: '',
    standard: 'animate-crt-flicker',
    high: 'animate-crt-flicker',
  }[intensity];

  return (
    <>
      {/* Visual Scanline Layers confined to Hero */}
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none z-[2] overflow-hidden select-none"
            aria-hidden="true"
          >
            {/* 1. Fine CRT Horizontal Scanline Grid */}
            <div
              className={`absolute inset-0 w-full h-full ${rasterOpacity} pointer-events-none`}
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0.95) 0px,
                  rgba(0, 0, 0, 0.95) 1px,
                  transparent 1px,
                  transparent 3px
                )`,
                backgroundSize: '100% 3px',
              }}
            />

            {/* 2. Micro Flicker Grain/Noise Overlay */}
            <div
              className={`absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] ${flickerClass}`}
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${
                  isDark ? 'rgba(0, 242, 254, 0.35)' : 'rgba(255, 85, 0, 0.25)'
                } 0%, transparent 80%)`,
              }}
            />

            {/* 3. Sweeping Horizontal Scan Beam */}
            <div
              className={`absolute left-0 right-0 h-32 w-full pointer-events-none will-change-transform ${beamOpacity}`}
              style={{
                animation: 'scanline-beam 8s linear infinite',
                willChange: 'transform',
                background: isDark
                  ? `linear-gradient(
                      180deg,
                      transparent 0%,
                      rgba(0, 242, 254, 0.03) 20%,
                      rgba(0, 242, 254, 0.15) 50%,
                      rgba(59, 130, 246, 0.08) 80%,
                      transparent 100%
                    )`
                  : `linear-gradient(
                      180deg,
                      transparent 0%,
                      rgba(255, 85, 0, 0.02) 20%,
                      rgba(255, 85, 0, 0.10) 50%,
                      rgba(255, 140, 0, 0.05) 80%,
                      transparent 100%
                    )`,
                boxShadow: isDark
                  ? '0 0 20px rgba(0, 242, 254, 0.08)'
                  : '0 0 20px rgba(255, 85, 0, 0.08)',
              }}
            >
              {/* Ultra-bright laser leading edge line */}
              <div
                className={`absolute top-1/2 left-0 right-0 h-[1.5px] ${
                  isDark
                    ? 'bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_10px_rgba(0,242,254,0.7)]'
                    : 'bg-gradient-to-r from-transparent via-orange-500/50 to-transparent shadow-[0_0_10px_rgba(255,85,0,0.5)]'
                }`}
              />
            </div>

            {/* 4. Peripheral Radial Vignette */}
            {isDark && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at center, transparent 60%, rgba(7, 11, 19, 0.4) 85%, rgba(5, 8, 15, 0.7) 100%)',
                }}
              />
            )}

            {/* 5. HUD Corner Framing Brackets */}
            <div
              className={`absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 pointer-events-none animate-hud-pulse ${
                isDark ? 'border-cyan-500/40' : 'border-orange-500/30'
              }`}
            />
            <div
              className={`absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 pointer-events-none animate-hud-pulse ${
                isDark ? 'border-cyan-500/40' : 'border-orange-500/30'
              }`}
            />
            <div
              className={`absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 pointer-events-none animate-hud-pulse ${
                isDark ? 'border-cyan-500/40' : 'border-orange-500/30'
              }`}
            />
            <div
              className={`absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 pointer-events-none animate-hud-pulse ${
                isDark ? 'border-cyan-500/40' : 'border-orange-500/30'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating HUD Controller inside Hero Section */}
      {showToggle && (
        <div className="absolute bottom-3 left-4 sm:left-8 z-20 flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEnabled((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-mono-code backdrop-blur-md transition-all cursor-pointer ${
              isEnabled
                ? isDark
                  ? 'bg-[#0c1222]/85 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.15)]'
                  : 'bg-white/90 border-orange-500/40 text-[#ff5500] shadow-[0_2px_8px_rgba(255,85,0,0.15)]'
                : isDark
                ? 'bg-[#0c1222]/60 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-white/60 border-black/10 text-zinc-500 hover:text-zinc-700'
            }`}
            title="Activer/Désactiver l'effet Terminal Scanline sur la section Hero"
          >
            <Terminal
              className={`w-3 h-3 ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            />
            <span className="hidden sm:inline">HERO SCAN:</span>
            <span
              className={`font-bold ${
                isEnabled
                  ? isDark
                    ? 'text-emerald-400'
                    : 'text-emerald-600'
                  : isDark
                  ? 'text-slate-500'
                  : 'text-zinc-400'
              }`}
            >
              {isEnabled ? 'ON' : 'OFF'}
            </span>
            {isEnabled ? (
              <Eye
                className={`w-2.5 h-2.5 ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              />
            ) : (
              <EyeOff className="w-2.5 h-2.5 opacity-60" />
            )}
          </button>

          {/* Quick Intensity Buttons */}
          {isEnabled && (
            <div
              className={`flex items-center gap-1 p-0.5 rounded-md border text-[8px] font-mono-code ${
                isDark
                  ? 'bg-[#0c1222]/85 border-slate-800/80'
                  : 'bg-white/90 border-black/[0.08]'
              }`}
            >
              {(['subtle', 'standard', 'high'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setIntensity(mode)}
                  className={`px-1.5 py-0.5 rounded transition-all uppercase cursor-pointer ${
                    intensity === mode
                      ? isDark
                        ? 'bg-cyan-500/25 text-cyan-300 font-bold'
                        : 'bg-orange-500/20 text-[#ff5500] font-bold'
                      : isDark
                      ? 'text-slate-500 hover:text-slate-300'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  {mode === 'subtle' ? 'Subtil' : mode === 'standard' ? 'Norm' : 'Cyber'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

