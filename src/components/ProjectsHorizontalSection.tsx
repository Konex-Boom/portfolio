import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, Github } from 'lucide-react';
import { projectsData } from '../data/konexData';
import { projectThumbnails } from '../data/projectThumbnails';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import './ProjectsHorizontalSection.css';

interface ProjectsHorizontalSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

type ProjectFilter = 'all' | 'web' | 'mobile';
const filters: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
];
const bookColors = ['#913f2e', '#24546b', '#d5c8a9', '#284f43', '#b15b30', '#755267'];
const matchesFilter = (project: ProjectItem, filter: ProjectFilter) =>
  filter === 'all' || project.category.includes(filter === 'web' ? 'APPLICATION WEB' : 'APPLICATION MOBILE');

export const ProjectsHorizontalSection: React.FC<ProjectsHorizontalSectionProps> = ({ onSelectProject }) => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [activeId, setActiveId] = useState(projectsData[2]?.id ?? projectsData[0]?.id);
  const shelfRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef(new Map<string, HTMLButtonElement>());
  const pointerSelection = useRef(false);
  const visibleProjects = projectsData.filter(project => matchesFilter(project, filter));
  const activeProject = visibleProjects.find(project => project.id === activeId) ?? visibleProjects[0];
  const activeIndex = visibleProjects.findIndex(project => project.id === activeProject?.id);

  useEffect(() => {
    if (!activeProject || !window.matchMedia('(max-width: 767px)').matches) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Wait for the expanding cover before centering it; never scroll the page vertically.
    const timeout = window.setTimeout(() => {
      const shelf = shelfRef.current;
      const book = booksRef.current.get(activeProject.id);
      if (!shelf || !book) return;
      const bookBounds = book.getBoundingClientRect();
      const shelfBounds = shelf.getBoundingClientRect();
      shelf.scrollTo({
        left: shelf.scrollLeft + bookBounds.left - shelfBounds.left - (shelf.clientWidth - bookBounds.width) / 2,
        behavior: reducedMotion ? 'instant' : 'smooth',
      });
    }, reducedMotion ? 0 : 500);
    return () => window.clearTimeout(timeout);
  }, [activeProject?.id, filter]);

  const changeFilter = (next: ProjectFilter) => {
    setFilter(next);
    if (!activeProject || !matchesFilter(activeProject, next)) {
      setActiveId(projectsData.find(project => matchesFilter(project, next))?.id);
    }
  };

  const moveSelection = (direction: number, focus = false) => {
    if (!visibleProjects.length) return;
    const next = visibleProjects[(activeIndex + direction + visibleProjects.length) % visibleProjects.length];
    setActiveId(next.id);
    if (focus) booksRef.current.get(next.id)?.focus({ preventScroll: true });
  };

  return (
    <section id="projects" className={`project-library ${isDark ? 'project-library--dark' : ''}`} aria-labelledby="project-library-title">
      <div className="project-library__inner">
        <header className="project-library__header">
          <div>
            <p className="project-library__eyebrow">03 / SÉLECTION DE TRAVAUX</p>
            <h2 id="project-library-title">Mes projets<span>.</span></h2>
          </div>
          <p className="project-library__intro">Des idées devenues interfaces.<br />Une collection à explorer, projet par projet.</p>
        </header>

        <div className="project-library__toolbar">
          <div className="project-library__filters" role="group" aria-label="Filtrer les projets">
            {filters.map(item => (
              <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => changeFilter(item.id)}>
                {item.label}<span>{projectsData.filter(project => matchesFilter(project, item.id)).length.toString().padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <span className="project-library__edition">COLLECTION / {projectsData.length.toString().padStart(2, '0')} PROJETS</span>
        </div>

        <p id="project-library-help" className="project-library__hint">
          <span className="project-library__hint-desktop">Survolez une tranche, puis cliquez sur la couverture pour ouvrir le livre.</span>
          <span className="project-library__hint-touch">Sélectionnez une tranche, puis touchez la couverture pour ouvrir le livre.</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </p>

        <div className="project-library__shelf" ref={shelfRef}>
          <div className="project-library__volumes" role="group" aria-label="Bibliothèque des projets" aria-describedby="project-library-help">
            {visibleProjects.map(project => {
              const index = projectsData.findIndex(item => item.id === project.id);
              const active = activeProject?.id === project.id;
              const number = (index + 1).toString().padStart(2, '0');
              const thumbnail = projectThumbnails[project.image];
              const bookStyle = {
                '--book-color': bookColors[index % bookColors.length],
                '--book-ink': index % bookColors.length === 2 ? '#302d26' : '#fff6e5',
              } as React.CSSProperties;

              return (
                <button
                  key={project.id}
                  ref={element => { if (element) booksRef.current.set(project.id, element); else booksRef.current.delete(project.id); }}
                  type="button"
                  className={`project-book ${active ? 'is-active' : ''}`}
                  style={bookStyle}
                  aria-label={`${active ? 'Ouvrir' : 'Sélectionner'} le projet ${project.title}`}
                  aria-pressed={active}
                  aria-controls={active ? 'project-detail-dialog' : 'project-library-detail'}
                  aria-haspopup={active ? 'dialog' : undefined}
                  onPointerEnter={event => { if (event.pointerType === 'mouse') setActiveId(project.id); }}
                  onPointerDown={() => { pointerSelection.current = true; }}
                  onPointerCancel={() => { pointerSelection.current = false; }}
                  onFocus={() => { if (!pointerSelection.current) setActiveId(project.id); }}
                  onBlur={() => { pointerSelection.current = false; }}
                  onClick={() => {
                    pointerSelection.current = false;
                    if (active) onSelectProject(project);
                    else setActiveId(project.id);
                  }}
                  onKeyDown={event => {
                    pointerSelection.current = false;
                    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                      event.preventDefault();
                      moveSelection(event.key === 'ArrowRight' ? 1 : -1, true);
                    }
                    if (event.key === 'Home' || event.key === 'End') {
                      event.preventDefault();
                      const next = event.key === 'Home' ? visibleProjects[0] : visibleProjects[visibleProjects.length - 1];
                      setActiveId(next.id);
                      booksRef.current.get(next.id)?.focus({ preventScroll: true });
                    }
                  }}
                >
                  <span className="project-book__spine" aria-hidden="true">
                    <span className="project-book__spine-number">{number}</span>
                    <span className="project-book__spine-title">{project.title}</span>
                    <span className="project-book__spine-footer">{project.year}<span>K/D</span></span>
                  </span>
                  <span className="project-book__cover" aria-hidden="true">
                    <span className="project-book__cover-top"><span>KONEX DEV / {number}</span><ArrowUpRight size={15} /></span>
                    <span className="project-book__title">{project.title}</span>
                    <span className="project-book__category">{project.category.split(' • ')[1] ?? project.category}</span>
                    <span className="project-book__artwork">
                      <img src={thumbnail?.src ?? project.image} srcSet={thumbnail?.srcSet} sizes="(max-width: 767px) 225px, 290px" width={960} height={600} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="project-book__cover-bottom"><span>{project.year}<br />{project.category.includes('MOBILE') ? 'ÉDITION MOBILE' : 'ÉDITION WEB'}</span><span className="project-book__open">EXPLORER <ArrowUpRight size={12} /></span></span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {activeProject ? (
          <div id="project-library-detail" className="project-library__detail">
            <div className="project-library__pagination">
              <button type="button" onClick={() => moveSelection(-1)} aria-label="Projet précédent" disabled={visibleProjects.length < 2}><ArrowLeft size={19} /></button>
              <span aria-live="polite" aria-atomic="true"><b>{(activeIndex + 1).toString().padStart(2, '0')}</b> / {visibleProjects.length.toString().padStart(2, '0')}</span>
              <button type="button" onClick={() => moveSelection(1)} aria-label="Projet suivant" disabled={visibleProjects.length < 2}><ArrowRight size={19} /></button>
            </div>
            <div className="project-library__selected" key={activeProject.id}>
              <p className="project-library__selected-label">{activeProject.category} <span>/ {activeProject.year}</span></p>
              <h3><button type="button" onClick={() => onSelectProject(activeProject)}>{activeProject.title}</button></h3>
              <p className="project-library__description">{activeProject.description}</p>
              <ul className="project-library__stack" aria-label="Technologies utilisées">{activeProject.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
            </div>
            <div className="project-library__actions">
              <button type="button" className="project-library__open" onClick={() => onSelectProject(activeProject)}>Découvrir le projet <ArrowUpRight size={17} /></button>
              <div className="project-library__links">
                {activeProject.githubUrl && <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={14} /> Code source</a>}
                {activeProject.downloadUrl && <a href={activeProject.downloadUrl} target="_blank" rel="noopener noreferrer"><Download size={14} /> Application</a>}
                {activeProject.liveUrl && <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">Voir le site <ArrowUpRight size={14} /></a>}
              </div>
            </div>
          </div>
        ) : <p className="project-library__empty">Aucun projet dans cette catégorie.</p>}

        <footer className="project-library__footer"><span>KONEX DEV — ARCHIVES CRÉATIVES</span><span>CONCEPTION & DÉVELOPPEMENT</span></footer>
      </div>
    </section>
  );
};
