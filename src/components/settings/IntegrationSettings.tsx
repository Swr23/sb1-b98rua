import React from 'react';
import { Globe, Link, RefreshCw, Database } from 'lucide-react';
import SettingsSection from './SettingsSection';
import QuickbooksSettings from './integrations/QuickbooksSettings';

const integrations = [
  {
    name: 'Calendar Sync',
    description: 'Sync appointments with external calendars',
    icon: RefreshCw,
    connected: true,
  },
  {
    name: 'Payment Gateway',
    description: 'Process payments and transactions',
    icon: Database,
    connected: true,
  },
  {
    name: 'Email Marketing',
    description: 'Connect with email marketing platforms',
    icon: Globe,
    connected: false,
  },
  {
    name: 'CRM Integration',
    description: 'Sync customer data with external CRM',
    icon: Link,
    connected: false,
  },
];

export default function IntegrationSettings() {
  return (
    <>
      <QuickbooksSettings />

      <SettingsSection
        title="Connected Services"
        description="Manage your integrated services and applications"
      >
        <div className="space-y-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.name}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400 dark:text-dark-muted" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    integration.connected
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {integration.connected ? 'Connected' : 'Connect'}
                </button>
              </div>
            );
          })}
        </div>
      </SettingsSection>

      <SettingsSection
        title="API Access"
        description="Manage API keys and access tokens"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                API Key
              </h3>
              <p className="text-sm text-gray-500 dark:text-dark-muted">
                Use this key to authenticate API requests
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate Key
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                Webhook URL
              </h3>
              <p className="text-sm text-gray-500 dark:text-dark-muted">
                Configure webhook endpoints for real-time updates
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Configure
            </button>
          </div>
        </div>
      </SettingsSection>
    </>
  );
}