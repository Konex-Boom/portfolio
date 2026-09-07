import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  Sparkles,
  Terminal,
  MessageSquare,
} from 'lucide-react';
import { contactInfo } from '../data/konexData';
import { useTheme } from '../context/ThemeContext';

export const ContactSection: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section
      id="contact"
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
            07 // INITIALIZE TRANSMISSION
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
          CRÉONS QUELQUE CHOSE D'EXCEPTIONNEL.
        </h2>
        <p
          className={`text-sm sm:text-base mt-1 max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-zinc-600'
          }`}
        >
          Vous avez un projet innovant, un besoin d'architecture full-stack ou une opportunité de collaboration ? Échangeons dès maintenant.
        </p>
      </motion.div>

      {/* Main Grid: Left Direct Coordinates, Right Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Direct Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-4"
        >
          
          {/* Email Quick Copy Card */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            className={`p-6 rounded-2xl border transition-all group ${
              isDark
                ? 'bg-[#0c101d] border-slate-800/90 hover:border-cyan-500/50 shadow-xl'
                : 'bg-white border-black/[0.07] hover:border-orange-500/40 shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(255,85,0,0.08)]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isDark
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-orange-500/10 border-orange-500/25 text-[#ff5500]'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span
                    className={`text-[10px] font-mono-code uppercase block ${
                      isDark ? 'text-slate-500' : 'text-zinc-400 font-semibold'
                    }`}
                  >
                    EMAIL DIRECT
                  </span>
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isDark
                        ? 'text-slate-200 group-hover:text-cyan-300'
                        : 'text-zinc-900 group-hover:text-[#ff5500]'
                    }`}
                  >
                    {contactInfo.email}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(contactInfo.email, 'email')}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400'
                    : 'bg-zinc-100 border-black/[0.05] text-zinc-600 hover:text-[#ff5500]'
                }`}
                title="Copier l'adresse email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>
            {copiedField === 'email' && (
              <span
                className={`text-[10px] font-mono-code block text-right font-bold ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                ✓ Email copié dans le presse-papier !
              </span>
            )}
          </motion.div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-xl border flex items-center gap-3 group transition-all ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50'
                  : 'bg-white border-black/[0.07] hover:border-orange-500/40 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isDark
                    ? 'bg-slate-900 text-slate-400 group-hover:text-white'
                    : 'bg-zinc-100 text-zinc-600 group-hover:text-zinc-900'
                }`}
              >
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`text-[10px] font-mono-code block ${
                    isDark ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  GITHUB
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isDark
                      ? 'text-slate-300 group-hover:text-cyan-400'
                      : 'text-zinc-800 group-hover:text-[#ff5500]'
                  }`}
                >
                  Konex-Boom
                </span>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-xl border flex items-center gap-3 group transition-all ${
                isDark
                  ? 'bg-[#0c101d] border-slate-800 hover:border-cyan-500/50'
                  : 'bg-white border-black/[0.07] hover:border-orange-500/40 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isDark
                    ? 'bg-slate-900 text-slate-400 group-hover:text-white'
                    : 'bg-zinc-100 text-zinc-600 group-hover:text-zinc-900'
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`text-[10px] font-mono-code block ${
                    isDark ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  LINKEDIN
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isDark
                      ? 'text-slate-300 group-hover:text-cyan-400'
                      : 'text-zinc-800 group-hover:text-[#ff5500]'
                  }`}
                >
                  konexdev
                </span>
              </div>
            </motion.a>
          </div>

        </motion.div>

        {/* Right Column: Contact Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className={`p-6 sm:p-8 rounded-2xl border space-y-5 ${
              isDark
                ? 'bg-[#0c101d] border-slate-800/90 shadow-2xl'
                : 'bg-white border-black/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.04)]'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                isDark ? 'border-slate-800/70' : 'border-black/[0.06]'
              }`}
            >
              <span
                className={`text-xs font-mono-code font-bold uppercase ${
                  isDark ? 'text-cyan-400' : 'text-[#ff5500]'
                }`}
              >
                // FORMULAIRE DE TRANSMISSION
              </span>
              <span
                className={`text-[10px] font-mono-code ${
                  isDark ? 'text-slate-500' : 'text-zinc-400 font-medium'
                }`}
              >
                ENCRYPTED // TLS 1.3
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-xs font-mono-code uppercase mb-1.5 ${
                    isDark ? 'text-slate-400' : 'text-zinc-600 font-semibold'
                  }`}
                >
                  Votre Nom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all font-sans ${
                    isDark
                      ? 'bg-[#05070f] border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-200 placeholder-slate-600'
                      : 'bg-zinc-50/80 border-black/[0.08] focus:border-[#ff5500] focus:bg-white focus:outline-none text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-mono-code uppercase mb-1.5 ${
                    isDark ? 'text-slate-400' : 'text-zinc-600 font-semibold'
                  }`}
                >
                  Votre Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Ex: contact@entreprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all font-sans ${
                    isDark
                      ? 'bg-[#05070f] border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-200 placeholder-slate-600'
                      : 'bg-zinc-50/80 border-black/[0.08] focus:border-[#ff5500] focus:bg-white focus:outline-none text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-xs font-mono-code uppercase mb-1.5 ${
                  isDark ? 'text-slate-400' : 'text-zinc-600 font-semibold'
                }`}
              >
                Sujet / Type de projet
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Développement Application Web / SaaS Full-Stack"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all font-sans ${
                  isDark
                    ? 'bg-[#05070f] border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-200 placeholder-slate-600'
                    : 'bg-zinc-50/80 border-black/[0.08] focus:border-[#ff5500] focus:bg-white focus:outline-none text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-mono-code uppercase mb-1.5 ${
                  isDark ? 'text-slate-400' : 'text-zinc-600 font-semibold'
                }`}
              >
                Détails du message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Décrivez vos objectifs, délais et technologies souhaitées..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all font-sans resize-none ${
                  isDark
                    ? 'bg-[#05070f] border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-200 placeholder-slate-600'
                    : 'bg-zinc-50/80 border-black/[0.08] focus:border-[#ff5500] focus:bg-white focus:outline-none text-zinc-900 placeholder-zinc-400'
                }`}
              />
            </div>

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-xl border text-xs font-mono-code flex items-center gap-2 ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
                }`}
              >
                <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Message transmis avec succès ! Je vous répondrai sous 24 heures.</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                isDark
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)]'
                  : 'bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-orange-600 hover:to-[#ff5500] text-white shadow-[0_8px_24px_rgba(255,85,0,0.35)] hover:shadow-[0_12px_28px_rgba(255,85,0,0.45)]'
              }`}
            >
              {isSubmitting ? (
                <span>TRANSMISSION EN COURS...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>ENVOYER LE MESSAGE</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};
