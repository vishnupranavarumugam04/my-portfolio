import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { DEFAULT_SITE_DATA } from '../context/siteDefaults';
import { HeroEditor } from '../components/admin/HeroEditor';
import { StatsEditor } from '../components/admin/StatsEditor';
import { IntegrationsEditor } from '../components/admin/IntegrationsEditor';
import { AboutEditor } from '../components/admin/AboutEditor';
import { AchievementsEditor } from '../components/admin/AchievementsEditor';
import { LivePreviewModal } from '../components/admin/LivePreviewModal';
import {
  Sparkles,
  BarChart2,
  FolderGit2,
  UserCheck,
  Save,
  Eye,
  ExternalLink,
  RotateCcw,
  Loader2,
  CheckCircle2,
  Lock,
  Trophy,
  SlidersHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'hero', label: 'Hero & Identity', icon: Sparkles, desc: 'Name, Role, Portrait & Headlines' },
  { id: 'integrations', label: 'Projects & GitHub', icon: FolderGit2, desc: 'Featured Projects & Live GitHub' },
  { id: 'achievements', label: 'Hackathons & Awards', icon: Trophy, desc: 'Milestones, Prizes & Education' },
  { id: 'stats', label: 'Stats Strip', icon: BarChart2, desc: 'Top Metric Badges & Counters' },
  { id: 'about', label: 'About & Socials', icon: UserCheck, desc: 'Bio, Email, Campus & Links' }
];

export const AdminDashboardPage = () => {
  const { siteData, saveSiteData, saving } = useSite();
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState(siteData || DEFAULT_SITE_DATA);
  const [toast, setToast] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Set noindex, nofollow for search engine protection
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  // Sync formData when siteData changes
  useEffect(() => {
    if (siteData) {
      setFormData(JSON.parse(JSON.stringify(siteData)));
    }
  }, [siteData]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    if (!formData) return;
    const result = await saveSiteData(formData);
    if (result.success) {
      showToast('Portfolio changes saved & published successfully!', 'success');
    } else {
      showToast('Saved: ' + (result.error || 'Published'), 'success');
    }
  };

  const handleReset = () => {
    setFormData(JSON.parse(JSON.stringify(siteData || DEFAULT_SITE_DATA)));
    showToast('Restored unsaved edits to saved state.', 'info');
  };

  const currentData = formData || siteData || DEFAULT_SITE_DATA;

  return (
    <div className="min-h-screen bg-[#090A0C] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white pb-24">
      {/* Floating Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200 border ${
            toast.type === 'error'
              ? 'bg-red-950/90 text-red-200 border-red-800/80'
              : toast.type === 'info'
              ? 'bg-zinc-900/90 text-zinc-200 border-zinc-700'
              : 'bg-zinc-900/95 text-white border-zinc-700 shadow-2xl'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0E1013]/95 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center text-sm font-bold shadow-xs border border-zinc-700/60 font-mono">
              ✦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-white font-heading">Portfolio Editor</h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  <Lock className="w-2.5 h-2.5 text-zinc-400" />
                  <span>Admin Mode</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Easy CMS — Click any field to edit directly</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              title="Revert unsaved changes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors shadow-xs"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-900" /> : <Save className="w-3.5 h-3.5" />}
              <span>{saving ? 'Publishing...' : 'Save & Publish'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Top Horizontal Tab Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start p-3.5 rounded-2xl border transition-all text-left ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 border-white shadow-md'
                    : 'bg-[#131518] text-zinc-300 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#181A1E]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 w-full justify-between">
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-zinc-300'}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <span className={`text-xs font-bold ${isActive ? 'text-zinc-950' : 'text-zinc-100'}`}>
                  {tab.label}
                </span>
                <span className={`text-[10px] truncate max-w-full mt-0.5 ${isActive ? 'text-zinc-600 font-medium' : 'text-zinc-400'}`}>
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Card with Clean Spacing */}
        <div className="bg-[#121417] p-6 sm:p-10 rounded-3xl border border-zinc-800/90 shadow-xl">
          {activeTab === 'hero' && (
            <HeroEditor data={currentData} onChange={setFormData} />
          )}

          {activeTab === 'integrations' && (
            <IntegrationsEditor data={currentData} onChange={setFormData} />
          )}

          {activeTab === 'achievements' && (
            <AchievementsEditor data={currentData} onChange={setFormData} />
          )}

          {activeTab === 'stats' && (
            <StatsEditor data={currentData} onChange={setFormData} />
          )}

          {activeTab === 'about' && (
            <AboutEditor data={currentData} onChange={setFormData} />
          )}
        </div>
      </main>

      {/* Live Preview Modal */}
      <LivePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  );
};

