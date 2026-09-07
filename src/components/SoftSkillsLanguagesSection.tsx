import React from 'react';
import {
  Brain,
  Users,
  Compass,
  CalendarCheck,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Globe,
} from 'lucide-react';
import { softSkillsData, languagesData } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';

export const SoftSkillsLanguagesSection: React.FC = () => {
  const { isDark } = useTheme();

  const getSoftSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`} />;
      case 'Users':
        return <Users className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-orange-500'}`} />;
      case 'Compass':
        return <Compass className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />;
      case 'CalendarCheck':
        return <CalendarCheck className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-amber-600'}`} />;
      case 'MessageSquare':
        return <MessageSquare className={`w-5 h-5 ${isDark ? 'text-sky-400' : 'text-orange-500'}`} />;
      case 'ShieldCheck':
        return <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />;
      case 'Sparkles':
        return <Sparkles className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />;
      default:
        return <Sparkles className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-[#ff5500]'}`} />;
    }
  };

  return (
    <section
      id="soft-skills"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <div
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
            06 // HUMAN & COGNITIVE SKILLS
          </span>
          <span
            className={`h-[1px] w-8 ${
              isDark ? 'bg-cyan-500/40' : 'bg-orange-500/40'
            }`}
          />
        </div>
        <h2
          className={`font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          QUALITÉS & LANGUES
        </h2>
        <p
          className={`text-sm sm:text-base mt-1 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-zinc-600'
          }`}
        >
          Aptitudes humaines, rigueur méthodologique et compétences linguistiques pour des collaborations internationales.
        </p>
      </div>

      {/* Part 1: Soft Skills Grid */}
      <div className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {softSkillsData.map((item, index) => (
            <div
              key={item.id}
              className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800/90 hover:border-cyan-500/50 shadow-lg'
                  : 'bg-white border-black/[0.07] hover:border-orange-500/40 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(255,85,0,0.06)]'
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform ${
                    isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-orange-500/[0.06] border-orange-500/20'
                  }`}
                >
                  {getSoftSkillIcon(item.icon)}
                </div>
                <h3
                  className={`font-syne text-base font-bold transition-colors mb-2 ${
                    isDark
                      ? 'text-white group-hover:text-cyan-300'
                      : 'text-zinc-900 group-hover:text-[#ff5500]'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-zinc-600'
                  }`}
                >
                  {item.description}
                </p>
              </div>
              <div
                className={`mt-4 pt-2 border-t font-mono-code text-[10px] text-right ${
                  isDark
                    ? 'border-slate-800/60 text-slate-500'
                    : 'border-black/[0.05] text-zinc-400'
                }`}
              >
                QUALITÉ #0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Languages Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Globe
            className={`w-4 h-4 ${
              isDark ? 'text-purple-400' : 'text-[#ff5500]'
            }`}
          />
          <span
            className={`text-xs font-mono-code uppercase font-semibold ${
              isDark ? 'text-purple-400' : 'text-[#ff5500]'
            }`}
          >
            // MAÎTRISE LINGUISTIQUE (LANGUES)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {languagesData.map((lang, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border transition-all group ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800/90 hover:border-purple-500/50 shadow-xl'
                  : 'bg-white border-black/[0.07] hover:border-orange-500/40 shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(255,85,0,0.08)]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{lang.flag}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-mono-code border ${
                    isDark
                      ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      : 'bg-orange-500/10 text-[#ff5500] border-orange-500/25'
                  }`}
                >
                  {lang.badge}
                </span>
              </div>

              <h3
                className={`font-syne text-xl font-bold transition-colors ${
                  isDark
                    ? 'text-white group-hover:text-purple-300'
                    : 'text-zinc-900 group-hover:text-[#ff5500]'
                }`}
              >
                {lang.name}
              </h3>
              <p
                className={`text-xs font-mono-code mb-4 mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-zinc-500'
                }`}
              >
                {lang.level}
              </p>

              {/* Progress Bar */}
              <div
                className={`w-full rounded-full h-1.5 overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-zinc-200'
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isDark
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                      : 'bg-gradient-to-r from-[#ff5500] to-amber-500'
                  }`}
                  style={{ width: `${lang.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
