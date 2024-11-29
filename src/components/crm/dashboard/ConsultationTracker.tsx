import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User2, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Consultation {
  id: string;
  clientName: string;
  date: Date;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  duration: number;
}

const sampleConsultations: Consultation[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    date: new Date(),
    time: '10:00 AM',
    type: 'Initial Consultation',
    status: 'scheduled',
    duration: 60
  },
  // Add more sample consultations...
];

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

const statusIcons = {
  scheduled: Clock,
  completed: CheckCircle,
  cancelled: XCircle
};

export default function ConsultationTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
          Consultation Tracker
        </h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Schedule New
        </button>
      </div>

      <div className="space-y-4">
        {sampleConsultations.map((consultation) => {
          const StatusIcon = statusIcons[consultation.status];
          
          return (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <User2 className="h-8 w-8 text-gray-400 dark:text-dark-muted" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-dark-text">
                    {consultation.clientName}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-dark-muted">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(consultation.date, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {consultation.time} ({consultation.duration}min)
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusColors[consultation.status]}`}>
                  <StatusIcon className="h-4 w-4 mr-1" />
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
                <button className="text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text">
                  <Clock className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}