import React from 'react';
import { X, Printer, Mail, MapPin, Globe, Briefcase, GraduationCap, Code2, Award } from 'lucide-react';
import { techSkillsData, experienceData, educationData, languagesData, contactInfo } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl rounded-2xl border overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200 ${
          isDark
            ? 'bg-[#0a0d18] border-slate-700/90 shadow-2xl text-slate-200'
            : 'bg-white border-black/[0.08] shadow-2xl text-zinc-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CV Top Toolbar */}
        <div
          className={`flex items-center justify-between p-4 border-b print:hidden ${
            isDark
              ? 'border-slate-800 bg-[#060812]'
              : 'border-black/[0.06] bg-[#f8f7f4]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`font-mono-code text-xs font-bold px-2.5 py-1 rounded border ${
                isDark
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-orange-500/10 text-[#ff5500] border-orange-500/25'
              }`}
            >
              DOCUMENT // CV OFFICIEL
            </span>
            <span
              className={`text-xs font-mono-code hidden sm:inline ${
                isDark ? 'text-slate-400' : 'text-zinc-500 font-medium'
              }`}
            >
              KONEX DEV — Full-Stack Developer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-black/[0.08]'
              }`}
              title="Imprimer / Enregistrer en PDF"
            >
              <Printer
                className={`w-3.5 h-3.5 ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              />
              <span>Imprimer / PDF</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-zinc-100 border-black/[0.06] text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Canvas */}
        <div
          className={`p-6 sm:p-10 max-h-[82vh] overflow-y-auto space-y-8 font-sans ${
            isDark ? 'bg-[#0a0d18]' : 'bg-white'
          }`}
        >
          
          {/* Header */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${
              isDark ? 'border-slate-800' : 'border-black/[0.08]'
            }`}
          >
            <div>
              <h1
                className={`font-syne text-3xl sm:text-4xl font-extrabold ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                KONEX DEV
              </h1>
              <div
                className={`text-sm font-mono-code font-bold uppercase tracking-wider mt-1 ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              >
                DÉVELOPPEUR WEB & FULL-STACK
              </div>
              <p
                className={`text-xs mt-2 max-w-lg leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-zinc-600'
                }`}
              >
                Spécialisé en architectures web modernes (React, TypeScript, Node.js, PHP/Laravel, PostgreSQL, Tailwind).
              </p>
            </div>

            <div
              className={`text-xs font-mono-code space-y-1.5 p-4 rounded-xl border ${
                isDark
                  ? 'bg-[#060812] border-slate-800/80 text-slate-400'
                  : 'bg-zinc-50 border-black/[0.06] text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail
                  className={`w-3.5 h-3.5 ${
                    isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                  }`}
                />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                  }`}
                />
                <span>Madagascar (Full Remote Disponible)</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe
                  className={`w-3.5 h-3.5 ${
                    isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                  }`}
                />
                <span>github.com/Konex-Boom</span>
              </div>
            </div>
          </div>

          {/* Expériences */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase
                className={`w-4 h-4 ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              />
              <h2
                className={`font-syne text-base sm:text-lg font-bold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Expériences Professionnelles
              </h2>
            </div>

            <div className="space-y-5">
              {experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? 'bg-[#060812] border-slate-800'
                      : 'bg-zinc-50/70 border-black/[0.06]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3
                      className={`font-bold text-sm ${
                        isDark ? 'text-slate-100' : 'text-zinc-900'
                      }`}
                    >
                      {exp.role}{' '}
                      <span
                        className={`font-normal ${
                          isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                        }`}
                      >
                        @ {exp.company}
                      </span>
                    </h3>
                    <span
                      className={`font-mono-code text-[11px] px-2 py-0.5 rounded ${
                        isDark
                          ? 'bg-slate-900 text-slate-400'
                          : 'bg-zinc-200/80 text-zinc-700 font-medium'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className={`text-xs mb-2.5 leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-zinc-600'
                    }`}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code ${
                          isDark
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-white border border-black/[0.06] text-zinc-700 font-medium'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap
                className={`w-4 h-4 ${
                  isDark ? 'text-purple-400' : 'text-orange-600'
                }`}
              />
              <h2
                className={`font-syne text-base sm:text-lg font-bold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Formation & Diplômes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? 'bg-[#060812] border-slate-800'
                      : 'bg-zinc-50/70 border-black/[0.06]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      className={`font-bold text-sm ${
                        isDark ? 'text-slate-100' : 'text-zinc-900'
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      className={`font-mono-code text-[10px] font-semibold ${
                        isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                      }`}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-mono-code mb-2 ${
                      isDark ? 'text-slate-400' : 'text-zinc-500'
                    }`}
                  >
                    {edu.institution}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-zinc-600'
                    }`}
                  >
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences Techniques & Langues */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t ${
              isDark ? 'border-slate-800' : 'border-black/[0.08]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2
                  className={`w-4 h-4 ${
                    isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                  }`}
                />
                <h3
                  className={`font-syne text-sm font-bold uppercase ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  Arsenal Technique
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techSkillsData.map((skill) => (
                  <span
                    key={skill.id}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono-code border ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-200'
                        : 'bg-zinc-100 border-black/[0.06] text-zinc-800'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award
                  className={`w-4 h-4 ${
                    isDark ? 'text-purple-400' : 'text-orange-600'
                  }`}
                />
                <h3
                  className={`font-syne text-sm font-bold uppercase ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  Langues & Qualités
                </h3>
              </div>
              <div className="space-y-1.5 text-xs font-mono-code">
                {languagesData.map((l, i) => (
                  <div
                    key={i}
                    className={`flex justify-between ${
                      isDark ? 'text-slate-300' : 'text-zinc-700'
                    }`}
                  >
                    <span>
                      {l.flag} {l.name}
                    </span>
                    <span
                      className={`font-semibold ${
                        isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                      }`}
                    >
                      {l.level}
                    </span>
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
