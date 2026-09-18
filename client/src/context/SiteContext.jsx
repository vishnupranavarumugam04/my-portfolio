import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { DEFAULT_SITE_DATA } from './siteDefaults';

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  // Always initialize with DEFAULT_SITE_DATA to guarantee instant zero-wait rendering
  const [siteData, setSiteData] = useState(DEFAULT_SITE_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');

  // Apply theme tokens to CSS custom variables on root HTML
  const applyThemeTokens = (theme, mode = 'dark') => {
    const root = document.documentElement;
    const isDark = mode === 'dark';

    if (isDark) {
      root.classList.add('dark');
      root.style.setProperty('--color-bg', '#0A0B0D');
      root.style.setProperty('--color-surface', '#141619');
      root.style.setProperty('--color-text', '#F4F4F5');
      root.style.setProperty('--color-muted', '#A1A1AA');
      root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--color-accent', '#E2E8F0');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--color-bg', '#F5F5F7');
      root.style.setProperty('--color-surface', '#FFFFFF');
      root.style.setProperty('--color-text', '#090A0C');
      root.style.setProperty('--color-muted', '#52525B');
      root.style.setProperty('--color-border', 'rgba(0, 0, 0, 0.09)');
      root.style.setProperty('--color-accent', '#18181B');
    }

    if (theme?.fontHeading) root.style.setProperty('--font-heading', `"${theme.fontHeading}", serif`);
    if (theme?.fontBody) root.style.setProperty('--font-body', `"${theme.fontBody}", sans-serif`);
  };

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getSiteData();
      if (data && typeof data === 'object') {
        const merged = {
          ...DEFAULT_SITE_DATA,
          ...data,
          hero: { ...DEFAULT_SITE_DATA.hero, ...(data.hero || {}) },
          theme: { ...DEFAULT_SITE_DATA.theme, ...(data.theme || {}) },
          about: { ...DEFAULT_SITE_DATA.about, ...(data.about || {}) },
          github: { ...DEFAULT_SITE_DATA.github, ...(data.github || {}) },
          linkedin: { ...DEFAULT_SITE_DATA.linkedin, ...(data.linkedin || {}) },
          customProjects: data.customProjects && data.customProjects.length > 0 ? data.customProjects : DEFAULT_SITE_DATA.customProjects,
          skillsCategories: data.skillsCategories && data.skillsCategories.length > 0 ? data.skillsCategories : DEFAULT_SITE_DATA.skillsCategories,
          achievements: data.achievements && data.achievements.length > 0 ? data.achievements : DEFAULT_SITE_DATA.achievements,
          education: { ...DEFAULT_SITE_DATA.education, ...(data.education || {}) }
        };
        setSiteData(merged);
        const activeMode = merged.theme?.mode || 'dark';
        setThemeMode(activeMode);
        applyThemeTokens(merged.theme, activeMode);
      }
    } catch (err) {
      console.warn('Using default site data (backend offline or booting):', err.message);
      applyThemeTokens(DEFAULT_SITE_DATA.theme, 'dark');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial token application
    applyThemeTokens(DEFAULT_SITE_DATA.theme, 'dark');
    loadData();
  }, [loadData]);

  // Toggle Theme Mode
  const toggleTheme = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
    applyThemeTokens(siteData?.theme, nextMode);

    if (siteData) {
      const updated = {
        ...siteData,
        theme: {
          ...siteData.theme,
          mode: nextMode
        }
      };
      setSiteData(updated);
    }
  };

  const saveSiteData = async (updatedData) => {
    try {
      setSaving(true);
      const payload = {
        ...updatedData,
        theme: {
          ...updatedData.theme,
          mode: themeMode
        }
      };
      const response = await api.updateSiteData(payload);
      setSiteData(response.data);
      applyThemeTokens(response.data.theme, themeMode);
      return { success: true, message: response.message };
    } catch (err) {
      console.error('Failed to save portfolio data:', err);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  };

  return (
    <SiteContext.Provider
      value={{
        siteData,
        setSiteData,
        loading,
        saving,
        error,
        themeMode,
        toggleTheme,
        refetch: loadData,
        saveSiteData
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
