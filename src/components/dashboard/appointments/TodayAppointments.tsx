import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Clock, AlertCircle, CheckCircle, XCircle, User } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  time: Date;
  duration: number;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  staffMember: {
    id: string;
    name: string;
    color: string;
  };
}

// Sample data - replace with actual data source
const appointments: Appointment[] = [
  {
    id: '1',
    clientName: 'John Smith',
    time: new Date(new Date().setHours(9, 0)),
    duration: 60,
    service: 'Haircut',
    status: 'confirmed',
    staffMember: {
      id: '1',
      name: 'Sarah Johnson',
      color: '#3B82F6'
    }
  },
  {
    id: '2',
    clientName: 'Emma Wilson',
    time: new Date(new Date().setHours(10, 30)),
    duration: 90,
    service: 'Full Color',
    status: 'pending',
    notes: 'First-time client, consultation needed',
    staffMember: {
      id: '2',
      name: 'Mike Brown',
      color: '#10B981'
    }
  },
  {
    id: '3',
    clientName: 'David Lee',
    time: new Date(new Date().setHours(13, 0)),
    duration: 45,
    service: 'Beard Trim',
    status: 'confirmed',
    staffMember: {
      id: '1',
      name: 'Sarah Johnson',
      color: '#3B82F6'
    }
  }
];

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    className: 'text-green-500 dark:text-green-400',
    label: 'Confirmed'
  },
  pending: {
    icon: AlertCircle,
    className: 'text-yellow-500 dark:text-yellow-400',
    label: 'Pending'
  },
  cancelled: {
    icon: XCircle,
    className: 'text-red-500 dark:text-red-400',
    label: 'Cancelled'
  }
};

export default function TodayAppointments() {
  const sortedAppointments = [...appointments].sort((a, b) => a.time.getTime() - b.time.getTime());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg border border-white/20 dark:border-dark-border/20"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            Today's Appointments
          </h2>
          <div className="text-sm text-gray-500 dark:text-dark-muted">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>
        </div>

        <div className="space-y-4">
          {sortedAppointments.map((appointment) => {
            const StatusIcon = statusConfig[appointment.status].icon;

            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-dark-accent/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-dark-accent transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: appointment.staffMember.color }}
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-dark-text">
                      {appointment.clientName}
                    </h3>
                    <div className="flex items-center mt-1 space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-dark-muted">
                        <Clock className="w-4 h-4 mr-1" />
                        {format(appointment.time, 'h:mm a')} ({appointment.duration}min)
                      </div>
                      <div className="text-sm text-gray-500 dark:text-dark-muted">
                        {appointment.service}
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-dark-muted">
                        Note: {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 dark:text-dark-muted">
                    {appointment.staffMember.name}
                  </div>
                  <div className={`flex items-center ${statusConfig[appointment.status].className}`}>
                    <StatusIcon className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">
                      {statusConfig[appointment.status].label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {sortedAppointments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-dark-muted">
              No appointments scheduled for today
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}