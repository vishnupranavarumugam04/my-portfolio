import React from 'react';
import { Layers, Plus, Trash2, Tag, Wrench, Cpu, Eye, Compass, Code2, Terminal, Sliders, Brain, Bot } from 'lucide-react';

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
  'Tools & Platforms': Wrench
};

export const SkillsEditor = ({ data, onChange }) => {
  const skillsCategories = data?.skillsCategories || [];

  const handleAddCategory = () => {
    const newCategory = {
      category: 'New Skills Category',
      skills: ['Skill 1', 'Skill 2', 'Skill 3']
    };
    onChange({
      ...data,
      skillsCategories: [...skillsCategories, newCategory]
    });
  };

  const handleUpdateCategoryName = (index, name) => {
    const updated = [...skillsCategories];
    updated[index] = {
      ...updated[index],
      category: name
    };
    onChange({
      ...data,
      skillsCategories: updated
    });
  };

  const handleUpdateSkillsList = (index, skillsString) => {
    const updated = [...skillsCategories];
    const parsedSkills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    updated[index] = {
      ...updated[index],
      skills: parsedSkills
    };
    onChange({
      ...data,
      skillsCategories: updated
    });
  };

  const handleRemoveCategory = (index) => {
    const updated = skillsCategories.filter((_, i) => i !== index);
    onChange({
      ...data,
      skillsCategories: updated
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
            <Layers className="w-5 h-5 text-zinc-300" />
            <span>Technical Capabilities & Skills</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Add, remove, or edit skill categories and individual tech badges displayed on the portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill Category</span>
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Tag className="w-4 h-4 text-zinc-300" />
            <span>Active Categories ({skillsCategories.length} Groups)</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Formatted to match your portfolio skill cards
          </span>
        </div>

        {skillsCategories.length === 0 ? (
          <div className="p-8 rounded-3xl border border-dashed border-zinc-800 text-center bg-[#15181C]/50">
            <Layers className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-300">No skill categories added</p>
            <p className="text-xs text-zinc-500 mt-1">Click "Add Skill Category" above to create your first card.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsCategories.map((cat, idx) => {
              const Icon = CATEGORY_ICONS[cat.category] || Cpu;
              const skillsString = Array.isArray(cat.skills) ? cat.skills.join(', ') : (cat.skills || '');
              return (
                <div
                  key={cat.category || idx}
                  className="p-6 rounded-3xl bg-[#15181C] border border-zinc-750 hover:border-zinc-500 transition-all duration-300 shadow-lg space-y-4"
                >
                  {/* Card Header: Icon + Category Name + Delete Button */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={cat.category || ''}
                        onChange={(e) => handleUpdateCategoryName(idx, e.target.value)}
                        placeholder="Category Name (e.g. Robotics & Autonomous Systems)"
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-750 bg-zinc-950 text-sm font-bold text-white font-heading placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(idx)}
                      className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors shrink-0"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Skills Comma Separated Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                      Skills & Technologies (comma separated)
                    </label>
                    <textarea
                      rows={3}
                      value={skillsString}
                      onChange={(e) => handleUpdateSkillsList(idx, e.target.value)}
                      placeholder="e.g. ROS 2, MoveIt 2, Nav2, Gazebo Sim, URDF, Kinematics"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 leading-relaxed"
                    />
                  </div>

                  {/* Preview of Badge Tags */}
                  {Array.isArray(cat.skills) && cat.skills.length > 0 && (
                    <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-zinc-300 font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
