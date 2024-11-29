import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Grid3X3, Grid2X2, LayoutGrid } from 'lucide-react';

type ViewType = 'day' | '3day' | 'week' | 'month';

interface CalendarViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function CalendarViewSelector({
  currentView,
  onViewChange,
}: CalendarViewSelectorProps) {
  const views = [
    { id: 'day', label: 'Day', icon: Calendar },
    { id: '3day', label: '3 Day', icon: Grid2X2 },
    { id: 'week', label: 'Week', icon: Grid3X3 },
    { id: 'month', label: 'Month', icon: LayoutGrid },
  ] as const;

  return (
    <div className="flex space-x-2 bg-white dark:bg-dark-secondary rounded-lg p-1 shadow-sm">
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`
            relative flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium
            transition-colors duration-200
            ${currentView === id
              ? 'text-white'
              : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text'
            }
          `}
        >
          {currentView === id && (
            <motion.div
              layoutId="viewIndicator"
              className="absolute inset-0 bg-blue-500 rounded-md"
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <Icon className="relative z-10 w-4 h-4" />
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  );
}