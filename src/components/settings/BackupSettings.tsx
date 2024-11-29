import React from 'react';
import { Database, Download, Upload, Clock, HardDrive } from 'lucide-react';
import SettingsSection from './SettingsSection';

export default function BackupSettings() {
  return (
    <>
      <SettingsSection
        title="Automated Backups"
        description="Configure automatic backup settings"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Backup Frequency
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  How often to create automatic backups
                </p>
              </div>
            </div>
            <select className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HardDrive className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Storage Location
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Where to store backup files
                </p>
              </div>
            </div>
            <select className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text">
              <option>Cloud Storage</option>
              <option>Local Storage</option>
              <option>Both</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Manual Backup"
        description="Create and manage manual backups"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Backup
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Restore Backup
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text mb-4">
              Recent Backups
            </h4>
            <div className="space-y-3">
              {[
                { date: '2024-03-15', size: '256MB', type: 'Automated' },
                { date: '2024-03-14', size: '255MB', type: 'Manual' },
                { date: '2024-03-13', size: '254MB', type: 'Automated' },
              ].map((backup) => (
                <div
                  key={backup.date}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-accent rounded-lg"
                >
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                        {backup.date}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">
                        {backup.type} • {backup.size}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SettingsSection>
    </>
  );
}