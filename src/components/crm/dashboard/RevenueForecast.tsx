import React from 'react';
import { motion } from 'framer-motion';
import { Card, Title, BarChart, DonutChart, AreaChart } from '@tremor/react';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

const projectionData = [
  {
    month: 'Current',
    'Projected Revenue': 45000,
    'Target': 50000,
    'Probability Weighted': 38250
  },
  {
    month: '30 Days',
    'Projected Revenue': 52000,
    'Target': 55000,
    'Probability Weighted': 44200
  },
  {
    month: '60 Days',
    'Projected Revenue': 58000,
    'Target': 60000,
    'Probability Weighted': 49300
  },
  {
    month: '90 Days',
    'Projected Revenue': 65000,
    'Target': 65000,
    'Probability Weighted': 55250
  }
];

const conversionData = [
  { name: 'Converted', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Lost', value: 10 }
];

export default function RevenueForecast() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">
                Projected Revenue (90 Days)
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-2">
                $65,000
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">
                Average Deal Size
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-2">
                $2,850
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-2">
                65%
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg"
        >
          <Card>
            <Title>Revenue Projections</Title>
            <AreaChart
              className="h-72 mt-4"
              data={projectionData}
              index="month"
              categories={["Projected Revenue", "Target", "Probability Weighted"]}
              colors={["blue", "green", "purple"]}
              valueFormatter={(number) => `$${number.toLocaleString()}`}
              showAnimation={true}
              showLegend={true}
              showGridLines={false}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg"
        >
          <Card>
            <Title>Conversion Analytics</Title>
            <DonutChart
              className="h-72 mt-4"
              data={conversionData}
              category="value"
              index="name"
              valueFormatter={(number) => `${number}%`}
              colors={["emerald", "blue", "rose"]}
              showAnimation={true}
              showTooltip={true}
            />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}