import React from 'react';
import { ImageUploadField } from './ImageUploadField';
import { Sparkles, Type, FileText, MousePointerClick } from 'lucide-react';

export const HeroEditor = ({ data, onChange }) => {
  const hero = data?.hero || {};
  const about = data?.about || {};

  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      hero: {
        ...hero,
        [field]: value
      }
    });
  };

  const handleNameChange = (fullName) => {
    onChange({
      ...data,
      hero: {
        ...hero,
        fullName
      },
      about: {
        ...about,
        fullName
      }
    });
  };

  const handlePreferredNameChange = (preferredName) => {
    onChange({
      ...data,
      about: {
        ...about,
        preferredName
      }
    });
  };

  const handleRoleTitleChange = (roleTitle) => {
    onChange({
      ...data,
      about: {
        ...about,
        roleTitle
      }
    });
  };

  const handleCtaChange = (ctaType, field, value) => {
    onChange({
      ...data,
      hero: {
        ...hero,
        [ctaType]: {
          ...(hero[ctaType] || {}),
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
            <Sparkles className="w-5 h-5 text-zinc-300" />
            <span>Hero Section & Identity</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Update your displayed names, roles, headlines, introduction, and action buttons.
          </p>
        </div>
      </div>

      {/* 1. Identity & Name Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
          <Type className="w-4 h-4 text-zinc-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
            1. Identity & Display Names
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Full Name <span className="text-zinc-500 font-normal font-mono">(Main Heading)</span>
            </label>
            <input
              type="text"
              value={hero.fullName || about.fullName || ''}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Vishnu Pranav Arumugam"
              className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Preferred / Navbar Name <span className="text-zinc-500 font-normal font-mono">(Header Logo)</span>
            </label>
            <input
              type="text"
              value={about.preferredName || ''}
              onChange={(e) => handlePreferredNameChange(e.target.value)}
              placeholder="e.g. Pranav"
              className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-sm font-semibold text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Professional Role Title & Focus Areas
            </label>
            <input
              type="text"
              value={about.roleTitle || ''}
              onChange={(e) => handleRoleTitleChange(e.target.value)}
              placeholder="e.g. 3rd-Year Mechatronics Engineering Student | Robotics & Embedded AI"
              className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-sm font-medium text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 2. Portrait Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
            2. Hero Portrait Picture
          </h4>
        </div>
        <ImageUploadField
          value={hero.imageUrl}
          onChange={(url) => handleFieldChange('imageUrl', url)}
        />
      </div>

      {/* 3. Headlines & Intro Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
          <FileText className="w-4 h-4 text-zinc-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
            3. Headline & Introduction
          </h4>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Top Eyebrow Badge Tagline
          </label>
          <input
            type="text"
            value={hero.eyebrow || ''}
            onChange={(e) => handleFieldChange('eyebrow', e.target.value)}
            placeholder="e.g. MECHATRONICS ENGINEERING & ROBOTICS"
            className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-xs font-mono font-semibold text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Main Entrance Headline
            </label>
            <input
              type="text"
              value={hero.headline || ''}
              onChange={(e) => handleFieldChange('headline', e.target.value)}
              placeholder="e.g. Building intelligent robotic systems & embedded"
              className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-sm font-medium text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Highlighted Keyword
            </label>
            <input
              type="text"
              value={hero.headlineHighlight || ''}
              onChange={(e) => handleFieldChange('headlineHighlight', e.target.value)}
              placeholder="AI automation."
              className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Introduction Bio Text
          </label>
          <textarea
            rows={3}
            value={hero.body || ''}
            onChange={(e) => handleFieldChange('body', e.target.value)}
            placeholder="Brief intro about your engineering focus, experience, and passions..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-750 bg-zinc-950 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 leading-relaxed"
          />
        </div>
      </div>

      {/* 4. Action Buttons Card */}
      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/80">
          <MousePointerClick className="w-4 h-4 text-zinc-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
            4. Hero Call-To-Action Buttons
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-3">
            <span className="text-xs font-bold text-white block">Primary Button</span>
            <input
              type="text"
              value={hero.ctaPrimary?.label || ''}
              onChange={(e) => handleCtaChange('ctaPrimary', 'label', e.target.value)}
              placeholder="Button Label (e.g. Explore Projects)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
            <input
              type="text"
              value={hero.ctaPrimary?.url || ''}
              onChange={(e) => handleCtaChange('ctaPrimary', 'url', e.target.value)}
              placeholder="Destination Link (e.g. #projects)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 space-y-3">
            <span className="text-xs font-bold text-white block">Secondary Button</span>
            <input
              type="text"
              value={hero.ctaSecondary?.label || ''}
              onChange={(e) => handleCtaChange('ctaSecondary', 'label', e.target.value)}
              placeholder="Button Label (e.g. Get in Touch)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
            <input
              type="text"
              value={hero.ctaSecondary?.url || ''}
              onChange={(e) => handleCtaChange('ctaSecondary', 'url', e.target.value)}
              placeholder="Destination Link (e.g. #connect)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
