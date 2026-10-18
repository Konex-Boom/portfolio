import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useReducedMotion,
} from 'motion/react';
import './ScrollVelocity.css';
import { useElementVisibility } from '../hooks/useElementVisibility';

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    const observer = new ResizeObserver(updateWidth);
    if (ref.current) observer.observe(ref.current);
    updateWidth();
    return () => observer.disconnect();
  }, [ref]);

  return width;
}

export interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts?: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  disableScroll?: boolean;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface VelocityTextProps {
  key?: React.Key;
  children: React.ReactNode;
  baseVelocity?: number;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  disableScroll?: boolean;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  disableScroll = false,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement | null>(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isVisible } = useElementVisibility(sectionRef);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    let frame = 0;
    let lastTime = 0;
    const animate = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 64) : 0;
      lastTime = time;
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (!disableScroll) {
        if (velocityFactor.get() < 0) {
          directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
          directionFactor.current = 1;
        }
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
      }

      baseX.set(baseX.get() + moveBy);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, reducedMotion, baseVelocity, disableScroll, velocityFactor, baseX]);

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null}>
        {children}&nbsp;
      </span>
    );
  }

  return (
    <div className={parallaxClassName} ref={sectionRef} style={parallaxStyle}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {spans}
      </motion.div>
    </div>
  );
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  disableScroll = false,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
}) => {
  return (
    <section className="w-full overflow-hidden">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          disableScroll={disableScroll}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
