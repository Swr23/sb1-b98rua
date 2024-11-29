import React from 'react';
import { motion } from 'framer-motion';
import { format, addHours, startOfDay } from 'date-fns';
import { Clock } from 'lucide-react';
import { Booking } from '../../../types';

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onTimeSlotClick: (startTime: Date) => void;
}

export default function DayView({ date, bookings, onTimeSlotClick }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const startOfToday = startOfDay(date);

  const getBookingsForHour = (hour: number) => {
    return bookings.filter(booking => {
      const bookingHour = booking.startTime.getHours();
      return bookingHour === hour;
    });
  };

  return (
    <div className="h-[calc(100vh-16rem)] overflow-y-auto">
      <div className="relative min-h-full">
        {/* Current time indicator */}
        {format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && (
          <div 
            className="absolute w-full border-t-2 border-red-500 z-10"
            style={{ 
              top: `${(new Date().getHours() * 60 + new Date().getMinutes()) * 2}px`
            }}
          >
            <div className="absolute -top-3 -left-2 bg-red-500 rounded-full p-1">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {hours.map(hour => {
          const hourBookings = getBookingsForHour(hour);
          const timeSlotStart = addHours(startOfToday, hour);

          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hour * 0.02 }}
              className="relative h-[120px] border-b border-gray-200 dark:border-dark-border group"
            >
              <div className="absolute -left-16 top-0 w-14 pr-2 text-right text-sm text-gray-500 dark:text-dark-muted">
                {format(timeSlotStart, 'h a')}
              </div>

              <div
                onClick={() => onTimeSlotClick(timeSlotStart)}
                className="absolute inset-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors duration-150"
              >
                {hourBookings.map(booking => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute left-0 right-0 mx-2 p-2 rounded-lg bg-blue-500 text-white shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    style={{
                      top: `${booking.startTime.getMinutes()}px`,
                      height: `${(booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60)}px`,
                    }}
                  >
                    <div className="text-sm font-medium truncate">
                      {booking.service}
                    </div>
                    <div className="text-xs opacity-90">
                      {format(booking.startTime, 'h:mm a')} - {format(booking.endTime, 'h:mm a')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}