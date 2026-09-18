import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Eye, Sliders, Wrench, Layers, Bot, Brain, Code2, Compass } from 'lucide-react';
import { DEFAULT_SITE_DATA } from '../../context/siteDefaults';

const CATEGORY_ICONS = {
  'Robotics & Autonomous Systems': Bot,
  'Robotics & Autonomous Navigation': Bot,
  'AI / ML & Computer Vision': Brain,
  'Computer Vision & Edge AI': Eye,
  'Embedded Microcontrollers & IoT': Cpu,
  'Embedded Systems & IoT': Cpu,
  'CAD Modeling & Mechanical Design': Compass,
  'Full-Stack & Intelligent Software': Code2,
  'Programming Languages': Terminal,
  'Industrial Automation & PLC': Sliders,
  'Industrial Automation': Sliders,
  'Tools & Development Platforms': Wrench,
  'Tools & Platforms': Wrench
};

export const SkillsSection = ({ siteData }) => {
  const categories = (siteData?.skillsCategories && siteData.skillsCategories.length > 0)
    ? siteData.skillsCategories
    : DEFAULT_SITE_DATA.skillsCategories;

  return (
    <section id="skills" className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto border-t border-theme-border relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-900/80 text-[11px] font-mono font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase mb-3 backdrop-blur-md shadow-xs">
            <Layers className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Technical Capabilities & Stack</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Engineering & Multidisciplinary Skills
          </h2>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = CATEGORY_ICONS[cat.category] || Cpu;
          return (
            <motion.div
              key={cat.category || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl glass-card relative overflow-hidden group hover:-translate-y-1.5 transition-transform border border-zinc-200 dark:border-zinc-800"
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-xs border border-zinc-200 dark:border-zinc-700/60">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-zinc-900 dark:text-white leading-tight">
                  {cat.category}
                </h3>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-100 font-semibold transition-colors hover:border-zinc-500 hover:text-black dark:hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
