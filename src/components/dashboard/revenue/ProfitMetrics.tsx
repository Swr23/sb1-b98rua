import React from 'react';
import { Card, Title, Text, Metric, Grid } from '@tremor/react';
import { motion } from 'framer-motion';

interface MetricTileProps {
  title: string;
  value: string;
  subtitle: string;
  delay?: number;
}

function MetricTile({ title, value, subtitle, delay = 0 }: MetricTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg border border-white/20 dark:border-dark-border/20 p-6 hover:shadow-xl transition-shadow duration-200"
    >
      <Title className="text-sm font-medium text-gray-600 dark:text-dark-muted">
        {title}
      </Title>
      <Metric className="mt-2 text-2xl font-bold text-gray-900 dark:text-dark-text">
        {value}
      </Metric>
      <Text className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
        {subtitle}
      </Text>
    </motion.div>
  );
}

export default function ProfitMetrics({ data }: { data: any[] }) {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const profitMargin = ((latestData.Profit / latestData.Revenue) * 100).toFixed(1);
  const monthlyGrowth = ((latestData.Revenue - previousData.Revenue) / previousData.Revenue * 100).toFixed(1);

  const metrics = [
    {
      title: 'Profit Margin',
      value: `${profitMargin}%`,
      subtitle: 'Last month performance'
    },
    {
      title: 'Monthly Growth',
      value: `${monthlyGrowth}%`,
      subtitle: 'Revenue increase'
    }
  ];

  return (
    <Grid numItems={1} numItemsSm={2} className="gap-6">
      {metrics.map((metric, index) => (
        <MetricTile
          key={metric.title}
          {...metric}
          delay={index * 0.1}
        />
      ))}
    </Grid>
  );
}