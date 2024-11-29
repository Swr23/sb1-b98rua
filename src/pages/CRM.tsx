import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LeadPipeline from '../components/crm/dashboard/LeadPipeline';
import ConsultationTracker from '../components/crm/dashboard/ConsultationTracker';
import ActiveClientBoard from '../components/crm/dashboard/ActiveClientBoard';
import RevenueForecast from '../components/crm/dashboard/RevenueForecast';

export default function CRM() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'leads', label: 'Lead Pipeline' },
    { id: 'consultations', label: 'Consultations' },
    { id: 'clients', label: 'Active Clients' },
    { id: 'revenue', label: 'Revenue' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-semibold text-gray-900 dark:text-dark-text"
        >
          Customer Relationship Management
        </motion.h1>
      </div>

      <div className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg p-6">
        <div className="border-b border-gray-200 dark:border-dark-border">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-dark-muted dark:hover:text-dark-text dark:hover:border-dark-border'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6">
              <LeadPipeline />
              <ConsultationTracker />
              <ActiveClientBoard />
              <RevenueForecast />
            </div>
          )}
          {activeTab === 'leads' && <LeadPipeline />}
          {activeTab === 'consultations' && <ConsultationTracker />}
          {activeTab === 'clients' && <ActiveClientBoard />}
          {activeTab === 'revenue' && <RevenueForecast />}
        </div>
      </div>
    </div>
  );
}