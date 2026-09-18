import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon, Cpu } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const Navbar = ({ siteData }) => {
  const { themeMode, toggleTheme } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Connect', href: '#connect' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-theme-bg/85 backdrop-blur-xl border-b border-theme-border shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo / Monogram */}
        <a
          href="#"
          className="group flex items-center gap-3 font-heading text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-950 text-white flex items-center justify-center text-sm font-sans font-extrabold shadow-md border border-white/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-zinc-300" />
          </div>
          <div className="flex flex-col">
            <span className="tracking-tight hover:opacity-80 transition-opacity font-bold text-base md:text-lg leading-tight text-zinc-900 dark:text-white">
              {siteData?.about?.preferredName || 'Vishnu Pranav'}
            </span>
            <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-bold">
              Mechatronics & AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-zinc-900 dark:after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass-panel text-zinc-900 dark:text-white hover:scale-110 active:scale-95 transition-all shadow-xs"
            title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-zinc-200" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-800" />
            )}
          </button>

          {/* CTA Pill Button */}
          <a
            href="#connect"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Nav Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-panel text-theme-text"
            aria-label="Toggle Theme"
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-theme-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-6 pt-4 pb-6 bg-theme-bg/95 backdrop-blur-2xl border-b border-theme-border shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-theme-text py-2 border-b border-theme-border/40"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#connect"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-2.5 px-4 rounded-full bg-theme-accent text-white font-medium text-sm shadow-md"
              >
                Let's Talk ✦
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
