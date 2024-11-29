import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Plus } from 'lucide-react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarViewSelector from '../components/calendar/CalendarViewSelector';
import DayView from '../components/calendar/views/DayView';
import ThreeDayView from '../components/calendar/views/ThreeDayView';
import WeekView from '../components/calendar/views/WeekView';
import MonthView from '../components/calendar/views/MonthView';
import BookingModal from '../components/calendar/BookingModal';
import StaffFilter from '../components/calendar/StaffFilter';
import { Booking } from '../types';

// Sample staff data - replace with real data source
const sampleStaff = [
  { id: '1', name: 'John Doe', color: '#3B82F6' },
  { id: '2', name: 'Jane Smith', color: '#10B981' },
  { id: '3', name: 'Mike Johnson', color: '#8B5CF6' },
];

// Sample bookings data - replace with real data source
const sampleBookings: Booking[] = [
  {
    id: '1',
    clientId: '1',
    userId: '1', // Staff ID
    startTime: new Date(2024, 2, 15, 10, 0),
    endTime: new Date(2024, 2, 15, 11, 0),
    service: 'Haircut',
    status: 'scheduled',
    value: 50,
  },
  {
    id: '2',
    clientId: '2',
    userId: '2', // Staff ID
    startTime: new Date(2024, 2, 15, 14, 0),
    endTime: new Date(2024, 2, 15, 15, 0),
    service: 'Massage',
    status: 'scheduled',
    value: 80,
  },
];

type ViewType = 'day' | '3day' | 'week' | 'month';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleNewBooking = (bookingData: { service: string; startTime: string; duration: number }) => {
    if (!selectedDate) return;

    const [hours, minutes] = bookingData.startTime.split(':').map(Number);
    const startTime = new Date(selectedDate);
    startTime.setHours(hours, minutes);

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + bookingData.duration);

    const newBooking: Booking = {
      id: String(Date.now()),
      clientId: '1', // Replace with actual client selection
      userId: selectedStaffId || '1', // Use selected staff or default
      startTime,
      endTime,
      service: bookingData.service,
      status: 'scheduled',
      value: 0, // Replace with actual service value
    };

    setBookings([...bookings, newBooking]);
    setIsModalOpen(false);
  };

  // Filter bookings based on selected staff
  const filteredBookings = selectedStaffId
    ? bookings.filter(booking => booking.userId === selectedStaffId)
    : bookings;

  const renderView = () => {
    switch (currentView) {
      case 'day':
        return (
          <DayView
            date={currentDate}
            bookings={filteredBookings}
            onTimeSlotClick={handleDateSelect}
          />
        );
      case '3day':
        return (
          <ThreeDayView
            currentDate={currentDate}
            bookings={filteredBookings}
            onTimeSlotClick={handleDateSelect}
          />
        );
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            bookings={filteredBookings}
            onTimeSlotClick={handleDateSelect}
          />
        );
      case 'month':
        return (
          <MonthView
            currentDate={currentDate}
            bookings={filteredBookings}
            onDateSelect={handleDateSelect}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
          Calendar
        </h1>
        <div className="flex items-center space-x-4">
          <StaffFilter
            staffMembers={sampleStaff}
            selectedStaffId={selectedStaffId}
            onStaffSelect={setSelectedStaffId}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white dark:bg-dark-secondary shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
          />
          <CalendarViewSelector
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>
        {renderView()}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onSave={handleNewBooking}
      />
    </div>
  );
}