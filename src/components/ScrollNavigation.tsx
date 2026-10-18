import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { ScrollProgress } from './ScrollProgress';
import { downloadCV } from '../lib/utils';

const sectionIds = ['hero', 'about', 'tech-arsenal', 'projects', 'experiences', 'formation', 'soft-skills', 'contact'];

/** Keep frequent scroll updates out of the page's content tree. */
export function ScrollNavigation({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let sections: { id: string; top: number; height: number }[] = [];
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, Math.max(0, y / distance)) : 0);
      setIsScrolled(y > 40);
      const position = y + window.innerHeight * 0.35;
      const section = sections.find(s => position >= s.top && position < s.top + s.height);
      if (section) setActiveSection(section.id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      sections = sectionIds.flatMap(id => {
        const el = document.getElementById(id);
        if (!el) return [];
        const rect = el.getBoundingClientRect();
        return [{ id, top: rect.top + window.scrollY, height: rect.height }];
      });
      schedule();
    };
    const resizeObserver = new ResizeObserver(measure);
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) resizeObserver.observe(el);
    });
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return <>
    <ScrollProgress progress={progress} activeSection={activeSection} onNavigate={onNavigate} />
    <Navbar activeSection={activeSection} isScrolled={isScrolled} onNavigate={onNavigate} onOpenCV={downloadCV} />
  </>;
}
