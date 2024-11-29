import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import CRM from './pages/CRM';
import Messages from './pages/Messages';
import Reports from './pages/Reports';
import Loyalty from './pages/Loyalty';
import Settings from './pages/Settings';
import Consultation from './pages/forms/Consultation';
import Intake from './pages/forms/Intake';
import Waivers from './pages/forms/Waivers';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-dark-primary transition-colors duration-250">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/forms/consultation" element={<Consultation />} />
              <Route path="/forms/intake" element={<Intake />} />
              <Route path="/forms/waivers" element={<Waivers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}