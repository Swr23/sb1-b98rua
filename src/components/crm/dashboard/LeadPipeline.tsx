import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Mail, DollarSign, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation';
  potentialValue: number;
  lastInteraction: Date;
  source: string;
  priority: 'low' | 'medium' | 'high';
}

const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    status: 'new',
    potentialValue: 5000,
    lastInteraction: new Date(),
    source: 'Website',
    priority: 'high'
  },
  // Add more sample leads...
];

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  proposal: 'bg-purple-100 text-purple-800',
  negotiation: 'bg-indigo-100 text-indigo-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800'
};

export default function LeadPipeline() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Lead['priority'] | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredLeads = sampleLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesSource;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
          Lead Pipeline
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-accent dark:text-dark-text"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Lead['status'] | 'all')}
            className="border border-gray-300 dark:border-dark-border rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-accent dark:text-dark-text"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Lead['priority'] | 'all')}
            className="border border-gray-300 dark:border-dark-border rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-accent dark:text-dark-text"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-dark-accent rounded-lg border border-gray-200 dark:border-dark-border p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900 dark:text-dark-text">{lead.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600 dark:text-dark-muted">
                <Mail className="h-4 w-4 mr-2" />
                {lead.email}
              </div>
              <div className="flex items-center text-gray-600 dark:text-dark-muted">
                <Phone className="h-4 w-4 mr-2" />
                {lead.phone}
              </div>
              <div className="flex items-center text-gray-600 dark:text-dark-muted">
                <DollarSign className="h-4 w-4 mr-2" />
                ${lead.potentialValue.toLocaleString()}
              </div>
              <div className="flex items-center text-gray-600 dark:text-dark-muted">
                <Clock className="h-4 w-4 mr-2" />
                Last contact: {format(lead.lastInteraction, 'MMM d, yyyy')}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[lead.priority]}`}>
                {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)} Priority
              </span>
              <span className="text-xs text-gray-500 dark:text-dark-muted">
                Source: {lead.source}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}