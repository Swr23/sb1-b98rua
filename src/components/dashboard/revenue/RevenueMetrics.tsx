import React from 'react';
import { Card, Text, Metric, Flex, BadgeDelta } from '@tremor/react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  metric: string;
  subtext: string;
  icon: typeof DollarSign | typeof TrendingUp;
  color: string;
  deltaType: 'increase' | 'decrease';
  deltaValue: number;
  delay?: number;
}

function MetricCard({ 
  title, 
  metric, 
  subtext, 
  icon: Icon, 
  color, 
  deltaType, 
  deltaValue,
  delay = 0 
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg border border-white/20 dark:border-dark-border/20 p-6 hover:shadow-xl transition-shadow duration-200"
    >
      <Flex>
        <div>
          <Text className="text-sm font-medium text-gray-600 dark:text-dark-muted">{title}</Text>
          <Metric className="mt-2 text-2xl font-bold text-gray-900 dark:text-dark-text">
            {metric}
          </Metric>
          <Text className="mt-2 text-sm text-gray-500 dark:text-dark-muted">{subtext}</Text>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20">
          <Icon className={`w-6 h-6 text-${color}-500 dark:text-${color}-400`} />
        </div>
      </Flex>
      <Flex className="mt-4 space-x-2">
        <BadgeDelta deltaType={deltaType} size="sm">
          {deltaValue.toFixed(1)}%
        </BadgeDelta>
        <Text className="text-sm text-gray-500 dark:text-dark-muted">vs. previous period</Text>
      </Flex>
    </motion.div>
  );
}

export default function RevenueMetrics() {
  const metrics = [
    {
      title: 'Total Revenue',
      metric: '$6,890',
      subtext: 'Last month',
      icon: DollarSign,
      color: 'blue',
      deltaType: 'increase' as const,
      deltaValue: 12.3,
    },
    {
      title: 'Net Profit',
      metric: '$5,200',
      subtext: 'Last month',
      icon: TrendingUp,
      color: 'emerald',
      deltaType: 'increase' as const,
      deltaValue: 8.2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={metric.title} 
          {...metric} 
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}