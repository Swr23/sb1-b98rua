import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WeeklyTransactionReport from '../components/reports/WeeklyTransactionReport';
import CustomReport from '../components/reports/CustomReport';

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'custom'>('weekly');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-semibold text-gray-900 dark:text-dark-text"
        >
          Reports
        </motion.h1>
      </div>

      <div className="flex space-x-4 border-b border-gray-200 dark:border-dark-border">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'weekly'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text'
          }`}
        >
          Weekly Transaction Report
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'custom'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text'
          }`}
        >
          Custom Report
        </button>
      </div>

      {activeTab === 'weekly' ? <WeeklyTransactionReport /> : <CustomReport />}
    </div>
  );
}