import React from 'react';
import { Plus, Trash2, BarChart2, Hash, Sparkles } from 'lucide-react';

export const StatsEditor = ({ data, onChange }) => {
  const stats = data?.stats || [];

  const handleAddStat = () => {
    const newStat = {
      id: `stat-${Date.now()}`,
      label: 'NEW METRIC',
      value: '10+'
    };
    onChange({
      ...data,
      stats: [...stats, newStat]
    });
  };

  const handleUpdateStat = (index, field, value) => {
    const updatedStats = [...stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value
    };
    onChange({
      ...data,
      stats: updatedStats
    });
  };

  const handleRemoveStat = (index) => {
    const updatedStats = stats.filter((_, i) => i !== index);
    onChange({
      ...data,
      stats: updatedStats
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
            <BarChart2 className="w-5 h-5 text-zinc-300" />
            <span>Key Stats & Metric Strip</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Display your core achievements, engineering milestones, and credentials as highlight boxes.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddStat}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Metric Box</span>
        </button>
      </div>

      {/* Metric Boxes Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Hash className="w-4 h-4 text-zinc-300" />
            <span>Active Metrics ({stats.length} Boxes)</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Formatted to match the portfolio stats strip
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="relative p-6 rounded-3xl bg-[#15181C] border border-zinc-750 hover:border-zinc-500 transition-all duration-300 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700/80 uppercase">
                  Block #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  className="p-1.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Remove Metric Box"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Number / Value Field */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                  Metric Value / Number
                </label>
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                  placeholder="e.g. 6+ or 3rd Year"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xl font-bold font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-400"
                />
              </div>

              {/* Label Field */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                  Label / Description
                </label>
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                  placeholder="e.g. HACKATHONS & AWARDS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono font-semibold text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-zinc-400 uppercase"
                />
              </div>
            </div>
          ))}
        </div>

        {stats.length === 0 && (
          <div className="text-center py-12 bg-[#15181C]/40 rounded-3xl border border-dashed border-zinc-800">
            <BarChart2 className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-300">No metric boxes added</p>
            <p className="text-xs text-zinc-500 mt-1">Click "Add Metric Box" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

