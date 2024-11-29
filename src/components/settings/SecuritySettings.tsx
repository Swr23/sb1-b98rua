import React from 'react';
import { Lock, Key, Shield, Eye, UserPlus, AlertTriangle } from 'lucide-react';
import SettingsSection from './SettingsSection';
import FormInput from '../forms/FormInput';

export default function SecuritySettings() {
  return (
    <>
      <SettingsSection
        title="Password & Authentication"
        description="Manage your account security settings"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Current Password"
              name="currentPassword"
              type="password"
              icon={Lock}
              placeholder="Enter current password"
            />
            <FormInput
              label="New Password"
              name="newPassword"
              type="password"
              icon={Key}
              placeholder="Enter new password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Two-Factor Authentication
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Enable 2FA
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Privacy Settings"
        description="Control your data and privacy preferences"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Profile Visibility
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Control who can see your profile information
                </p>
              </div>
            </div>
            <select className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text">
              <option>Public</option>
              <option>Private</option>
              <option>Contacts Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserPlus className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Connection Requests
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Manage who can send you connection requests
                </p>
              </div>
            </div>
            <select className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text">
              <option>Everyone</option>
              <option>Contacts of Contacts</option>
              <option>Nobody</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Account Recovery"
        description="Set up recovery options for your account"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Recovery Email
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Add a backup email for account recovery
                </p>
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Email
            </button>
          </div>
        </div>
      </SettingsSection>
    </>
  );
}