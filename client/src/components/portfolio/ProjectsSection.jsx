import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, RefreshCw, FolderGit2, ArrowRight, Bot, Cpu, HeartPulse, Brain, Radio } from 'lucide-react';
import { api } from '../../services/api';

import { DEFAULT_SITE_DATA } from '../../context/siteDefaults';

const PROJECT_ICONS = {
  LearnBeyond: Brain,
  LearnLoop: Bot,
  'Secure AI Health Companion': HeartPulse,
  'Robocon 2026 R2 Robot': Cpu,
  LAURA: Radio
};

export const ProjectsSection = ({ siteData }) => {
  const username = siteData?.github?.username || DEFAULT_SITE_DATA.github.username;
  const customProjects = (siteData?.customProjects && siteData.customProjects.length > 0)
    ? siteData.customProjects
    : DEFAULT_SITE_DATA.customProjects;
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'github'

  const fetchRepos = async () => {
    try {
      setLoading(true);
      const data = await api.getGitHubRepos(username);
      setGithubRepos(data);
    } catch (err) {
      console.error('Error fetching repos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [username]);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-theme-border relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-900/80 text-[11px] font-mono font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase mb-3 backdrop-blur-md shadow-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Robotics, Software & AI Portfolio</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Featured Multidisciplinary Projects
          </h2>
        </div>

        {/* Tab switcher: Featured vs GitHub */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/90 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'featured'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Core Projects ({customProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Stream</span>
          </button>
        </div>
      </div>

      {/* Featured Core Projects List */}
      {activeTab === 'featured' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customProjects.map((proj, idx) => {
            const Icon = PROJECT_ICONS[proj.name] || FolderGit2;
            return (
              <motion.article
                key={proj.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex flex-col justify-between p-7 rounded-3xl glass-card relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-zinc-200 dark:border-zinc-800"
              >
                {/* Glowing Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-400 via-zinc-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Icon + Type Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-xs border border-zinc-200 dark:border-zinc-700/60">
                      <Icon className="w-6 h-6" />
                    </div>
                    {proj.type && (
                      <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                        {proj.type}
                      </span>
                    )}
                  </div>

                  {/* Title & Role */}
                  <div className="mb-3">
                    <h3 className="font-heading text-xl font-bold text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {proj.name}
                    </h3>
                    {proj.role && (
                      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-semibold">
                        {proj.role}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
                    {proj.description}
                  </p>

                  {/* Tech Badges */}
                  {proj.topics && proj.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.topics.map((topic) => (
                        <span
                          key={topic}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* GitHub Live Stream Grid */}
      {activeTab === 'github' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              Live repositories for <strong className="text-zinc-900 dark:text-zinc-100">@{username}</strong>
            </span>
            <button
              onClick={fetchRepos}
              disabled={loading}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-all disabled:opacity-50"
              title="Refresh Repositories"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="p-6 rounded-2xl glass-card animate-pulse h-48 border border-zinc-200 dark:border-zinc-800" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubRepos.map((repo, idx) => (
                <article
                  key={repo.id || idx}
                  className="group p-6 rounded-2xl glass-card flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                      >
                        {repo.name}
                      </a>
                      <div className="flex items-center gap-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700/60">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-4 leading-relaxed">
                      {repo.description || 'Public repository.'}
                    </p>
                    {repo.language && (
                      <div className="mb-4">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 font-semibold">
                          {repo.language}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar: Site View / Repository Link */}
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between mt-auto">
                    <a
                      href={repo.html_url || `https://github.com/${username}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Repository</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <div className="flex items-center gap-1.5">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
                          title="Live Deployment / Site"
                        >
                          Live Site ↗
                        </a>
                      )}
                      <a
                        href={repo.html_url || `https://github.com/${username}/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
                        aria-label={`Open repository ${repo.name}`}
                        title="Open GitHub Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
