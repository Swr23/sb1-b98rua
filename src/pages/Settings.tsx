import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, Sun, Monitor, Palette, Globe, Bell, Lock, 
  Database, Clock, Mail, User, Building, Users
} from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import SettingsSection from '../components/settings/SettingsSection';
import ThemeSettings from '../components/settings/ThemeSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import BusinessSettings from '../components/settings/BusinessSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import BackupSettings from '../components/settings/BackupSettings';
import StaffSettings from '../components/settings/StaffSettings';

const settingsSections = [
  { id: 'appearance', icon: Palette, label: 'Appearance & Theme' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'business', icon: Building, label: 'Business Information' },
  { id: 'staff', icon: Users, label: 'Staff Management' },
  { id: 'security', icon: Lock, label: 'Security & Privacy' },
  { id: 'integrations', icon: Globe, label: 'Integrations' },
  { id: 'backup', icon: Database, label: 'Backup & Storage' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('appearance');
  const [isDark, setIsDark] = useDarkMode();

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'appearance':
        return <ThemeSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'business':
        return <BusinessSettings />;
      case 'staff':
        return <StaffSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'backup':
        return <BackupSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
            Settings
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 md:col-span-3"
          >
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-900 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-accent'
                    }
                  `}
                >
                  <section.icon className="h-5 w-5 mr-3" />
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 md:col-span-9"
          >
            <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg">
              {renderSettingsContent()}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}