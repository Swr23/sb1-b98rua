import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
}

export default function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  const isPositive = change > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="rounded-md bg-indigo-50 p-3">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="sr-only">{isPositive ? 'Increased' : 'Decreased'} by</span>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </motion.div>
  );
}