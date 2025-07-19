import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CampaignSetup from './pages/CampaignSetup';
import DomainManagement from './pages/DomainManagement';
import InboxManagement from './pages/InboxManagement';
import DNSConfiguration from './pages/DNSConfiguration';
import SystemSettings from './pages/SystemSettings';
import ActivityLogs from './pages/ActivityLogs';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-brand-light">
        {/* Navigation with Neo-Lust brand colors */}
        <div className="bg-brand-dark text-brand-light px-4 py-3">
          <div className="flex gap-6">
            <Link to="/" className="hover:text-brand-primary transition-colors">Dashboard</Link>
            <Link to="/campaign-setup" className="hover:text-brand-primary transition-colors">New Campaign</Link>
            <Link to="/domains" className="hover:text-brand-primary transition-colors">Domains</Link>
            <Link to="/inboxes" className="hover:text-brand-primary transition-colors">Inboxes</Link>
            <Link to="/dns" className="hover:text-brand-primary transition-colors">DNS</Link>
            <Link to="/settings" className="hover:text-brand-primary transition-colors">Settings</Link>
            <Link to="/logs" className="hover:text-brand-primary transition-colors">Logs</Link>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaign-setup" element={<CampaignSetup />} />
          <Route path="/domains" element={<DomainManagement />} />
          <Route path="/inboxes" element={<InboxManagement />} />
          <Route path="/dns" element={<DNSConfiguration />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/logs" element={<ActivityLogs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;