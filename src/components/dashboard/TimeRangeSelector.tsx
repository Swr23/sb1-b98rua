import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

interface TimeRange {
  id: string;
  label: string;
}

const timeRanges: TimeRange[] = [
  { id: 'today', label: 'Today' },
  { id: '7days', label: 'Last 7 Days' },
  { id: '30days', label: 'Last Month' },
];

interface TimeRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export default function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = timeRanges.find(range => range.id === selectedRange);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-dark-accent rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
      >
        <Calendar className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
        <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
          {selectedOption?.label}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 dark:text-dark-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-dark-accent border border-gray-200 dark:border-dark-border shadow-lg z-40"
            >
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => {
                    onRangeChange(range.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-border transition-colors ${
                    selectedRange === range.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-dark-text'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}