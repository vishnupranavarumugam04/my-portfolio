import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { PortfolioPage } from './pages/PortfolioPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<PortfolioPage />} />
          
          {/* Secret Slug Admin Dashboard */}
          <Route path="/x7k9-admin" element={<AdminDashboardPage />} />
          
          {/* Catch-all redirect to public portfolio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;
