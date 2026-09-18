import React from 'react';
import { Trophy, Award, Plus, Trash2, GraduationCap, MapPin, Sparkles, Building2, Tag } from 'lucide-react';

export const AchievementsEditor = ({ data, onChange }) => {
  const achievements = data?.achievements || [];
  const education = data?.education || {};

  const handleAddAchievement = () => {
    const newItem = {
      id: `ach-${Date.now()}`,
      title: 'New Hackathon / Recognition Award',
      badge: 'Winner',
      organization: 'Hackathon / Event Organization',
      description: 'Describe the solution, platform, or hardware engineered during this competition.'
    };
    onChange({
      ...data,
      achievements: [newItem, ...achievements]
    });
  };

  const handleUpdateAchievement = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({
      ...data,
      achievements: updated
    });
  };

  const handleRemoveAchievement = (index) => {
    const updated = achievements.filter((_, i) => i !== index);
    onChange({
      ...data,
      achievements: updated
    });
  };

  const handleEducationChange = (field, value) => {
    onChange({
      ...data,
      education: {
        ...education,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 font-heading">
            <Trophy className="w-5 h-5 text-zinc-300" />
            <span>Hackathons & Recognition</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your hackathon milestones, prize recognitions, awards, and academic profile.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddAchievement}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hackathon / Award</span>
        </button>
      </div>

      {/* Hackathons & Awards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-zinc-300" />
            <span>Recorded Milestones ({achievements.length} Boxes)</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Formatted as milestone boxes on your portfolio
          </span>
        </div>

        {achievements.length === 0 ? (
          <div className="p-8 rounded-3xl border border-dashed border-zinc-800 text-center bg-[#15181C]/50">
            <Award className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-300">No hackathons recorded yet</p>
            <p className="text-xs text-zinc-500 mt-1">Click "Add Hackathon / Award" above to add your first achievement.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.map((item, index) => (
              <div
                key={item.id || index}
                className="p-6 rounded-3xl bg-[#15181C] border border-zinc-750 hover:border-zinc-500 transition-all duration-300 shadow-lg space-y-4"
              >
                {/* Box Top Row: Icon + Badge + Delete */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs shrink-0">
                    <Award className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.badge || ''}
                      onChange={(e) => handleUpdateAchievement(index, 'badge', e.target.value)}
                      placeholder="Badge (e.g. Winner, Runner-Up, Advanced)"
                      className="w-full px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-wider focus:outline-none focus:border-zinc-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(index)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors shrink-0"
                    title="Delete Milestone Box"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Title & Organization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                      Award / Hackathon Title
                    </label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleUpdateAchievement(index, 'title', e.target.value)}
                      placeholder="e.g. 1st Prize — BIT Hackathon 2025"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-sm font-bold text-white font-heading placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                      Host Organization / Season / Problem Statement
                    </label>
                    <input
                      type="text"
                      value={item.organization || ''}
                      onChange={(e) => handleUpdateAchievement(index, 'organization', e.target.value)}
                      placeholder="e.g. Robotics & Automation Season 1"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono font-semibold text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                    />
                  </div>
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                    Summary & Recognition Details
                  </label>
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => handleUpdateAchievement(index, 'description', e.target.value)}
                    placeholder="Brief summary of what was built and awarded..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education & Academic Profile Section */}
      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5 pt-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-200 flex items-center justify-center border border-zinc-700/60 shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-100 font-heading">Academic Profile</h4>
            <p className="text-xs text-zinc-400">Institutional degrees, current semester, and academic location</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Degree & Specialization
            </label>
            <input
              type="text"
              value={education.degree || ''}
              onChange={(e) => handleEducationChange('degree', e.target.value)}
              placeholder="e.g. Bachelor’s Degree in Mechatronics Engineering"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Institution / College
            </label>
            <input
              type="text"
              value={education.institution || ''}
              onChange={(e) => handleEducationChange('institution', e.target.value)}
              placeholder="e.g. Bannari Amman Institute of Technology (BIT)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Academic Year / Status
            </label>
            <input
              type="text"
              value={education.year || ''}
              onChange={(e) => handleEducationChange('year', e.target.value)}
              placeholder="e.g. 3rd Year (Semester 5)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-zinc-500" />
              <span>Campus Location</span>
            </label>
            <input
              type="text"
              value={education.location || ''}
              onChange={(e) => handleEducationChange('location', e.target.value)}
              placeholder="e.g. Tamil Nadu, India"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
