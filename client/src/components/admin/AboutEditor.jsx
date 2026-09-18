import React from 'react';
import { UserCheck, Plus, Trash2, Globe, Mail, MapPin, Sparkles, Share2, AlignLeft } from 'lucide-react';

export const AboutEditor = ({ data, onChange }) => {
  const about = data?.about || {};
  const socialLinks = about.socialLinks || [];

  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      about: {
        ...about,
        [field]: value
      }
    });
  };

  const handleAddSocial = () => {
    const newSocial = {
      id: `soc-${Date.now()}`,
      platform: 'GitHub',
      url: 'https://github.com/vishnupranavarumugam04'
    };
    onChange({
      ...data,
      about: {
        ...about,
        socialLinks: [...socialLinks, newSocial]
      }
    });
  };

  const handleUpdateSocial = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({
      ...data,
      about: {
        ...about,
        socialLinks: updated
      }
    });
  };

  const handleRemoveSocial = (index) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    onChange({
      ...data,
      about: {
        ...about,
        socialLinks: updated
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
            <UserCheck className="w-5 h-5 text-zinc-300" />
            <span>About, Bio & Social Channels</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Configure your personal profile details, background philosophy, and social channels.
          </p>
        </div>
      </div>

      {/* 1. Identity Box */}
      <div className="p-6 rounded-3xl bg-[#15181C] border border-zinc-750 space-y-5 shadow-lg">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">Profile Identity</h4>
            <p className="text-xs text-zinc-400">Display names and primary role</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={about.fullName || ''}
              onChange={(e) => {
                onChange({
                  ...data,
                  about: { ...about, fullName: e.target.value },
                  hero: { ...(data?.hero || {}), fullName: e.target.value }
                });
              }}
              placeholder="Vishnu Pranav Arumugam"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Preferred Name / Handle
            </label>
            <input
              type="text"
              value={about.preferredName || ''}
              onChange={(e) => handleFieldChange('preferredName', e.target.value)}
              placeholder="Pranav"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-semibold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Role Title
            </label>
            <input
              type="text"
              value={about.roleTitle || ''}
              onChange={(e) => handleFieldChange('roleTitle', e.target.value)}
              placeholder="3rd-Year Mechatronics Student"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-medium text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* 2. Bio & Philosophy Box */}
      <div className="p-6 rounded-3xl bg-[#15181C] border border-zinc-750 space-y-4 shadow-lg">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs">
            <AlignLeft className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">Biography & Statement</h4>
            <p className="text-xs text-zinc-400">Your background and engineering philosophy</p>
          </div>
        </div>

        <div>
          <textarea
            rows={4}
            value={about.bio || ''}
            onChange={(e) => handleFieldChange('bio', e.target.value)}
            placeholder="I specialize in bridging design engineering with robust backend architectures..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 leading-relaxed"
          />
        </div>
      </div>

      {/* 3. Contact & Availability Box */}
      <div className="p-6 rounded-3xl bg-[#15181C] border border-zinc-750 space-y-4 shadow-lg">
        <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
          <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center border border-zinc-700/60 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">Contact & Location</h4>
            <p className="text-xs text-zinc-400">Direct contact details and availability status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={about.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="vishnupranavarumugam04@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Location / Region
            </label>
            <input
              type="text"
              value={about.location || ''}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="Tamil Nadu, India"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Availability Badge Pill
            </label>
            <input
              type="text"
              value={about.statusBadge || ''}
              onChange={(e) => handleFieldChange('statusBadge', e.target.value)}
              placeholder="Available for Robotics & AI Roles"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* 4. Social Links Box Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-zinc-300" />
            <span>Social & External Links ({socialLinks.length} Channels)</span>
          </span>
          <button
            type="button"
            onClick={handleAddSocial}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Social Link</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((soc, idx) => (
            <div
              key={soc.id || idx}
              className="p-5 rounded-3xl bg-[#15181C] border border-zinc-750 hover:border-zinc-500 transition-all duration-300 shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
                    Channel #{idx + 1}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(idx)}
                  className="p-1.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Remove Social Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={soc.platform || ''}
                  onChange={(e) => handleUpdateSocial(idx, 'platform', e.target.value)}
                  placeholder="Platform (e.g. GitHub, LinkedIn, Twitter)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 font-bold mb-1">
                  Profile / Connection URL
                </label>
                <input
                  type="url"
                  value={soc.url || ''}
                  onChange={(e) => handleUpdateSocial(idx, 'url', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>
          ))}
        </div>

        {socialLinks.length === 0 && (
          <div className="text-center py-8 bg-[#15181C]/40 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-xs text-zinc-500">No social links added yet. Click "Add Social Link" to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

