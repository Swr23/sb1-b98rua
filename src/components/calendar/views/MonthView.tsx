import React from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Booking } from '../../../types';

interface MonthViewProps {
  currentDate: Date;
  bookings: Booking[];
  onDateSelect: (date: Date) => void;
}

export default function MonthView({ currentDate, bookings, onDateSelect }: MonthViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBookingsForDay = (date: Date) => {
    return bookings.filter(booking => 
      format(booking.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-dark-border rounded-lg overflow-hidden">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="bg-gray-50 dark:bg-dark-accent py-2 text-center text-sm font-semibold text-gray-700 dark:text-dark-text"
        >
          {day}
        </div>
      ))}
      {days.map((day, index) => {
        const dayBookings = getBookingsForDay(day);
        
        return (
          <motion.div
            key={format(day, 'yyyy-MM-dd')}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => onDateSelect(day)}
            className={`
              min-h-[120px] bg-white dark:bg-dark-secondary p-2 cursor-pointer
              transition-colors duration-200
              ${!isSameMonth(day, currentDate) ? 'bg-gray-50 dark:bg-dark-accent' : ''}
              ${isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              hover:bg-gray-50 dark:hover:bg-dark-accent
            `}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                !isSameMonth(day, currentDate)
                  ? 'text-gray-400 dark:text-dark-muted'
                  : 'text-gray-700 dark:text-dark-text'
              }`}>
                {format(day, 'd')}
              </span>
              {dayBookings.length > 0 && (
                <span className="rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                  {dayBookings.length}
                </span>
              )}
            </div>

            <div className="mt-2 space-y-1">
              {dayBookings.slice(0, 2).map((booking) => (
                <div
                  key={booking.id}
                  className="truncate rounded bg-blue-100 dark:bg-blue-900/30 px-2 py-1 text-xs text-blue-700 dark:text-blue-200"
                >
                  {format(booking.startTime, 'HH:mm')} - {booking.service}
                </div>
              ))}
              {dayBookings.length > 2 && (
                <div className="text-xs text-gray-500 dark:text-dark-muted">
                  +{dayBookings.length - 2} more
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}