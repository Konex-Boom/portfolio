import React from 'react';
import { motion } from 'motion/react';

interface AtomLoaderProps {
  color?: string;
  electronColor?: string;
  size?: number;
  glow?: boolean;
}

export const AtomLoader: React.FC<AtomLoaderProps> = ({
  color = '#00f2fe',
  electronColor = '#38bdf8',
  size = 180,
  glow = true,
}) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Central Nucleus with Pulsing Core */}
      <div className="relative flex items-center justify-center">
        {/* Outer nucleus glow */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.6, 0.95, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full"
          style={{
            width: size * 0.22,
            height: size * 0.22,
            backgroundColor: color,
            filter: glow ? `blur(${size * 0.06}px)` : 'none',
          }}
        />

        {/* Dense Nucleus Core */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 rounded-full bg-white flex items-center justify-center"
          style={{
            width: size * 0.12,
            height: size * 0.12,
            boxShadow: `0 0 ${size * 0.1}px ${color}, 0 0 ${size * 0.18}px ${electronColor}`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        </motion.div>
      </div>

      {/* Orbit 1 - 0 deg tilt */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: 'rotate(0deg) rotateX(68deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="rounded-full border border-dashed"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            borderColor: `${color}40`,
            boxShadow: glow ? `0 0 12px ${color}30, inset 0 0 12px ${color}20` : 'none',
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{ width: size * 0.9, height: size * 0.9 }}
        >
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: size * 0.065,
              height: size * 0.065,
              backgroundColor: electronColor,
              boxShadow: `0 0 10px ${electronColor}, 0 0 18px ${color}`,
            }}
          />
        </motion.div>
      </div>

      {/* Orbit 2 - 60 deg tilt */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: 'rotate(60deg) rotateX(68deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="rounded-full border border-dashed"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            borderColor: `${electronColor}40`,
            boxShadow: glow ? `0 0 12px ${electronColor}30, inset 0 0 12px ${electronColor}20` : 'none',
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.7,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{ width: size * 0.9, height: size * 0.9 }}
        >
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: size * 0.065,
              height: size * 0.065,
              backgroundColor: '#fff',
              boxShadow: `0 0 10px #fff, 0 0 18px ${electronColor}`,
            }}
          />
        </motion.div>
      </div>

      {/* Orbit 3 - 120 deg tilt */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: 'rotate(120deg) rotateX(68deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="rounded-full border border-dashed"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            borderColor: `${color}40`,
            boxShadow: glow ? `0 0 12px ${color}30, inset 0 0 12px ${color}20` : 'none',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute"
          style={{ width: size * 0.9, height: size * 0.9 }}
        >
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: size * 0.065,
              height: size * 0.065,
              backgroundColor: electronColor,
              boxShadow: `0 0 10px ${electronColor}, 0 0 18px ${color}`,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AtomLoader;
