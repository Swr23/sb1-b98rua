import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, TabGroup, TabList, Tab, BarChart, DonutChart } from '@tremor/react';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import TransactionTable from './TransactionTable';
import TransactionSummary from './TransactionSummary';
import EmployeePerformance from './EmployeePerformance';

interface Transaction {
  id: string;
  employeeId: string;
  type: 'cash' | 'card' | 'deposit';
  amount: number;
  date: Date;
}

interface Employee {
  id: string;
  name: string;
  transactions: Transaction[];
}

// Sample data - replace with actual data source
const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    transactions: [
      { id: '1', employeeId: '1', type: 'cash', amount: 150, date: new Date() },
      { id: '2', employeeId: '1', type: 'card', amount: 250, date: new Date() },
      { id: '3', employeeId: '1', type: 'deposit', amount: 100, date: new Date() },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    transactions: [
      { id: '4', employeeId: '2', type: 'cash', amount: 200, date: new Date() },
      { id: '5', employeeId: '2', type: 'card', amount: 300, date: new Date() },
      { id: '6', employeeId: '2', type: 'deposit', amount: 150, date: new Date() },
    ],
  },
];

export default function WeeklyTransactionReport() {
  const [selectedView, setSelectedView] = useState('current');
  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const previousWeekStart = startOfWeek(subDays(currentDate, 7));
  const previousWeekEnd = endOfWeek(subDays(currentDate, 7));

  const calculateEmployeeMetrics = (employee: Employee) => {
    const totals = {
      cash: { amount: 0, count: 0 },
      card: { amount: 0, count: 0 },
      deposit: { amount: 0, count: 0 },
    };

    employee.transactions.forEach(transaction => {
      totals[transaction.type].amount += transaction.amount;
      totals[transaction.type].count += 1;
    });

    return {
      totalAmount: Object.values(totals).reduce((sum, { amount }) => sum + amount, 0),
      totalCount: Object.values(totals).reduce((sum, { count }) => sum + count, 0),
      ...totals,
    };
  };

  const employeeMetrics = sampleEmployees.map(employee => ({
    ...employee,
    metrics: calculateEmployeeMetrics(employee),
  }));

  const totalTransactions = employeeMetrics.reduce(
    (total, employee) => total + employee.metrics.totalCount,
    0
  );

  const chartData = employeeMetrics.map(employee => ({
    name: employee.name,
    'Cash Transactions': employee.metrics.cash.amount,
    'Card Transactions': employee.metrics.card.amount,
    'Deposits': employee.metrics.deposit.amount,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Weekly Transaction Report
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {format(weekStart, 'MM/dd/yy')} - {format(weekEnd, 'MM/dd/yy')}
          </p>
        </div>
        <TabGroup index={selectedView === 'current' ? 0 : 1} onIndexChange={(index) => setSelectedView(index === 0 ? 'current' : 'previous')}>
          <TabList variant="solid" className="bg-gray-100/80 dark:bg-dark-accent/80">
            <Tab className="text-sm text-gray-700 dark:text-white">Last 30 Days</Tab>
            <Tab className="text-sm text-gray-700 dark:text-white">Last Quarter</Tab>
            <Tab className="text-sm text-gray-700 dark:text-white">Last Year</Tab>
          </TabList>
        </TabGroup>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg"
        >
          <Card className="bg-transparent">
            <Title className="text-gray-900 dark:text-white">Transaction Distribution</Title>
            <BarChart
              className="mt-6"
              data={chartData}
              index="name"
              categories={['Cash Transactions', 'Card Transactions', 'Deposits']}
              colors={['emerald', 'violet', 'indigo']}
              valueFormatter={(number) => `$${number.toLocaleString()}`}
              yAxisWidth={48}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg"
        >
          <Card className="bg-transparent">
            <Title className="text-gray-900 dark:text-white">Employee Performance</Title>
            <DonutChart
              className="mt-6"
              data={[
                { name: 'Cash', value: employeeMetrics.reduce((sum, emp) => sum + emp.metrics.cash.amount, 0) },
                { name: 'Card', value: employeeMetrics.reduce((sum, emp) => sum + emp.metrics.card.amount, 0) },
                { name: 'Deposits', value: employeeMetrics.reduce((sum, emp) => sum + emp.metrics.deposit.amount, 0) },
              ]}
              category="value"
              index="name"
              valueFormatter={(number) => `$${number.toLocaleString()}`}
              colors={['emerald', 'violet', 'indigo']}
            />
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <TransactionSummary employees={employeeMetrics} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <EmployeePerformance employees={employeeMetrics} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <TransactionTable employees={employeeMetrics} />
      </motion.div>
    </div>
  );
}