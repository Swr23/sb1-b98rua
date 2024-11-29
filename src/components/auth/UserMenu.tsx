import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogin, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <button
        onClick={onLogin}
        className="flex items-center space-x-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors duration-200"
      >
        <User className="h-4 w-4" />
        <span>Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full bg-gray-100 dark:bg-dark-accent px-4 py-2 text-sm font-medium text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-200"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span>{user.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-dark-accent shadow-lg ring-1 ring-black ring-opacity-5 z-40"
            >
              <div className="p-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-dark-muted truncate">
                    {user.email}
                  </p>
                </div>
                <div className="h-px bg-gray-200 dark:bg-dark-border my-2" />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/settings');
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}