import React, { useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '../components/dashboard/stats/StatsCard';
import RevenueChart from '../components/dashboard/revenue/RevenueChart';
import RevenueMetrics from '../components/dashboard/revenue/RevenueMetrics';
import ProfitMetrics from '../components/dashboard/revenue/ProfitMetrics';
import SalesFunnel from '../components/dashboard/SalesFunnel';
import ClientRetentionChart from '../components/dashboard/ClientRetentionChart';
import TodayAppointments from '../components/dashboard/appointments/TodayAppointments';
import TimeRangeSelector from '../components/dashboard/TimeRangeSelector';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  const stats = [
    { title: 'Total Bookings', value: '2,651', change: 12, icon: Calendar },
    { title: 'Active Clients', value: '573', change: 8.2, icon: Users },
    { title: 'Revenue', value: '$12,426', change: 15.3, icon: DollarSign },
    { title: 'Growth Rate', value: '24.5%', change: 5.4, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-semibold text-gray-900 dark:text-dark-text"
        >
          Dashboard
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <TimeRangeSelector
            selectedRange={selectedTimeRange}
            onRangeChange={setSelectedTimeRange}
          />
        </motion.div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <TodayAppointments />

      <div className="grid grid-cols-1 gap-6">
        <RevenueMetrics />
        <RevenueChart />
        <ProfitMetrics data={[
          { Revenue: 5890, Profit: 4200 },
          { Revenue: 6890, Profit: 5200 }
        ]} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SalesFunnel />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ClientRetentionChart />
        </motion.div>
      </div>
    </div>
  );
}