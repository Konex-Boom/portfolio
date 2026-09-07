import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Flame, Eye, Sparkles } from 'lucide-react';

export type SharinganType =
  | 'level1'
  | 'level2'
  | 'level3'
  | 'itachi'
  | 'kakashi'
  | 'madara'
  | 'sasuke'
  | 'shisui'
  | 's-ems'
  | 'm-ems'
  | 's-rgn'
  | 'hagoromo';

interface SharinganLoaderProps {
  type?: SharinganType;
  autoEvolve?: boolean;
  progress?: number;
  size?: number;
  className?: string;
}

export const SharinganLoader: React.FC<SharinganLoaderProps> = ({
  type,
  autoEvolve = true,
  progress = 0,
  size = 180,
  className,
}) => {
  // Derive eye model from progress or explicit type
  const getEvolvedType = (p: number): { type: SharinganType; name: string; subtitle: string } => {
    if (p < 20) return { type: 'level1', name: 'SHARINGAN', subtitle: '1-TOMOE AWAKENING' };
    if (p < 40) return { type: 'level2', name: 'SHARINGAN', subtitle: '2-TOMOE CLARITY' };
    if (p < 60) return { type: 'level3', name: 'SHARINGAN', subtitle: '3-TOMOE MASTERY' };
    if (p < 80) return { type: 'itachi', name: 'MANGEKYO SHARINGAN', subtitle: 'ITACHI • TSUKUYOMI' };
    if (p < 95) return { type: 's-ems', name: 'ETERNAL MANGEKYO', subtitle: 'SASUKE • AMATERASU' };
    return { type: 's-rgn', name: 'SIX PATHS RINNEGAN', subtitle: 'AMENOTEJIKARA READY' };
  };

  const currentInfo = type
    ? {
        type,
        name: type.toUpperCase(),
        subtitle: 'ACTIVE OCULAR JUTSU',
      }
    : getEvolvedType(progress);

  const activeType = currentInfo.type;

  return (
    <div className={cn('flex flex-col items-center justify-center select-none', className)}>
      {/* Dynamic Chakra Aura Backdrop */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing crimson chakra aura */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 1.35,
            height: size * 1.35,
            background:
              activeType === 's-rgn' || activeType === 'hagoromo'
                ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(126,34,206,0.15) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, rgba(153,27,27,0.2) 50%, transparent 75%)',
            filter: `blur(${size * 0.12}px)`,
          }}
        />

        {/* Outer glowing border ring */}
        <div
          className="relative rounded-full p-1 transition-all duration-700"
          style={{
            width: size,
            height: size,
            boxShadow:
              activeType === 's-rgn' || activeType === 'hagoromo'
                ? '0 0 35px rgba(168, 85, 247, 0.7), inset 0 0 20px rgba(126, 34, 206, 0.8)'
                : '0 0 40px rgba(220, 38, 38, 0.8), inset 0 0 25px rgba(153, 27, 27, 0.9)',
          }}
        >
          {/* Main Eye Structure */}
          <div
            className={cn(
              'sharingan-eye-node circle relative w-full h-full flex items-center justify-center overflow-hidden',
              activeType
            )}
            style={{
              transform: `scale(${size / 200})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Glare Reflection */}
            <div className="glare circle" />

            {/* Inner eye with rotating pupils/tomoe */}
            <InnerEyeContent type={activeType} />
          </div>
        </div>
      </div>

      {/* Sharingan Name & Evolution Indicator */}
      <motion.div
        key={currentInfo.subtitle}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-1.5 text-xs font-mono-code uppercase tracking-widest font-bold text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>{currentInfo.name}</span>
        </div>
        <span className="text-[10px] font-mono-code tracking-wider text-red-300/70 mt-0.5">
          {currentInfo.subtitle}
        </span>
      </motion.div>
    </div>
  );
};

// Sub-component for inner eye shapes
const InnerEyeContent: React.FC<{ type: SharinganType }> = ({ type }) => {
  if (type === 'level1') {
    return (
      <div className="inner-eye circle sharingan-spin">
        <div className="tag-container">
          <div className="tag circle" />
        </div>
      </div>
    );
  }

  if (type === 'level2') {
    return (
      <div className="inner-eye circle sharingan-spin">
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
      </div>
    );
  }

  if (type === 'level3') {
    return (
      <div className="inner-eye circle sharingan-spin">
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
      </div>
    );
  }

  if (type === 'itachi') {
    return (
      <div className="inner-eye circle sharingan-spin-fast">
        <div className="tag-container">
          <div className="tag" />
        </div>
        <div className="tag-container">
          <div className="tag" />
        </div>
        <div className="tag-container">
          <div className="tag" />
        </div>
      </div>
    );
  }

  if (type === 'kakashi') {
    return (
      <div className="inner-eye circle sharingan-spin-fast">
        <div className="tag-container">
          <div className="tag circle" />
          <div className="tag circle">
            <div className="tag-circle" />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag circle" />
          <div className="tag circle">
            <div className="tag-circle" />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag circle" />
          <div className="tag circle">
            <div className="tag-circle" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'madara' || type === 'm-ems') {
    return (
      <div className="inner-eye circle sharingan-spin-fast">
        <div className="tag-container">
          <div className="tag circle">
            <div className="tag-line" />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag circle">
            <div className="tag-line" />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag circle">
            <div className="tag-line" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sasuke') {
    return (
      <div className="inner-eye circle sharingan-spin-fast">
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
      </div>
    );
  }

  if (type === 's-ems') {
    return (
      <div className="inner-eye circle sharingan-spin-fast">
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="tag-container">
          <div className="tag circle" />
        </div>
        <div className="ems-tags">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  if (type === 'shisui') {
    return (
      <div className="inner-eye sui sharingan-spin-fast">
        <div className="tag-container">
          <div className="tag">
            <div />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag">
            <div />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag">
            <div />
          </div>
        </div>
        <div className="tag-container">
          <div className="tag">
            <div />
          </div>
        </div>
      </div>
    );
  }

  if (type === 's-rgn') {
    return (
      <div className="inner-eye circle">
        <div className="circle tag-circle sharingan-spin-reverse">
          <div className="tag-container">
            <div className="tag circle" />
          </div>
          <div className="tag-container">
            <div className="tag circle" />
          </div>
          <div className="tag-container">
            <div className="tag circle" />
          </div>
        </div>
        <div className="sharingan-spin-reverse">
          <div className="tag-container">
            <div className="tag circle" />
          </div>
          <div className="tag-container">
            <div className="tag circle" />
          </div>
          <div className="tag-container">
            <div className="tag circle" />
          </div>
        </div>
        <div />
      </div>
    );
  }

  if (type === 'hagoromo') {
    return (
      <div className="inner-eye circle">
        <div />
        <div />
        <div />
      </div>
    );
  }

  return null;
};

export default SharinganLoader;
