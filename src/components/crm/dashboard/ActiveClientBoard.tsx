import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User2, DollarSign, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Client {
  id: string;
  name: string;
  projectValue: number;
  startDate: Date;
  phase: 'consultation' | 'design' | 'in-progress' | 'review' | 'completed';
  progress: number;
  nextAction: string;
  nextActionDate: Date;
}

const sampleClients: Client[] = [
  {
    id: '1',
    name: 'Michael Brown',
    projectValue: 2500,
    startDate: new Date(),
    phase: 'design',
    progress: 35,
    nextAction: 'Review design mockups',
    nextActionDate: new Date()
  },
  // Add more sample clients...
];

const phaseColors = {
  'consultation': 'bg-blue-100 text-blue-800',
  'design': 'bg-purple-100 text-purple-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'review': 'bg-orange-100 text-orange-800',
  'completed': 'bg-green-100 text-green-800'
};

export default function ActiveClientBoard() {
  const [sortBy, setSortBy] = useState<'value' | 'date'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedClients = [...sampleClients].sort((a, b) => {
    if (sortBy === 'value') {
      return sortOrder === 'desc' 
        ? b.projectValue - a.projectValue
        : a.projectValue - b.projectValue;
    } else {
      return sortOrder === 'desc'
        ? b.startDate.getTime() - a.startDate.getTime()
        : a.startDate.getTime() - b.startDate.getTime();
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
          Active Clients
        </h2>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'value' | 'date')}
            className="border border-gray-300 dark:border-dark-border rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-accent dark:text-dark-text"
          >
            <option value="value">Sort by Value</option>
            <option value="date">Sort by Date</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-accent"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedClients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 dark:bg-dark-accent rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <User2 className="h-8 w-8 text-gray-400 dark:text-dark-muted" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-dark-text">
                    {client.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-dark-muted">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${client.projectValue.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Started {format(client.startDate, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${phaseColors[client.phase]}`}>
                {client.phase.charAt(0).toUpperCase() + client.phase.slice(1)}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  Progress
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
                  {client.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${client.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500 dark:text-dark-muted">
                <ArrowRight className="h-4 w-4 mr-2" />
                Next: {client.nextAction}
              </div>
              <div className="flex items-center text-gray-500 dark:text-dark-muted">
                <Calendar className="h-4 w-4 mr-2" />
                Due {format(client.nextActionDate, 'MMM d')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}