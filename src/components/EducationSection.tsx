import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, CheckCircle2, Calendar } from 'lucide-react';
import { educationData } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';

export const EducationSection: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="formation"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-col mb-12 border-b pb-6 ${
          isDark ? 'border-slate-800/80' : 'border-black/[0.08]'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`font-mono-code text-xs font-bold tracking-[0.2em] ${
              isDark ? 'text-cyan-400' : 'text-[#ff5500]'
            }`}
          >
            05 // ACADEMIC & DEGREES
          </span>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`h-[1px] ${
              isDark ? 'bg-cyan-500/40' : 'bg-orange-500/40'
            }`}
          />
        </div>
        <h2
          className={`font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          FORMATION & DIPLÔMES
        </h2>
        <p
          className={`text-sm sm:text-base mt-1 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-zinc-600'
          }`}
        >
          Fondations académiques en informatique fondamentale et spécialisation continue full-stack.
        </p>
      </motion.div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`group relative rounded-2xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
              isDark
                ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50 shadow-xl hover:shadow-[0_20px_40px_rgba(0,242,254,0.1)]'
                : 'bg-white border-black/[0.07] hover:border-orange-500/40 shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div>
              {/* Header Step Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isDark
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                        : 'bg-orange-500/10 border-orange-500/25 text-[#ff5500]'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-mono-code text-xs font-bold ${
                      isDark ? 'text-cyan-300' : 'text-[#ff5500]'
                    }`}
                  >
                    ÉTAPE 0{index + 1}
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-mono-code px-2.5 py-1 rounded border ${
                    isDark
                      ? 'text-slate-400 bg-slate-900 border-slate-800'
                      : 'text-zinc-600 bg-zinc-100 border-black/[0.05]'
                  }`}
                >
                  <Calendar
                    className={`w-3 h-3 ${
                      isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                    }`}
                  />
                  {edu.period}
                </span>
              </div>

              {/* Degree Title & Institution */}
              <h3
                className={`font-syne text-xl sm:text-2xl font-bold transition-colors mb-1 ${
                  isDark
                    ? 'text-white group-hover:text-cyan-300'
                    : 'text-zinc-900 group-hover:text-[#ff5500]'
                }`}
              >
                {edu.degree}
              </h3>
              <div
                className={`flex items-center gap-2 text-xs font-mono-code mb-4 ${
                  isDark ? 'text-slate-400' : 'text-zinc-500'
                }`}
              >
                <span
                  className={`font-semibold ${
                    isDark ? 'text-slate-300' : 'text-zinc-800'
                  }`}
                >
                  {edu.institution}
                </span>
                <span>•</span>
                <span>{edu.location}</span>
              </div>

              {/* Description */}
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                {edu.description}
              </p>

              {/* Skills checklist */}
              <div className="space-y-2 mb-6">
                <span
                  className={`text-[11px] font-mono-code uppercase block ${
                    isDark ? 'text-slate-500' : 'text-zinc-400 font-semibold'
                  }`}
                >
                  MODULES CLÉS & COMPÉTENCES :
                </span>
                {edu.skillsAcquired.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-2 text-xs ${
                      isDark ? 'text-slate-300' : 'text-zinc-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                      }`}
                    />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Badge */}
            <div
              className={`pt-4 border-t flex items-center justify-between ${
                isDark ? 'border-slate-800/80' : 'border-black/[0.06]'
              }`}
            >
              <span
                className={`text-[11px] font-mono-code font-semibold flex items-center gap-1.5 ${
                  isDark ? 'text-cyan-300' : 'text-[#ff5500]'
                }`}
              >
                <Award
                  className={`w-4 h-4 ${
                    isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                  }`}
                />
                <span>{edu.status}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
