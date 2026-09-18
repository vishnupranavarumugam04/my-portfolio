import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { AmbientBackground } from '../components/portfolio/AmbientBackground';
import { Navbar } from '../components/portfolio/Navbar';
import { HeroSection } from '../components/portfolio/HeroSection';
import { TechTicker } from '../components/portfolio/TechTicker';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { AchievementsSection } from '../components/portfolio/AchievementsSection';
import { ConnectSection } from '../components/portfolio/ConnectSection';
import { Footer } from '../components/portfolio/Footer';
import { Loader2 } from 'lucide-react';

export const PortfolioPage = () => {
  const { siteData, loading } = useSite();

  // Reset robots meta tag for public portfolio
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow');
    }
  }, []);

  if (loading && !siteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-theme-bg text-theme-text">
        <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-4" />
        <p className="font-heading text-xl font-medium tracking-tight">Initializing Robotics Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-sky-400 selection:text-white relative bg-theme-bg">
      {/* Interactive Particle Background */}
      <AmbientBackground />

      {/* Navigation with Theme Switcher */}
      <Navbar siteData={siteData} />

      {/* Main Portfolio Content */}
      <main className="flex-grow relative z-10">
        <HeroSection siteData={siteData} />
        <TechTicker />
        <SkillsSection siteData={siteData} />
        <ProjectsSection siteData={siteData} />
        <AchievementsSection siteData={siteData} />
        <ConnectSection siteData={siteData} />
      </main>

      {/* Footer */}
      <Footer siteData={siteData} />
    </div>
  );
};
