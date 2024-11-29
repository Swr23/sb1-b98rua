import React, { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import SettingsSection from './SettingsSection';

export default function ThemeSettings() {
  const [isDark, setIsDark] = useDarkMode();
  const [autoTheme, setAutoTheme] = useState(() => {
    return localStorage.getItem('themePreference') === 'auto';
  });
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [accentColor, setAccentColor] = useState('#8B5CF6');
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleThemePreference = (preference: 'light' | 'dark' | 'auto') => {
    if (preference === 'auto') {
      setAutoTheme(true);
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      localStorage.setItem('themePreference', 'auto');
    } else {
      setAutoTheme(false);
      setIsDark(preference === 'dark');
      localStorage.setItem('themePreference', preference);
    }
  };

  const handleColorChange = (type: 'primary' | 'accent', value: string) => {
    if (type === 'primary') {
      setPrimaryColor(value);
      document.documentElement.style.setProperty('--color-primary', value);
    } else {
      setAccentColor(value);
      document.documentElement.style.setProperty('--color-accent', value);
    }
  };

  return (
    <>
      <SettingsSection
        title="Theme Preferences"
        description="Customize the appearance of your dashboard"
      >
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleThemePreference('light')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
              !isDark && !autoTheme
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-dark-border'
            }`}
          >
            <Sun className="h-6 w-6 mb-2 text-gray-700 dark:text-dark-text" />
            <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
              Light
            </span>
          </button>

          <button
            onClick={() => handleThemePreference('dark')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
              isDark && !autoTheme
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-dark-border'
            }`}
          >
            <Moon className="h-6 w-6 mb-2 text-gray-700 dark:text-dark-text" />
            <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
              Dark
            </span>
          </button>

          <button
            onClick={() => handleThemePreference('auto')}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
              autoTheme
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-dark-border'
            }`}
          >
            <Monitor className="h-6 w-6 mb-2 text-gray-700 dark:text-dark-text" />
            <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
              Auto
            </span>
          </button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Animations"
        description="Configure motion and transition preferences"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                Enable Animations
              </label>
              <p className="text-sm text-gray-500 dark:text-dark-muted">
                Toggle all motion animations throughout the application
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enableAnimations}
              onClick={() => setEnableAnimations(!enableAnimations)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                enableAnimations ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  enableAnimations ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
                Reduced Motion
              </label>
              <p className="text-sm text-gray-500 dark:text-dark-muted">
                Honor system-level reduced motion preferences
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                reducedMotion ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Custom Colors"
        description="Personalize your color scheme"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="h-8 w-8 rounded border border-gray-300 dark:border-dark-border"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="flex-1 rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Accent Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="h-8 w-8 rounded border border-gray-300 dark:border-dark-border"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="flex-1 rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text"
              />
            </div>
          </div>
        </div>
      </SettingsSection>
    </>
  );
}