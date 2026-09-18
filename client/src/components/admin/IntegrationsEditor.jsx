import React from 'react';
import { Github, Linkedin, Plus, Trash2, FolderGit2, Star, ExternalLink, ShieldCheck, Brain, Bot, HeartPulse, Cpu, Radio, Sparkles } from 'lucide-react';

const PROJECT_ICONS = {
  LearnBeyond: Brain,
  LearnLoop: Bot,
  'Secure AI Health Companion': HeartPulse,
  'Robocon 2026 R2 Robot': Cpu,
  LAURA: Radio
};

export const IntegrationsEditor = ({ data, onChange }) => {
  const github = data?.github || {};
  const linkedin = data?.linkedin || {};
  const customProjects = data?.customProjects || [];

  const handleGitHubChange = (field, value) => {
    onChange({
      ...data,
      github: {
        ...github,
        [field]: value
      }
    });
  };

  const handleLinkedInChange = (field, value) => {
    onChange({
      ...data,
      linkedin: {
        ...linkedin,
        [field]: value
      }
    });
  };

  const handleAddCustomProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: 'New Multidisciplinary Project',
      type: 'AI & Robotics System',
      role: 'Lead Developer',
      description: 'Engineered an intelligent hardware and software solution with edge AI and real-time processing.',
      html_url: `https://github.com/${github.username || 'vishnupranavarumugam04'}`,
      stargazers_count: 10,
      language: 'C++',
      topics: ['robotics', 'ai', 'embedded']
    };
    onChange({
      ...data,
      customProjects: [newProj, ...customProjects]
    });
  };

  const handleUpdateCustomProject = (index, field, value) => {
    const updated = [...customProjects];
    if (field === 'topics') {
      updated[index] = {
        ...updated[index],
        topics: typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : value
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: field === 'stargazers_count' ? Number(value) || 0 : value
      };
    }
    onChange({
      ...data,
      customProjects: updated
    });
  };

  const handleRemoveCustomProject = (index) => {
    const updated = customProjects.filter((_, i) => i !== index);
    onChange({
      ...data,
      customProjects: updated
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
            <FolderGit2 className="w-5 h-5 text-zinc-300" />
            <span>Projects & GitHub Integrations</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Edit your featured multidisciplinary projects directly inside portfolio-styled card boxes.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCustomProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project Box</span>
        </button>
      </div>

      {/* GitHub & LinkedIn Connection Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* GitHub Box */}
        <div className="p-5 rounded-2xl bg-[#16191D] border border-zinc-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">GitHub Integration</h4>
                <p className="text-[10px] text-zinc-400">Live stream repository source</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              Live Stream
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-semibold text-zinc-400 mb-1">
              GitHub Username
            </label>
            <input
              type="text"
              value={github.username || ''}
              onChange={(e) => handleGitHubChange('username', e.target.value)}
              placeholder="vishnupranavarumugam04"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>

        {/* LinkedIn Box */}
        <div className="p-5 rounded-2xl bg-[#16191D] border border-zinc-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">LinkedIn Profile</h4>
                <p className="text-[10px] text-zinc-400">Connect section profile badge</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              Verified
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-semibold text-zinc-400 mb-1">
              LinkedIn Public Profile URL
            </label>
            <input
              type="url"
              value={linkedin.profileUrl || ''}
              onChange={(e) => handleLinkedInChange('profileUrl', e.target.value)}
              placeholder="https://www.linkedin.com/in/vishnupranavarumugam04"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* Featured Core Projects in Portfolio Box Style */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-zinc-300" />
            <span>Core Projects ({customProjects.length} Boxes)</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Formatted exactly as shown on the portfolio
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customProjects.map((proj, idx) => {
            const Icon = PROJECT_ICONS[proj.name] || FolderGit2;
            const topicsString = Array.isArray(proj.topics) ? proj.topics.join(', ') : (proj.topics || '');
            return (
              <div
                key={proj.id || idx}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#15181C] border border-zinc-750 hover:border-zinc-500 transition-all duration-300 shadow-lg space-y-4"
              >
                {/* Top Bar: Icon + Category Badge + Remove Button */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-800 text-white flex items-center justify-center shadow-xs border border-zinc-700/60 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={proj.type || ''}
                      onChange={(e) => handleUpdateCustomProject(idx, 'type', e.target.value)}
                      placeholder="Category Tag (e.g. AI-POWERED PLATFORM)"
                      className="w-full px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-wider focus:outline-none focus:border-zinc-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveCustomProject(idx)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors shrink-0"
                    title="Delete Project Box"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Title Input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => handleUpdateCustomProject(idx, 'name', e.target.value)}
                    placeholder="Project Name (e.g. LearnBeyond)"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-750 bg-zinc-950 text-base font-bold text-white font-heading placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                  />
                </div>

                {/* Project Role / Subtitle Input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">Role / Subtitle</label>
                  <input
                    type="text"
                    value={proj.role || ''}
                    onChange={(e) => handleUpdateCustomProject(idx, 'role', e.target.value)}
                    placeholder="Role (e.g. Developer / Team Member)"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono font-semibold text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">Project Summary</label>
                  <textarea
                    rows={3}
                    value={proj.description || ''}
                    onChange={(e) => handleUpdateCustomProject(idx, 'description', e.target.value)}
                    placeholder="Describe key technologies, hardware, and algorithms used..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 leading-relaxed"
                  />
                </div>

                {/* Tech Tags Input */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={topicsString}
                    onChange={(e) => handleUpdateCustomProject(idx, 'topics', e.target.value)}
                    placeholder="e.g. ai, ros2, embedded, python, react"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                  />
                </div>

                {/* Repository URL Input */}
                <div className="pt-2 border-t border-zinc-800">
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">GitHub Repo / Live Deployment URL</label>
                  <input
                    type="url"
                    value={proj.html_url || ''}
                    onChange={(e) => handleUpdateCustomProject(idx, 'html_url', e.target.value)}
                    placeholder="https://github.com/vishnupranavarumugam04/..."
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
