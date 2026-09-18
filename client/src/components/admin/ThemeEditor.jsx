import React from 'react';
import { Palette, Type, Check } from 'lucide-react';

const THEME_PRESETS = [
  {
    name: 'Noir & Alabaster Studio (Current)',
    bgColor: '#0A0B0D',
    accentColor: '#E2E8F0',
    surfaceColor: '#141619',
    textColor: '#F4F4F5',
    mutedTextColor: '#A1A1AA',
    fontHeading: 'Playfair Display',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Charcoal Minimalist',
    bgColor: '#121316',
    accentColor: '#F1F5F9',
    surfaceColor: '#1A1C20',
    textColor: '#FAFAFA',
    mutedTextColor: '#94A3B8',
    fontHeading: 'Fraunces',
    fontBody: 'Inter'
  },
  {
    name: 'Studio Light Alabaster',
    bgColor: '#F4F5F7',
    accentColor: '#18181B',
    surfaceColor: '#FFFFFF',
    textColor: '#09090B',
    mutedTextColor: '#52525B',
    fontHeading: 'Playfair Display',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Deep Space Cyber',
    bgColor: '#060709',
    accentColor: '#38BDF8',
    surfaceColor: '#0F1218',
    textColor: '#F8FAFC',
    mutedTextColor: '#64748B',
    fontHeading: 'Cinzel',
    fontBody: 'Plus Jakarta Sans'
  }
];

const HEADING_FONTS = [
  { name: 'Playfair Display', family: 'Playfair Display', category: 'Editorial Serif' },
  { name: 'Fraunces', family: 'Fraunces', category: 'Warm Serif' },
  { name: 'Cinzel', family: 'Cinzel', category: 'Classic Serif' },
  { name: 'Merriweather', family: 'Merriweather', category: 'Book Serif' }
];

const BODY_FONTS = [
  { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', category: 'Modern Geometric' },
  { name: 'Inter', family: 'Inter', category: 'Clean Neutral' },
  { name: 'Roboto', family: 'Roboto', category: 'Standard Sans' }
];

export const ThemeEditor = ({ data, onChange }) => {
  const theme = data?.theme || {};

  const handleFieldChange = (field, value) => {
    onChange({
      ...data,
      theme: {
        ...theme,
        [field]: value
      }
    });
  };

  const applyPreset = (preset) => {
    onChange({
      ...data,
      theme: {
        ...theme,
        ...preset
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 font-heading">
          <Palette className="w-5 h-5 text-zinc-300" />
          <span>Visual Theme & Typography Engine</span>
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Select curated design palettes or fine-tune individual colors and typography pairings in real time.
        </p>
      </div>

      {/* Curated Theme Presets */}
      <div>
        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
          Curated Studio Palettes
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme.bgColor === preset.bgColor && theme.accentColor === preset.accentColor
                  ? 'border-zinc-400 ring-1 ring-zinc-400 bg-zinc-900 shadow-md'
                  : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-100 block">{preset.name}</span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {preset.fontHeading} + {preset.fontBody}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <span
                  className="w-5 h-5 rounded-full border border-zinc-700 shadow-xs"
                  style={{ backgroundColor: preset.bgColor }}
                  title="Background"
                />
                <span
                  className="w-5 h-5 rounded-full border border-zinc-700 shadow-xs"
                  style={{ backgroundColor: preset.accentColor }}
                  title="Accent"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-zinc-800" />

      {/* Color Customizers */}
      <div>
        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
          Custom Color Tokens
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Background Color */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-zinc-400 block uppercase">
              Base Background
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.bgColor || '#0A0B0D'}
                onChange={(e) => handleFieldChange('bgColor', e.target.value)}
                className="w-9 h-9 rounded-xl border border-zinc-700 cursor-pointer p-0.5 bg-zinc-950"
              />
              <input
                type="text"
                value={theme.bgColor || '#0A0B0D'}
                onChange={(e) => handleFieldChange('bgColor', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-mono uppercase text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-zinc-400 block uppercase">
              Highlight / Accent
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.accentColor || '#E2E8F0'}
                onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                className="w-9 h-9 rounded-xl border border-zinc-700 cursor-pointer p-0.5 bg-zinc-950"
              />
              <input
                type="text"
                value={theme.accentColor || '#E2E8F0'}
                onChange={(e) => handleFieldChange('accentColor', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-mono uppercase text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-zinc-400 block uppercase">
              Primary Typography
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.textColor || '#F4F4F5'}
                onChange={(e) => handleFieldChange('textColor', e.target.value)}
                className="w-9 h-9 rounded-xl border border-zinc-700 cursor-pointer p-0.5 bg-zinc-950"
              />
              <input
                type="text"
                value={theme.textColor || '#F4F4F5'}
                onChange={(e) => handleFieldChange('textColor', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-mono uppercase text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-zinc-800" />

      {/* Typography Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Heading Display Font
          </label>
          <select
            value={theme.fontHeading || 'Playfair Display'}
            onChange={(e) => handleFieldChange('fontHeading', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-100 focus:outline-none focus:border-zinc-500"
          >
            {HEADING_FONTS.map((font) => (
              <option key={font.name} value={font.family}>
                {font.name} ({font.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Body Text Font
          </label>
          <select
            value={theme.fontBody || 'Plus Jakarta Sans'}
            onChange={(e) => handleFieldChange('fontBody', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-100 focus:outline-none focus:border-zinc-500"
          >
            {BODY_FONTS.map((font) => (
              <option key={font.name} value={font.family}>
                {font.name} ({font.category})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
