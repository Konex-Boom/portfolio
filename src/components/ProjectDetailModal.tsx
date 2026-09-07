import React, { useState } from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Download } from 'lucide-react';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [activeShot, setActiveShot] = useState(0);

  if (!project) return null;

  const screenshots = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl rounded-2xl border overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-[#0c101d] border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
            : 'bg-white border-black/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.15)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between p-4 sm:p-6 border-b ${
            isDark
              ? 'border-slate-800 bg-[#080c16]'
              : 'border-black/[0.06] bg-[#f8f7f4]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-mono-code text-xs font-bold px-2.5 py-1 rounded border ${
                isDark
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-orange-500/10 text-[#ff5500] border-orange-500/25'
              }`}
            >
              CASE STUDY // {project.number}
            </span>
            <span
              className={`text-xs font-mono-code ${
                isDark ? 'text-slate-400' : 'text-zinc-500 font-medium'
              }`}
            >
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                : 'bg-zinc-100 border-black/[0.06] text-zinc-500 hover:text-zinc-900'
            }`}
            aria-label="Fermer la modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Image */}
          <div
            className={`relative aspect-[16/9] w-full rounded-xl overflow-hidden border ${
              isDark ? 'border-slate-800 bg-slate-950' : 'border-black/[0.08] bg-zinc-100'
            }`}
          >
            <img
              src={screenshots[activeShot]}
              alt={`${project.title} — Capture ${activeShot + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 ${
                isDark ? 'from-[#0c101d]' : 'from-black/40'
              }`}
            />
          </div>

          {/* Screenshot Gallery */}
          {screenshots.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {screenshots.map((shot, i) => (
                <button
                  key={i}
                  onClick={() => setActiveShot(i)}
                  className={`relative w-28 h-16 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    i === activeShot
                      ? isDark
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50'
                        : 'border-[#ff5500] ring-2 ring-orange-500/50'
                      : isDark
                        ? 'border-slate-800 opacity-60 hover:opacity-100'
                        : 'border-black/[0.08] opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Voir la capture ${i + 1}`}
                >
                  <img
                    src={shot}
                    alt={`${project.title} — capture ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2
                className={`font-syne text-2xl sm:text-3xl font-extrabold ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {project.title}
              </h2>
              <p
                className={`font-mono-code text-xs sm:text-sm mt-1 font-semibold ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              >
                {project.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl border text-xs font-mono-code flex items-center gap-2 transition-all ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/50'
                      : 'bg-zinc-100 border-black/[0.08] text-zinc-700 hover:text-zinc-950 hover:border-black/20'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>Dépôt GitHub</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl font-bold text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    isDark
                      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                      : 'bg-[#ff5500] text-white hover:bg-orange-600 shadow-[0_4px_14px_rgba(255,85,0,0.35)]'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Démo Live</span>
                </a>
              )}

              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl font-bold text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                    isDark
                      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                      : 'bg-[#ff5500] text-white hover:bg-orange-600 shadow-[0_4px_14px_rgba(255,85,0,0.35)]'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </a>
              )}
            </div>
          </div>

          {/* Performance Highlight */}
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 ${
              isDark
                ? 'bg-[#080d1a] border-cyan-500/30'
                : 'bg-orange-500/[0.06] border-orange-500/20'
            }`}
          >
            <Sparkles
              className={`w-5 h-5 shrink-0 ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            />
            <div
              className={`text-xs font-mono-code ${
                isDark ? 'text-cyan-300' : 'text-zinc-800'
              }`}
            >
              <strong className={isDark ? 'text-cyan-400' : 'text-[#ff5500]'}>
                Métrique Clé :{' '}
              </strong>
              {project.metrics}
            </div>
          </div>

          {/* Technologies used */}
          <div>
            <span
              className={`text-xs font-mono-code uppercase block mb-2 font-semibold ${
                isDark ? 'text-slate-400' : 'text-zinc-600'
              }`}
            >
              STACK TECHNIQUE UTILISÉE :
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code border ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-zinc-100 border-black/[0.06] text-zinc-700 font-medium'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture & Features */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${
              isDark ? 'border-slate-800' : 'border-black/[0.08]'
            }`}
          >
            <div className="space-y-3">
              <h4
                className={`text-xs font-mono-code uppercase font-bold ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              >
                // VUE D'ENSEMBLE DU PROJET
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                {project.caseStudy.overview}
              </p>
              <div
                className={`p-3 rounded-lg border text-xs ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
                }`}
              >
                <strong
                  className={`block mb-1 ${
                    isDark ? 'text-slate-200' : 'text-zinc-900'
                  }`}
                >
                  Architecture :
                </strong>
                {project.caseStudy.architecture}
              </div>
            </div>

            <div className="space-y-3">
              <h4
                className={`text-xs font-mono-code uppercase font-bold ${
                  isDark ? 'text-purple-400' : 'text-orange-600'
                }`}
              >
                // FONCTIONNALITÉS CLÉS
              </h4>
              <div className="space-y-2">
                {project.caseStudy.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 text-xs ${
                      isDark ? 'text-slate-300' : 'text-zinc-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isDark ? 'text-purple-400' : 'text-[#ff5500]'
                      }`}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
