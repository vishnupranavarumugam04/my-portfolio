import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { DEFAULT_SITE_DATA } from './siteDefaults';

const SiteContext = createContext(null);

const CACHE_KEY = 'portfolio_site_data_v1';

const getInitialSiteData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed === 'object') {
        return {
          ...DEFAULT_SITE_DATA,
          ...parsed,
          hero: { ...DEFAULT_SITE_DATA.hero, ...(parsed.hero || {}) },
          theme: { ...DEFAULT_SITE_DATA.theme, ...(parsed.theme || {}) },
          about: { ...DEFAULT_SITE_DATA.about, ...(parsed.about || {}) },
          github: { ...DEFAULT_SITE_DATA.github, ...(parsed.github || {}) },
          linkedin: { ...DEFAULT_SITE_DATA.linkedin, ...(parsed.linkedin || {}) },
          customProjects: parsed.customProjects !== undefined ? parsed.customProjects : DEFAULT_SITE_DATA.customProjects,
          skillsCategories: parsed.skillsCategories !== undefined ? parsed.skillsCategories : DEFAULT_SITE_DATA.skillsCategories,
          achievements: parsed.achievements !== undefined ? parsed.achievements : DEFAULT_SITE_DATA.achievements,
          education: { ...DEFAULT_SITE_DATA.education, ...(parsed.education || {}) }
        };
      }
    }
  } catch (e) {
    console.warn('Could not read cached site data from localStorage:', e);
  }
  return DEFAULT_SITE_DATA;
};

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(getInitialSiteData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed?.theme?.mode || 'dark';
      }
    } catch (e) {}
    return 'dark';
  });

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
          customProjects: data.customProjects !== undefined ? data.customProjects : DEFAULT_SITE_DATA.customProjects,
          skillsCategories: data.skillsCategories !== undefined ? data.skillsCategories : DEFAULT_SITE_DATA.skillsCategories,
          achievements: data.achievements !== undefined ? data.achievements : DEFAULT_SITE_DATA.achievements,
          education: { ...DEFAULT_SITE_DATA.education, ...(data.education || {}) }
        };
        setSiteData(merged);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
        } catch (e) {}
        const activeMode = merged.theme?.mode || 'dark';
        setThemeMode(activeMode);
        applyThemeTokens(merged.theme, activeMode);
      }
    } catch (err) {
      console.warn('Using cached / default site data:', err.message);
      const current = getInitialSiteData();
      applyThemeTokens(current.theme, current.theme?.mode || 'dark');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const current = getInitialSiteData();
    applyThemeTokens(current.theme, current.theme?.mode || 'dark');
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
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
      } catch (e) {}
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

      // 1. Immediately persist to localStorage so data never vanishes on reopen/refresh
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
      setSiteData(payload);
      applyThemeTokens(payload.theme, themeMode);

      // 2. Persist to MongoDB backend
      const response = await api.updateSiteData(payload);
      if (response && response.data) {
        const merged = {
          ...payload,
          ...response.data
        };
        setSiteData(merged);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
        } catch (e) {}
        applyThemeTokens(merged.theme, themeMode);
      }
      return { success: true, message: response?.message || 'Changes saved successfully' };
    } catch (err) {
      console.error('Failed to sync to backend database, saved locally in browser:', err);
      return { success: true, message: 'Saved locally in browser storage.' };
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
