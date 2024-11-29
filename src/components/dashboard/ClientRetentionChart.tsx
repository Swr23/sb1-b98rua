import React, { useState } from 'react';
import { Card, Title, DonutChart, Text, Flex, TabGroup, TabList, Tab } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, UserMinus } from 'lucide-react';

const retentionData = {
  current: [
    { name: 'Returning Clients', value: 646, color: 'cyan' },
    { name: 'New Clients', value: 432, color: 'blue' },
    { name: 'One-time Clients', value: 243, color: 'indigo' }
  ],
  previous: [
    { name: 'Returning Clients', value: 589, color: 'cyan' },
    { name: 'New Clients', value: 378, color: 'blue' },
    { name: 'One-time Clients', value: 267, color: 'indigo' }
  ]
};

const icons = {
  'Returning Clients': Users,
  'New Clients': UserPlus,
  'One-time Clients': UserMinus
};

const calculatePercentages = (data: typeof retentionData.current) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));
};

const calculateGrowth = (current: number, previous: number) => {
  return ((current - previous) / previous * 100).toFixed(1);
};

export default function ClientRetentionChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const currentData = calculatePercentages(retentionData.current);
  const previousData = calculatePercentages(retentionData.previous);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg border border-white/20 dark:border-dark-border/20"
    >
      <div className="p-6">
        <Flex>
          <Title className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            Client Retention
          </Title>
          <TabGroup index={parseInt(selectedPeriod) - 1} onIndexChange={(index) => setSelectedPeriod((index + 1).toString())}>
            <TabList variant="solid" className="bg-gray-100/80 dark:bg-dark-accent/80">
              <Tab className="text-sm">Last 30 Days</Tab>
              <Tab className="text-sm">Last Quarter</Tab>
              <Tab className="text-sm">Last Year</Tab>
            </TabList>
          </TabGroup>
        </Flex>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <DonutChart
              data={currentData}
              category="value"
              index="name"
              valueFormatter={(number) => `${number.toLocaleString()} clients`}
              colors={["cyan", "blue", "indigo"]}
              showAnimation={true}
              className="h-60"
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            {currentData.map((segment, index) => {
              const Icon = icons[segment.name as keyof typeof icons];
              const previousValue = previousData[index].value;
              const growth = calculateGrowth(segment.value, previousValue);
              const isPositive = parseFloat(growth) > 0;

              return (
                <motion.div
                  key={segment.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg transition-colors duration-200 cursor-pointer ${
                    selectedSegment === segment.name
                      ? 'bg-gray-50 dark:bg-dark-accent'
                      : 'hover:bg-gray-50 dark:hover:bg-dark-accent'
                  }`}
                  onClick={() => setSelectedSegment(selectedSegment === segment.name ? null : segment.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${segment.color}-100 dark:bg-${segment.color}-900/20`}>
                        <Icon className={`w-5 h-5 text-${segment.color}-500 dark:text-${segment.color}-400`} />
                      </div>
                      <div>
                        <Text className="font-medium text-gray-900 dark:text-dark-text">
                          {segment.name}
                        </Text>
                        <Text className="text-gray-500 dark:text-dark-muted">
                          {segment.value.toLocaleString()} clients
                        </Text>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text className="font-medium text-gray-900 dark:text-dark-text">
                        {segment.percentage}%
                      </Text>
                      <Text className={`text-sm ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {isPositive ? '↑' : '↓'} {Math.abs(parseFloat(growth))}%
                      </Text>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedSegment === segment.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Text className="text-gray-500 dark:text-dark-muted">Previous</Text>
                            <Text className="font-medium text-gray-900 dark:text-dark-text">
                              {previousValue.toLocaleString()}
                            </Text>
                          </div>
                          <div>
                            <Text className="text-gray-500 dark:text-dark-muted">Current</Text>
                            <Text className="font-medium text-gray-900 dark:text-dark-text">
                              {segment.value.toLocaleString()}
                            </Text>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}