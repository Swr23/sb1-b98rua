import React from 'react';
import { motion } from 'framer-motion';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 border-b border-gray-200 dark:border-dark-border last:border-0"
    >
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-dark-muted">
            {description}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  );
}