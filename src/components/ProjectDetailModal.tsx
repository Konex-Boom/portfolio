import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Download, Github, X } from 'lucide-react';
import { projectsData } from '../data/konexData';
import { projectThumbnails } from '../data/projectThumbnails';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import './ProjectDetailModal.css';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const coverColors = ['#913f2e', '#24546b', '#d5c8a9', '#284f43', '#b15b30', '#755267'];

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { isDark } = useTheme();
  const [activeShot, setActiveShot] = useState(0);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!project) return;
    setActiveShot(0);
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => {
      (window.matchMedia('(max-width: 767px)').matches ? mobileCloseRef.current : closeRef.current)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'))
        .filter(element => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project?.id]);

  if (!project) return null;

  const screenshots = project.screenshots?.length ? project.screenshots : [project.image];
  const projectIndex = projectsData.findIndex(item => item.id === project.id);
  const number = String(projectIndex + 1).padStart(2, '0');
  const thumbnail = projectThumbnails[project.image];

  return (
    <div className="project-reading-overlay" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        id="project-detail-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-reading-title"
        className={'project-reading-book' + (isDark ? ' project-reading-book--dark' : '')}
      >
        <button ref={mobileCloseRef} type="button" className="project-reading-close project-reading-mobile-close" aria-label="Fermer le projet" onClick={onClose}>
          <X size={19} aria-hidden="true" />
        </button>
        <div className="project-reading-page project-reading-page--visual">
          <div className="project-reading-page__meta">
            <span>KONEX DEV / {number}</span>
            <span>{project.category}</span>
          </div>
          <div className="project-reading-image">
            <img src={screenshots[activeShot]} alt={project.title + ' — capture ' + (activeShot + 1)} decoding="async" />
          </div>
          {screenshots.length > 1 && (
            <div className="project-reading-gallery" aria-label="Captures du projet">
              {screenshots.map((shot, index) => (
                <button
                  key={shot}
                  type="button"
                  aria-label={'Voir la capture ' + (index + 1)}
                  aria-pressed={activeShot === index}
                  onClick={() => setActiveShot(index)}
                >
                  <img src={shot} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
          <p className="project-reading-page__folio">PORTFOLIO / {number} <span>{String(activeShot + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</span></p>
        </div>

        <div className="project-reading-page project-reading-page--story">
          <div className="project-reading-page__top">
            <span>ÉTUDE DE PROJET / {number}</span>
            <button ref={closeRef} type="button" className="project-reading-close" aria-label="Fermer le projet" onClick={onClose}>
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <h2 id="project-reading-title">{project.title}</h2>
          <p className="project-reading-subtitle">{project.subtitle}</p>
          <p className="project-reading-intro">{project.description}</p>

          <div className="project-reading-highlight">
            <span>POINTS FORTS</span>
            <strong>{project.metrics}</strong>
          </div>
          <div className="project-reading-block">
            <h3>Le projet</h3>
            <p>{project.caseStudy.overview}</p>
          </div>
          <div className="project-reading-block">
            <h3>Architecture</h3>
            <p>{project.caseStudy.architecture}</p>
          </div>
          <div className="project-reading-block">
            <h3>Fonctionnalités</h3>
            <ul>{project.caseStudy.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>
          </div>
          <div className="project-reading-block">
            <h3>Résultats</h3>
            <ul>{project.caseStudy.results.map(result => <li key={result}>{result}</li>)}</ul>
          </div>
          <div className="project-reading-block">
            <h3>Technologies</h3>
            <div className="project-reading-tech">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          </div>
          {(project.githubUrl || project.liveUrl || project.downloadUrl) && (
            <div className="project-reading-links">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> Code source</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Voir le site <ArrowUpRight size={16} /></a>}
              {project.downloadUrl && <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer"><Download size={16} /> Application</a>}
            </div>
          )}
          <p className="project-reading-page__end">KONEX DEV — CONCEPTION & DÉVELOPPEMENT</p>
        </div>

        <div
          key={project.id}
          className="project-reading-cover"
          style={{ backgroundColor: coverColors[projectIndex] ?? coverColors[0], color: projectIndex === 2 ? '#302d26' : '#fff6e5' }}
          aria-hidden="true"
        >
          <span>KONEX DEV / {number}</span>
          <strong>{project.title}</strong>
          <img src={thumbnail?.src ?? project.image} alt="" decoding="async" />
          <small>{project.category}</small>
        </div>
      </section>
    </div>
  );
};
