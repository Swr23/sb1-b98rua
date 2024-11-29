import React from 'react';
import { Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import UserMenu from '../auth/UserMenu';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-dark-secondary shadow-md dark:shadow-dark-md transition-colors duration-250">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user && (
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-dark-accent dark:hover:text-dark-text transition-colors duration-250">
              <Bell className="h-6 w-6" />
            </button>
          )}
          <UserMenu
            user={user}
            onLogin={login}
            onLogout={logout}
          />
        </div>
      </div>
    </header>
  );
}