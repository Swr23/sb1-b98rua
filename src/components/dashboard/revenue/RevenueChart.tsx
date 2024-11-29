import React, { useState } from 'react';
import { Card, Title, AreaChart, TabGroup, TabList, Tab } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';

const chartdata = [
  {
    date: 'Jan 22',
    Revenue: 2890,
    Profit: 2400,
    Expenses: 490
  },
  {
    date: 'Feb 22',
    Revenue: 3890,
    Profit: 3200,
    Expenses: 690
  },
  {
    date: 'Mar 22',
    Revenue: 4890,
    Profit: 3800,
    Expenses: 1090
  },
  {
    date: 'Apr 22',
    Revenue: 4950,
    Profit: 3900,
    Expenses: 1050
  },
  {
    date: 'May 22',
    Revenue: 5890,
    Profit: 4200,
    Expenses: 1690
  },
  {
    date: 'Jun 22',
    Revenue: 6890,
    Profit: 5200,
    Expenses: 1690
  },
];

const timeRanges = [
  { id: '1', label: '6 Months' },
  { id: '2', label: 'YTD' },
  { id: '3', label: 'All Time' }
];

export default function RevenueChart() {
  const [selectedView, setSelectedView] = useState('1');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg border border-white/20 dark:border-dark-border/20"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <Title className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            Revenue & Profit Overview
          </Title>
          <TabGroup 
            index={parseInt(selectedView) - 1} 
            onIndexChange={(index) => setSelectedView((index + 1).toString())}
          >
            <TabList variant="solid" className="bg-gray-100/80 dark:bg-dark-accent/80">
              {timeRanges.map((range) => (
                <Tab 
                  key={range.id}
                  className="text-sm font-medium text-gray-600 dark:text-dark-muted"
                >
                  {range.label}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AreaChart
              className="h-72 mt-4"
              data={chartdata}
              index="date"
              categories={["Revenue", "Profit", "Expenses"]}
              colors={["blue", "emerald", "rose"]}
              valueFormatter={(number) => `$${number.toLocaleString()}`}
              yAxisWidth={60}
              showAnimation={true}
              showLegend={true}
              showGridLines={false}
              showTooltip={true}
              curveType="natural"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}