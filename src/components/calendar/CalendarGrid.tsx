import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { Booking } from '../../types';

interface CalendarGridProps {
  currentDate: Date;
  bookings: Booking[];
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({ currentDate, bookings, onSelectDate }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const bookingsByDate = bookings.reduce((acc, booking) => {
    const dateKey = format(booking.startTime, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700"
        >
          {day}
        </div>
      ))}
      {days.map((day) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        const dayBookings = bookingsByDate[dateKey] || [];
        
        return (
          <div
            key={dateKey}
            onClick={() => onSelectDate(day)}
            className={`min-h-[120px] bg-white p-2 ${
              !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
            } ${isToday(day) ? 'bg-blue-50' : ''} cursor-pointer hover:bg-gray-50`}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                !isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-700'
              }`}>
                {format(day, 'd')}
              </span>
              {dayBookings.length > 0 && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                  {dayBookings.length}
                </span>
              )}
            </div>
            <div className="mt-2">
              {dayBookings.slice(0, 2).map((booking) => (
                <div
                  key={booking.id}
                  className="mb-1 truncate rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                >
                  {format(booking.startTime, 'HH:mm')} - {booking.service}
                </div>
              ))}
              {dayBookings.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{dayBookings.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}