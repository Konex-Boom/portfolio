import React from 'react';
import { Terminal, Github, Linkedin, Mail, Download, ArrowUp } from 'lucide-react';
import { contactInfo } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCV }) => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative border-t pt-16 pb-12 overflow-hidden transition-colors ${
        isDark
          ? 'border-slate-800/80 bg-[#04060c]'
          : 'border-black/[0.08] bg-[#eeece8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b items-center justify-between ${
            isDark ? 'border-slate-800/60' : 'border-black/[0.06]'
          }`}
        >
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isDark
                    ? 'bg-cyan-500/10 border-cyan-500/40'
                    : 'bg-[#ff5500] border-[#ff5500] text-white shadow-sm'
                }`}
              >
                <Terminal
                  className={`w-4 h-4 ${
                    isDark ? 'text-cyan-400' : 'text-white'
                  }`}
                />
              </div>
              <span
                className={`font-syne text-xl font-extrabold tracking-wider ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                KONEX DEV
              </span>
            </div>
            <div
              className={`font-mono-code text-xs font-semibold tracking-wider uppercase ${
                isDark ? 'text-cyan-400' : 'text-[#ff5500]'
              }`}
            >
              FULL-STACK DEVELOPER
            </div>
            <p
              className={`text-xs sm:text-sm max-w-md leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-zinc-600'
              }`}
            >
              "Building digital experiences with code." Conception d'architectures web pérennes, performantes et intuitives.
            </p>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3 sm:gap-4">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-white'
                  : 'bg-white border-black/[0.08] hover:border-orange-500/50 text-zinc-600 hover:text-[#ff5500] shadow-sm'
              }`}
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-white'
                  : 'bg-white border-black/[0.08] hover:border-orange-500/50 text-zinc-600 hover:text-[#ff5500] shadow-sm'
              }`}
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-white'
                  : 'bg-white border-black/[0.08] hover:border-orange-500/50 text-zinc-600 hover:text-[#ff5500] shadow-sm'
              }`}
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCV}
              className={`px-3.5 py-2 rounded-xl border text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50 text-cyan-400'
                  : 'bg-white border-black/[0.08] hover:border-orange-500/50 text-[#ff5500] shadow-sm'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>

            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                isDark
                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'bg-[#ff5500] text-white hover:bg-orange-600 shadow-[0_4px_14px_rgba(255,85,0,0.35)]'
              }`}
              title="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code ${
            isDark ? 'text-slate-500' : 'text-zinc-500'
          }`}
        >
          <div>
            © {new Date().getFullYear()} KONEX DEV. TOUS DROITS RÉSERVÉS.
          </div>
          <div className="flex items-center gap-4">
            <span>REACT • THREE/CSS 3D • TAILWIND</span>
            <span
              className={`px-2 py-0.5 rounded font-bold ${
                isDark
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'bg-orange-500/10 text-[#ff5500] border border-orange-500/25'
              }`}
            >
              PROD // READY
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
