import React, { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InfiniteMarqueeRibbon } from './components/InfiniteMarqueeRibbon';
import { ScrollVelocity } from './components/ScrollVelocity';
import { AboutSection } from './components/AboutSection';
import { TechArsenalSection } from './components/TechArsenalSection';
import { ProjectsHorizontalSection } from './components/ProjectsHorizontalSection';
import { ExperienceTimelineSection } from './components/ExperienceTimelineSection';
import { EducationSection } from './components/EducationSection';
import { SoftSkillsLanguagesSection } from './components/SoftSkillsLanguagesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectItem } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { downloadCV } from './lib/utils';

function AppContent() {
  const { isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Global Scroll Engine with cached section positions
  useEffect(() => {
    let ticking = false;
    const sectionIds = [
      'hero', 'about', 'tech-arsenal', 'projects',
      'experiences', 'formation', 'soft-skills', 'contact',
    ];
    let sectionCache: { id: string; top: number; height: number }[] = [];

    const rebuildCache = () => {
      sectionCache = sectionIds.map((id) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.offsetTop : 0, height: el ? el.offsetHeight : 0 };
      });
    };
    rebuildCache();
    window.addEventListener('resize', rebuildCache, { passive: true });

    const calculateScroll = () => {
      const scrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalDocHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalDocHeight)) : 0;

      setScrollProgress(progress);
      setIsScrolled(scrollY > 40);

      const scrollPosition = scrollY + window.innerHeight * 0.35;
      for (const sec of sectionCache) {
        if (scrollPosition >= sec.top && scrollPosition < sec.top + sec.height) {
          setActiveSection(sec.id);
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    calculateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', rebuildCache);
    };
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offsetTop = el.offsetTop - 70;
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-x-clip font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#05070f] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'bg-[#f4f3f0] text-zinc-900 selection:bg-orange-500/20 selection:text-[#ff5500]'
      }`}
    >
      {/* Interactive Initial Loading Screen removed */}

      {/* Precision Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Global HUD Vertical Scroll Tracker */}
      <ScrollProgress
        progress={scrollProgress}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Global Translucent Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        isScrolled={isScrolled}
        onNavigate={handleNavigate}
        onOpenCV={downloadCV}
      />

      {/* Main Sections Stream */}
      <main className="relative z-10 flex flex-col w-full">
        {/* 01. HERO (Cinematic Parallax & Technical Status HUD / Neumorphic Light Mode) */}
        <HeroSection
          scrollProgress={scrollProgress}
          onNavigate={handleNavigate}
          onOpenCV={downloadCV}
        />

        {/* INFINITE TECH MARQUEE RIBBON (Continuous Right to Left Infinite Ticker) */}
        <InfiniteMarqueeRibbon />

        {/* SCROLL VELOCITY SECTION - ANIMATION CONTINUE SANS SCROLL */}
        <div
          className={`
            w-full py-6 sm:py-10 border-y transition-colors duration-500
            overflow-hidden select-none
            ${isDark
              ? 'bg-[#070b13]/80 border-cyan-500/20 text-white'
              : 'bg-zinc-100/90 border-orange-500/20 text-zinc-900'
            }
          `}
          style={{
            transform: 'translateZ(0)',
            contain: 'layout style paint',
            isolation: 'isolate',
          }}
        >
          <ScrollVelocity
            texts={[
              'FULL-STACK ARCHITECTURE • CREATIVE CODE • HIGH PERFORMANCE •',
              'TYPESCRIPT & REACT • CLOUD SYSTEMS • NEXT-GEN UI/UX •',
            ]}
            velocity={35}
            className={`
              font-syne font-black uppercase
              text-2xl sm:text-4xl md:text-5xl lg:text-6xl
              tracking-tight px-4
              transition-colors
              ${isDark ? 'hover:text-cyan-400' : 'hover:text-[#ff5500]'}
            `}
            damping={50}
            stiffness={200}
            numCopies={4}
            disableScroll={true}
            parallaxClassName="will-change-transform"
            scrollerStyle={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased',
            }}
          />
        </div>

        {/* 02. À PROPOS (About Me & Deep Engineering Dossier) */}
        <AboutSection onNavigate={handleNavigate} />

        {/* 03. COMPÉTENCES / TECH ARSENAL (3D Stack -> Deploy -> Categorized Composition) */}
        <TechArsenalSection />

        {/* 04. PROJETS (Horizontal Scroll Projects Showcase) */}
        <ProjectsHorizontalSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 05. EXPÉRIENCES (Interactive Professional Timeline) */}
        <ExperienceTimelineSection />

        {/* 06. FORMATION (Academic & Degree Milestones) */}
        <EducationSection />

        {/* 07. QUALITÉS & LANGUES (Behavioral Skills & Multi-Language Badges) */}
        <SoftSkillsLanguagesSection />

        {/* 08. CONTACT (Encrypted Transmission & Interactive Form) */}
        <ContactSection />
      </main>

      {/* 09. FOOTER (Minimalist Developer Footer) */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCV={downloadCV}
      />

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

