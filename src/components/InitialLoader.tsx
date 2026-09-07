import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SharinganLoader } from '@/components/ui/SharinganLoader';
import { Strands } from './Strands';
import { useTheme } from '../context/ThemeContext';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const TOTAL_DURATION_MS = 5000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / TOTAL_DURATION_MS) * 100));

      setProgress(rawProgress);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden ${
        isDark ? 'bg-[#040204] text-white' : 'bg-[#0a0507] text-white'
      }`}
    >
      {/* Background WebGL Strands component - Crimson & Violet Chakra Flow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
        <Strands
          colors={['#dc2626', '#ef4444', '#b91c1c', '#7f1d1d', '#9333ea']}
          count={5}
          speed={0.5}
          amplitude={1.2}
          waviness={1.4}
          thickness={0.8}
          glow={3.0}
          taper={2.8}
          spread={1.3}
          intensity={0.8}
          saturation={1.8}
          opacity={0.7}
          scale={1.4}
        />
      </div>

      {/* Cyber Grid & Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-85 pointer-events-none z-10" />

      {/* Central Sharingan Focus Box */}
      <div className="relative z-20 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Dynamic Sharingan Loader */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="my-3 w-full flex justify-center"
        >
          <SharinganLoader progress={progress} size={190} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-syne text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2 drop-shadow-[0_4px_25px_rgba(239,68,68,0.5)]"
        >
          KONEX <span className="bg-gradient-to-r from-red-400 via-rose-500 to-purple-500 bg-clip-text text-transparent">DEV</span>
        </motion.h1>

        {/* Progress Bar Container with Crimson Chakra Glow */}
        <div className="w-full mt-3 bg-slate-950/80 p-1.5 rounded-full border border-red-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.3)] relative overflow-hidden">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-purple-600 shadow-[0_0_15px_#ef4444]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Percentage */}
        <div className="w-full flex items-center justify-center mt-3 text-xs font-mono-code font-bold text-red-400">
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
