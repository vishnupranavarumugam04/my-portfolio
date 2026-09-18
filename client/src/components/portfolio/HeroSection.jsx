import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Cpu, Sparkles, MapPin, Terminal, Award, Code2, Bot, Brain, Sliders, Layers } from 'lucide-react';
import { DEFAULT_SITE_DATA } from '../../context/siteDefaults';

const MULTI_DOMAINS = [
  {
    id: 'robotics',
    label: 'Robotics & Automation',
    headline: 'Autonomous Robotics &',
    highlight: 'Automation Systems.',
    badge: 'ROS 2 & Autonomous Navigation',
    icon: Bot
  },
  {
    id: 'ai-ml',
    label: 'AI / ML & Vision',
    headline: 'Computer Vision & Edge',
    highlight: 'AI / ML Intelligence.',
    badge: 'YOLOv8 & OpenCV Pipelines',
    icon: Brain
  },
  {
    id: 'software',
    label: 'Software Engineering',
    headline: 'Scalable Full-Stack &',
    highlight: 'Intelligent Software.',
    badge: 'Modern Web & Real-Time APIs',
    icon: Code2
  },
  {
    id: 'embedded',
    label: 'Embedded & IoT',
    headline: 'Real-Time Hardware &',
    highlight: 'Embedded Microcontrollers.',
    badge: 'ESP32, Arduino & BLE/IoT',
    icon: Cpu
  },
  {
    id: 'cad',
    label: 'CAD & 3D Design',
    headline: 'Precision Engineering &',
    highlight: 'CAD Mechanical Design.',
    badge: 'Kinematics & 3D Prototyping',
    icon: Sliders
  }
];

export const HeroSection = ({ siteData }) => {
  const hero = siteData?.hero || DEFAULT_SITE_DATA.hero;
  const stats = (siteData?.stats && siteData.stats.length > 0) ? siteData.stats : DEFAULT_SITE_DATA.stats;
  const about = siteData?.about || DEFAULT_SITE_DATA.about;

  const [domainIndex, setDomainIndex] = useState(0);

  // Auto-cycle through disciplines every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDomainIndex((prev) => (prev + 1) % MULTI_DOMAINS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const activeDomain = MULTI_DOMAINS[domainIndex];
  const DomainIcon = activeDomain.icon;

  // 3D Card tilt motion hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 22, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 22, stiffness: 220 });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="relative pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 max-w-6xl mx-auto z-10 scroll-mt-20">
      {/* Top 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Portrait Card with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="relative w-full max-w-sm group cursor-pointer"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-zinc-500/20 via-zinc-400/10 to-transparent rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Portrait Frame */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-theme-surface shadow-2xl transition-transform duration-500">
              <img
                src={hero.imageUrl || DEFAULT_SITE_DATA.hero.imageUrl}
                alt={about.fullName || "Vishnu Pranav Arumugam"}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/avatar.jpg";
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Pill with Dynamic Active Discipline */}
              <div className="absolute top-4 left-4 py-1.5 px-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                <DomainIcon className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
                <span>{activeDomain.label}</span>
              </div>

              {/* Live Status Pill */}
              <div className="absolute bottom-4 left-4 right-4 py-3 px-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-between text-xs font-semibold shadow-xl border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <div className="truncate">
                    <p className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 font-bold">Status</p>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{about.statusBadge || "Available for Robotics & AI Roles"}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-extrabold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider shrink-0">ONLINE</span>
              </div>
            </div>

            {/* Corner Monogram Stamp */}
            <motion.div
              animate={{ rotate: [6, -6, 6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-11 h-11 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-950 text-white flex items-center justify-center text-sm font-bold shadow-xl border-2 border-white/30"
            >
              ✦
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Details */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Top Identity Block: Name & Education moved slightly upper for spacious layout */}
          <div className="flex flex-col items-start -mt-3 sm:-mt-6 mb-5 sm:mb-7">
            {/* Eyebrow Chip */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-900/80 text-[11px] font-mono font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-300 animate-pulse" />
                <span>{hero.eyebrow || "MECHATRONICS ENGINEERING & MULTIDISCIPLINARY AI"}</span>
              </div>
            </div>

            {/* Prominent Full Name */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-zinc-900 dark:text-white mb-2.5">
              {hero.fullName || about.fullName || "Vishnu Pranav Arumugam"}
            </h1>

            {/* Professional Role / Education Subtitle */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
              <span>{about.roleTitle || "3rd-Year Mechatronics Engineering Student | Bannari Amman Institute of Technology"}</span>
            </div>
          </div>

          {/* Dynamic Rotating Statement Headline */}
          <div className="min-h-[54px] sm:min-h-[64px] flex flex-col justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-zinc-900 dark:text-zinc-100"
              >
                <span>Engineering intelligent </span>
                <span
                  className="italic font-serif font-medium underline decoration-zinc-400/60 decoration-wavy underline-offset-8 transition-colors inline-block text-zinc-900 dark:text-white"
                >
                  {activeDomain.highlight}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Body Copy */}
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 max-w-xl font-normal">
            {hero.body || "Passionate engineer combining robotics autonomy (ROS 2), edge AI & computer vision, full-stack software development, embedded microcontrollers (ESP32), and CAD mechanical design to build high-impact real-world solutions."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={hero.ctaPrimary?.url || "#projects"}
              className="btn-shimmer group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>{hero.ctaPrimary?.label || "Explore Projects"}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href={hero.ctaSecondary?.url || "#connect"}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white bg-white/80 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold text-sm shadow-xs backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>{hero.ctaSecondary?.label || "Get in Touch"}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stat Row: 4 Metric Cards */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 md:mt-20 pt-8 border-t border-slate-200/80 dark:border-white/10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id || idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col p-5 rounded-2xl glass-card relative overflow-hidden group cursor-default border border-slate-200/80 dark:border-white/10"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sky-500/15 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-[10px] font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase mb-1.5">
                {stat.label}
              </span>
              <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
