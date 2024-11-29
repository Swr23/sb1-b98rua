import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Database, Link2, AlertCircle, Check } from 'lucide-react';
import SettingsSection from '../SettingsSection';

interface SyncField {
  name: string;
  enabled: boolean;
  lastSync: Date | null;
  status: 'success' | 'error' | 'pending' | null;
}

export default function QuickbooksSettings() {
  const [isConnected, setIsConnected] = useState(false);
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isTestMode, setIsTestMode] = useState(true);

  const [syncFields, setSyncFields] = useState<SyncField[]>([
    { name: 'Chart of Accounts', enabled: true, lastSync: null, status: null },
    { name: 'Customer Records', enabled: true, lastSync: null, status: null },
    { name: 'Vendor Information', enabled: true, lastSync: null, status: null },
    { name: 'Products/Services', enabled: true, lastSync: null, status: null },
    { name: 'Transactions', enabled: true, lastSync: null, status: null },
  ]);

  const handleConnect = () => {
    // In a real implementation, this would initiate OAuth flow
    setIsConnected(true);
    setLastSyncTime(new Date());
  };

  const handleFieldToggle = (index: number) => {
    setSyncFields(fields => 
      fields.map((field, i) => 
        i === index ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  const handleTestSync = () => {
    // Simulate a test sync
    setSyncFields(fields =>
      fields.map(field => ({
        ...field,
        status: 'pending'
      }))
    );

    // Simulate sync completion
    setTimeout(() => {
      setSyncFields(fields =>
        fields.map(field => ({
          ...field,
          status: 'success',
          lastSync: new Date()
        }))
      );
    }, 2000);
  };

  return (
    <>
      <SettingsSection
        title="QuickBooks Integration"
        description="Connect and sync your data with QuickBooks"
      >
        <div className="space-y-6">
          {!isConnected ? (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
              <div className="flex items-center">
                <Database className="h-6 w-6 text-gray-400 dark:text-dark-muted" />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    Connect to QuickBooks
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">
                    Link your QuickBooks account to enable automatic syncing
                  </p>
                </div>
              </div>
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Connect
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-500 dark:text-green-400" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Connected to QuickBooks
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Last synced: {lastSyncTime?.toLocaleString() || 'Never'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConnected(false)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Disconnect
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    QuickBooks Company
                  </label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 dark:bg-dark-accent dark:text-dark-text"
                  >
                    <option value="">Select Company</option>
                    <option value="company1">Company One</option>
                    <option value="company2">Company Two</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                    Sync Frequency
                  </label>
                  <select
                    value={syncFrequency}
                    onChange={(e) => setSyncFrequency(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 dark:bg-dark-accent dark:text-dark-text"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                  Data Synchronization
                </h4>
                {syncFields.map((field, index) => (
                  <div
                    key={field.name}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-accent rounded-lg"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={() => handleFieldToggle(index)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 dark:text-dark-text">
                        {field.name}
                      </span>
                    </div>
                    {field.status && (
                      <div className="flex items-center">
                        {field.status === 'pending' ? (
                          <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                        ) : field.status === 'success' ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    Test Mode
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">
                    Run syncs in test environment first
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isTestMode}
                  onClick={() => setIsTestMode(!isTestMode)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isTestMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isTestMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleTestSync}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-dark-accent dark:text-dark-text dark:hover:bg-dark-border"
                >
                  Test Sync
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </SettingsSection>
    </>
  );
}