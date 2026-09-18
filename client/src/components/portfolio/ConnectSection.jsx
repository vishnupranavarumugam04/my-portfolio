import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Copy, Check, CheckCircle2, ExternalLink, MessageSquare, MapPin, User, Sparkles } from 'lucide-react';

export const ConnectSection = ({ siteData }) => {
  const about = siteData?.about || {};
  const linkedinUrl = siteData?.linkedin?.profileUrl || 'https://www.linkedin.com/in/vishnupranavarumugam04';
  const githubUsername = siteData?.github?.username || 'vishnupranavarumugam04';
  const [copied, setCopied] = useState(false);

  // Extract vanity name
  const extractLinkedInVanity = (url) => {
    if (!url) return 'vishnupranavarumugam04';
    const match = url.match(/linkedin\.com\/in\/([^/?#]+)/i);
    return match ? match[1] : 'vishnupranavarumugam04';
  };

  const vanityName = extractLinkedInVanity(linkedinUrl);

  const handleCopyEmail = () => {
    if (!about.email) return;
    navigator.clipboard.writeText(about.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="connect" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-theme-border relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Direct Contact Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-900/80 text-[11px] font-mono font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase mb-4 backdrop-blur-md shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Connect & Inquire</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            Let's collaborate on Robotics, Software & AI.
          </h2>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
            Open to technical collaborations, robotics research, autonomous systems development, and engineering internship/placement opportunities.
          </p>

          {/* Location & Status Info */}
          <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-semibold">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-zinc-900 dark:text-white shadow-xs border border-zinc-200 dark:border-zinc-800 font-bold">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>{about.location || "Tamil Nadu, India"}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-zinc-900 dark:text-white shadow-xs border border-zinc-200 dark:border-zinc-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{about.statusBadge || "Available for Opportunities"}</span>
            </span>
          </div>

          {/* Email Copy Card */}
          {about.email && (
            <div className="w-full max-w-md p-4 rounded-2xl glass-card flex items-center justify-between gap-3 mb-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-950 text-white flex items-center justify-center shrink-0 shadow-md border border-white/20">
                  <Mail className="w-5 h-5 text-zinc-200" />
                </div>
                <div className="truncate">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Direct Email</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{about.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 text-zinc-800 dark:text-zinc-200 transition-all text-xs font-bold flex items-center gap-1 shadow-xs border border-zinc-200 dark:border-zinc-700 active:scale-95"
                  title="Copy Email Address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`mailto:${about.email}`}
                  className="p-2.5 rounded-xl bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs"
                  title="Send Email"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 text-xs font-bold text-zinc-900 dark:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xs border border-zinc-200 dark:border-zinc-800"
            >
              <Github className="w-4 h-4" />
              <span>GitHub (@{githubUsername})</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:bg-[#0077b5] hover:text-white text-xs font-bold text-zinc-900 dark:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xs border border-zinc-200 dark:border-zinc-800"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: LinkedIn Official Interactive Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center w-full"
        >
          <div className="w-full max-w-md rounded-3xl p-6 sm:p-7 glass-card border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
            
            {/* Top LinkedIn Cover Header */}
            <div className="relative -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 h-24 bg-gradient-to-r from-zinc-800 via-zinc-900 to-black p-4 flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0077b5] text-white flex items-center justify-center shadow-md">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">LinkedIn Member</span>
              </div>
              <span className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-zinc-300 border border-white/20">
                500+ Connections
              </span>
            </div>

            {/* Profile Avatar & Verified Badge */}
            <div className="relative -mt-12 mb-4 flex items-end justify-between">
              <div className="relative">
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl bg-zinc-800">
                  <img
                    src={(!siteData?.hero?.imageUrl || siteData.hero.imageUrl.includes('unsplash.com')) ? '/avatar.jpg' : siteData.hero.imageUrl}
                    alt={about.fullName || "Vishnu Pranav Arumugam"}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.src = "/avatar.jpg";
                    }}
                  />
                </div>
                {/* Active Indicator */}
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
              </div>

              <div className="text-right pb-1">
                <span className="font-mono text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block">
                  @{vanityName}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-sky-600 dark:text-sky-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>Verified Profile</span>
                </span>
              </div>
            </div>

            {/* User Details */}
            <div className="text-left mb-5">
              <h3 className="font-heading text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight">
                {about.fullName || "Vishnu Pranav Arumugam"}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1.5 leading-snug">
                {about.roleTitle || "3rd-Year Mechatronics Engineering Student | Bannari Amman Institute of Technology"}
              </p>
              <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{about.location || "Tamil Nadu, India"}</span>
              </p>
            </div>

            {/* Discipline Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6 text-left">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold">
                🤖 Robotics & ROS 2
              </span>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold">
                🧠 Edge AI & Vision
              </span>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold">
                ⚡ Embedded Systems
              </span>
            </div>

            {/* Direct LinkedIn Connect Button */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
