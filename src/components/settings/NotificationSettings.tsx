import React from 'react';
import { Bell, Mail, MessageSquare, Calendar } from 'lucide-react';
import SettingsSection from './SettingsSection';

export default function NotificationSettings() {
  return (
    <>
      <SettingsSection
        title="Notification Preferences"
        description="Manage how you receive notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Push Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Receive notifications in your browser
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600"
            >
              <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Receive email updates about your account
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600"
            >
              <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Notification Types"
        description="Choose which notifications you want to receive"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Appointment Reminders
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Get notified about upcoming appointments
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600"
            >
              <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <div className="ml-3">
                <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Messages
                </label>
                <p className="text-sm text-gray-500 dark:text-dark-muted">
                  Get notified when you receive messages
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600"
            >
              <span className="translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
            </button>
          </div>
        </div>
      </SettingsSection>
    </>
  );
}