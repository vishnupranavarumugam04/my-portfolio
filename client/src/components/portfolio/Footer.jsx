import React from 'react';
import { ArrowUp, Cpu, Sun, Moon } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const Footer = ({ siteData }) => {
  const { themeMode, toggleTheme } = useSite();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-theme-border bg-theme-surface/40 py-12 px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold shadow-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight text-zinc-900 dark:text-white">
            {siteData?.about?.fullName || 'Vishnu Pranav Arumugam'}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">
            &copy; {currentYear} • Multidisciplinary Engineering
          </span>
        </div>

        {/* Quick Nav, Theme Toggle & Back to top */}
        <div className="flex items-center gap-5 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
          <a href="#achievements" className="hover:text-black dark:hover:text-white transition-colors">Achievements</a>
          <a href="#connect" className="hover:text-black dark:hover:text-white transition-colors">Connect</a>
          

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-panel hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white transition-all shadow-xs border border-zinc-200 dark:border-zinc-800"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
