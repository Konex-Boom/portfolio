import React from 'react';
import {
  ArrowUpRight,
  Eye,
  Github,
  Download,
  Layers,
} from 'lucide-react';
import { projectsData } from '../data/konexData';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectsHorizontalSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsHorizontalSection: React.FC<ProjectsHorizontalSectionProps> = ({
  onSelectProject,
}) => {
  const { isDark } = useTheme();
  const total = projectsData.length;

  return (
    <div
      id="projects"
      className={`relative w-full transition-colors duration-300 ${
        isDark ? 'bg-[#05070f]' : 'bg-[#f4f3f0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">

        {/* Header */}
        <div
          className={`flex flex-col border-b pb-5 mb-8 sm:mb-12 ${
            isDark ? 'border-slate-800/80' : 'border-black/[0.08]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`font-mono-code text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            >
              // 03. SELECTED WORKS
            </span>
            <span className={`h-[1px] w-8 ${isDark ? 'bg-cyan-500/40' : 'bg-orange-500/40'}`} />
            <span
              className={`text-[10px] sm:text-[11px] font-mono-code hidden sm:inline ${
                isDark ? 'text-slate-500' : 'text-zinc-500'
              }`}
            >
              PORTFOLIO GRID
            </span>
          </div>

          <div className="flex flex-row items-end justify-between gap-4">
            <div>
              <h2
                className={`font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                GALERIE DE <span className={isDark ? 'text-cyan-400' : 'text-[#ff5500]'}>PROJETS</span>
              </h2>
              <p
                className={`text-xs sm:text-sm mt-1 max-w-xl font-body ${
                  isDark ? 'text-slate-400' : 'text-zinc-600'
                }`}
              >
                Explorez les réalisations et case studies interactifs.
              </p>
            </div>

            {/* Counter */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono-code text-xs shadow-sm border shrink-0 ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 text-slate-300'
                  : 'bg-white border-black/[0.06] text-zinc-700'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`} />
              <span className="font-bold">{total}</span>
              <span className="opacity-40">PROJETS</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-2xl border overflow-hidden cursor-pointer select-none flex flex-col transition-all duration-300 ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800/80 hover:border-cyan-500/60 hover:shadow-[0_20px_50px_rgba(0,242,254,0.12)]'
                  : 'bg-white border-black/[0.08] hover:border-orange-500/40 hover:shadow-[0_20px_48px_rgba(255,85,0,0.12)]'
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-t from-[#0c101d] via-transparent to-transparent'
                      : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
                  }`}
                />

                {/* Badge numéro */}
                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <span
                    className={`font-mono-code text-[11px] sm:text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1.5 border shadow-md ${
                      isDark
                        ? 'text-cyan-300 bg-[#05070f]/85 border-cyan-500/40'
                        : 'text-[#ff5500] bg-white/90 border-orange-500/40'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#ff5500]'}`} />
                    0{project.number || index + 1}
                  </span>
                  <span
                    className={`font-mono-code text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md border ${
                      isDark
                        ? 'text-slate-300 bg-slate-900/85 border-slate-700'
                        : 'text-zinc-700 bg-white/90 border-black/[0.08]'
                    }`}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Catégorie */}
                <div
                  className={`absolute bottom-3 left-3 sm:left-4 font-mono-code text-[10px] sm:text-xs uppercase tracking-wider font-bold drop-shadow-md ${
                    isDark ? 'text-cyan-400' : 'text-white'
                  }`}
                >
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className={`p-4 sm:p-5 flex flex-col justify-between flex-1 ${isDark ? 'bg-[#0c101d]' : 'bg-white'}`}>
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className={`font-syne text-base sm:text-xl font-bold transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-cyan-300'
                          : 'text-zinc-900 group-hover:text-[#ff5500]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`p-1 rounded-md transition-all shrink-0 border ${
                        isDark
                          ? 'bg-slate-900/80 border-slate-800 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50'
                          : 'bg-zinc-100 border-black/[0.05] text-zinc-600 group-hover:text-[#ff5500] group-hover:border-orange-500/40'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div
                    className={`text-[11px] font-mono-code mb-2.5 ${
                      isDark ? 'text-slate-400' : 'text-zinc-500'
                    }`}
                  >
                    {project.subtitle}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3 ${
                      isDark ? 'text-slate-300' : 'text-zinc-600'
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div
                    className={`p-2 rounded-lg text-[11px] font-mono-code mb-3 flex items-center gap-2 border ${
                      isDark
                        ? 'bg-[#080d1a] border-cyan-500/25 text-cyan-300/95'
                        : 'bg-orange-500/[0.04] border-orange-500/20 text-zinc-800'
                    }`}
                  >
                    <span className="truncate font-semibold">{project.metrics}</span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono-code ${
                          isDark
                            ? 'bg-slate-900 border border-slate-800 text-slate-300'
                            : 'bg-zinc-100 border border-black/[0.05] text-zinc-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code border ${
                          isDark
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-orange-500/10 text-[#ff5500] border-orange-500/25'
                        }`}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className={`pt-3 mt-3 border-t flex items-center justify-between text-[11px] sm:text-xs font-mono-code ${
                    isDark ? 'border-slate-800/80' : 'border-black/[0.06]'
                  }`}
                >
                  <span
                    className={`font-bold flex items-center gap-1.5 transition-colors ${
                      isDark
                        ? 'text-cyan-400 group-hover:text-cyan-300'
                        : 'text-[#ff5500] group-hover:text-orange-600'
                    }`}
                  >
                    <span>VOIR</span>
                    <Eye className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isDark
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'
                        }`}
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {project.downloadUrl && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.downloadUrl, '_blank');
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isDark
                            ? 'bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25'
                            : 'bg-orange-500/10 text-[#ff5500] hover:bg-orange-500/20'
                        }`}
                        title="Télécharger l'APK"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
