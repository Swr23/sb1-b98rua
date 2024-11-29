import React from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import DayView from './DayView';
import { Booking } from '../../../types';

interface ThreeDayViewProps {
  currentDate: Date;
  bookings: Booking[];
  onTimeSlotClick: (startTime: Date) => void;
}

export default function ThreeDayView({ currentDate, bookings, onTimeSlotClick }: ThreeDayViewProps) {
  const days = [currentDate, addDays(currentDate, 1), addDays(currentDate, 2)];

  const getBookingsForDay = (date: Date) => {
    return bookings.filter(booking => 
      format(booking.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="flex divide-x divide-gray-200 dark:divide-dark-border">
      {days.map((date, index) => (
        <motion.div
          key={format(date, 'yyyy-MM-dd')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex-1"
        >
          <div className="px-4 py-2 text-center border-b border-gray-200 dark:border-dark-border">
            <div className="text-sm font-medium text-gray-900 dark:text-dark-text">
              {format(date, 'EEEE')}
            </div>
            <div className="text-sm text-gray-500 dark:text-dark-muted">
              {format(date, 'MMM d')}
            </div>
          </div>
          <DayView
            date={date}
            bookings={getBookingsForDay(date)}
            onTimeSlotClick={onTimeSlotClick}
          />
        </motion.div>
      ))}
    </div>
  );
}