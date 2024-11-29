import React from 'react';
import { motion } from 'framer-motion';
import { Client } from '../../types';
import { format } from 'date-fns';
import { User2, Star, Clock, DollarSign } from 'lucide-react';

interface ClientListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
}

export default function ClientList({ clients, onSelectClient }: ClientListProps) {
  const getStageColor = (stage: Client['stage']) => {
    const colors = {
      lead: 'bg-yellow-100 text-yellow-800',
      consultation: 'bg-blue-100 text-blue-800',
      deposit: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
    };
    return colors[stage];
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <ul className="divide-y divide-gray-200">
        {clients.map((client) => (
          <motion.li
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: '#f9fafb' }}
            className="cursor-pointer p-4"
            onClick={() => onSelectClient(client)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                  <User2 className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{client.loyaltyPoints} points</span>
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-medium ${getStageColor(client.stage)}`}>
                  {client.stage.charAt(0).toUpperCase() + client.stage.slice(1)}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Added {format(new Date(client.createdAt), 'MMM d, yyyy')}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}