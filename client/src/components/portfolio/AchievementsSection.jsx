import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, GraduationCap, MapPin, CheckCircle2, Star } from 'lucide-react';

import { DEFAULT_SITE_DATA } from '../../context/siteDefaults';

export const AchievementsSection = ({ siteData }) => {
  const achievements = (siteData?.achievements && siteData.achievements.length > 0)
    ? siteData.achievements
    : DEFAULT_SITE_DATA.achievements;
  const education = siteData?.education || DEFAULT_SITE_DATA.education;

  return (
    <section id="achievements" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-theme-border relative z-10">
      
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-900/80 text-[11px] font-mono font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase mb-3 backdrop-blur-md shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>Milestones & Education</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Hackathons & Recognition
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Achievements Timeline */}
        <div className="lg:col-span-8 space-y-4">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id || `ach-${idx}-${item.title}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl glass-card flex items-start gap-4 hover:-translate-x-1 transition-transform border border-zinc-200 dark:border-zinc-800"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shrink-0 shadow-xs border border-zinc-200 dark:border-zinc-700/60 mt-0.5">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-heading text-base font-bold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.organization && (
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 font-bold mb-1.5">
                    {item.organization}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Academic Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 p-7 rounded-3xl glass-card border border-zinc-200 dark:border-zinc-800 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-xs border border-zinc-200 dark:border-zinc-700/60">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Education</p>
              <h3 className="font-heading text-lg font-bold text-zinc-900 dark:text-white">Academic Profile</h3>
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="font-mono text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Degree</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">{education.degree || "B.E. Mechatronics Engineering"}</p>
            </div>

            <div>
              <p className="font-mono text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Institution</p>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{education.institution || "Bannari Amman Institute of Technology (BIT)"}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-mono text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Status</p>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">{education.year || "3rd Year (Semester 5)"}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Location</p>
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">{education.location || "Tamil Nadu, India"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
