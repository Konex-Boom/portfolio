import React, { useState } from 'react';
import { Terminal, Download, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
  onNavigate: (sectionId: string) => void;
  onOpenCV: () => void;
}

const navItems = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À Propos' },
  { id: 'tech-arsenal', label: 'Arsenal Tech' },
  { id: 'projects', label: 'Projets' },
  { id: 'experiences', label: 'Expériences' },
  { id: 'formation', label: 'Formation' },
  { id: 'soft-skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isScrolled,
  onNavigate,
  onOpenCV,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'py-3 bg-[#05070f]/90 backdrop-blur-md border-b border-slate-800/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'py-3 bg-[#f4f3f0]/90 backdrop-blur-md border-b border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
        >
          {isDark ? (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,242,254,0.4)] transition-all">
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_4px_12px_rgba(255,85,0,0.35)] flex items-center justify-center group-hover:scale-105 transition-all">
              <Terminal className="w-4 h-4 text-white" />
            </div>
          )}
          <div className="flex flex-col">
            <span
              className={`font-syne text-sm font-extrabold tracking-wider transition-colors ${
                isDark
                  ? 'text-white group-hover:text-cyan-400'
                  : 'text-zinc-900 group-hover:text-[#ff5500]'
              }`}
            >
              KONEX DEV
            </span>
            <span
              className={`font-mono-code text-[9px] uppercase tracking-widest ${
                isDark ? 'text-slate-400' : 'text-zinc-500 font-semibold'
              }`}
            >
              (FULL-STACK)
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden lg:flex items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-sm transition-all ${
            isDark
              ? 'bg-[#0c101d]/70 border border-slate-800/80 shadow-md'
              : 'bg-white/85 border border-black/[0.06] shadow-[0_4px_15px_rgba(0,0,0,0.04)]'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative px-3 py-1 text-xs font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-cyan-300 font-semibold bg-cyan-500/10 shadow-[0_0_10px_rgba(0,242,254,0.15)] border border-cyan-500/30'
                      : 'text-[#ff5500] font-bold bg-orange-500/10 shadow-[0_2px_8px_rgba(255,85,0,0.15)]'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.04]'
                }`}
              >
                {item.label}
                {isActive && !isDark && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#ff5500] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA Actions & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-slate-900/90 border-slate-700/80 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 shadow-sm'
                : 'bg-white border-black/[0.08] text-zinc-700 hover:text-[#ff5500] hover:border-orange-500/40 shadow-sm'
            }`}
            title={isDark ? 'Passer en Mode Clair (Neumorphic Soft Tech)' : 'Passer en Mode Sombre (Cyberpunk HUD)'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 animate-in spin-in-90 duration-200" />
            ) : (
              <Moon className="w-4 h-4 animate-in spin-in-90 duration-200" />
            )}
          </button>

          {/* CV Button */}
          <button
            onClick={onOpenCV}
            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/60 text-slate-200 hover:text-white shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 shadow-md'
            }`}
          >
            <Download
              className={`w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform ${
                isDark ? 'text-cyan-400' : 'text-amber-400'
              }`}
            />
            <span>CV</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={() => handleLinkClick('contact')}
            className={`group flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#ff4400] hover:to-[#ff6600] text-white shadow-[0_4px_16px_rgba(255,85,0,0.35)]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile Hamburger & Theme Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border text-xs ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400'
                : 'bg-white border-black/[0.08] text-zinc-700'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenCV}
            className={`p-2 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-cyan-400'
                : 'bg-zinc-900 border-zinc-800 text-white'
            }`}
            title="Consulter le CV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border focus:outline-none cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-black/[0.08] text-zinc-800 hover:text-black'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 pt-3 pb-6 border-b shadow-2xl animate-in slide-in-from-top-2 duration-200 ${
            isDark ? 'bg-[#090d18] border-slate-800' : 'bg-[#f4f3f0] border-black/[0.08]'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? isDark
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'bg-orange-500/15 text-[#ff5500] font-bold border border-orange-500/30'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-800/60'
                      : 'text-zinc-700 hover:bg-black/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div
              className={`pt-3 mt-2 border-t flex gap-2 ${
                isDark ? 'border-slate-800' : 'border-black/[0.08]'
              }`}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCV();
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 ${
                  isDark ? 'bg-slate-800 text-slate-200' : 'bg-zinc-900 text-white'
                }`}
              >
                <Download
                  className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-amber-400'}`}
                />
                <span>Télécharger CV</span>
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isDark
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-[#ff5500] text-white shadow-md'
                }`}
              >
                <span>Me Contacter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

