import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, BarChart, DonutChart } from '@tremor/react';
import { DollarSign, CreditCard, PiggyBank, User2, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeTransaction {
  id: string;
  type: 'cash' | 'card' | 'deposit';
  amount: number;
  date: Date;
}

interface Employee {
  id: string;
  name: string;
  transactions: EmployeeTransaction[];
  metrics: {
    totalAmount: number;
    totalCount: number;
    cash: { amount: number; count: number };
    card: { amount: number; count: number };
    deposit: { amount: number; count: number };
  };
}

// Sample data - replace with actual data source
const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    transactions: [
      { id: '1', type: 'cash', amount: 150, date: new Date() },
      { id: '2', type: 'card', amount: 250, date: new Date() },
      { id: '3', type: 'deposit', amount: 100, date: new Date() },
    ],
    metrics: {
      totalAmount: 500,
      totalCount: 3,
      cash: { amount: 150, count: 1 },
      card: { amount: 250, count: 1 },
      deposit: { amount: 100, count: 1 },
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    transactions: [
      { id: '4', type: 'cash', amount: 200, date: new Date() },
      { id: '5', type: 'card', amount: 300, date: new Date() },
      { id: '6', type: 'deposit', amount: 150, date: new Date() },
    ],
    metrics: {
      totalAmount: 650,
      totalCount: 3,
      cash: { amount: 200, count: 1 },
      card: { amount: 300, count: 1 },
      deposit: { amount: 150, count: 1 },
    },
  },
];

export default function EmployeeTransactionReport() {
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const calculateTotalMetrics = () => {
    return sampleEmployees.reduce(
      (totals, employee) => ({
        totalAmount: totals.totalAmount + employee.metrics.totalAmount,
        totalCount: totals.totalCount + employee.metrics.totalCount,
        cash: {
          amount: totals.cash.amount + employee.metrics.cash.amount,
          count: totals.cash.count + employee.metrics.cash.count,
        },
        card: {
          amount: totals.card.amount + employee.metrics.card.amount,
          count: totals.card.count + employee.metrics.card.count,
        },
        deposit: {
          amount: totals.deposit.amount + employee.metrics.deposit.amount,
          count: totals.deposit.count + employee.metrics.deposit.count,
        },
      }),
      {
        totalAmount: 0,
        totalCount: 0,
        cash: { amount: 0, count: 0 },
        card: { amount: 0, count: 0 },
        deposit: { amount: 0, count: 0 },
      }
    );
  };

  const totalMetrics = calculateTotalMetrics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Total Cash</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
                ${totalMetrics.cash.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
                {totalMetrics.cash.count} transactions
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-muted">Total Card</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
                ${totalMetrics.card.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
                {totalMetrics.card.count} transactions
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm text-gray-600 dark:text-dark-muted">Total Deposits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
                ${totalMetrics.deposit.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
                {totalMetrics.deposit.count} transactions
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-xl bg-white/80 dark:bg-dark-secondary/80 rounded-xl shadow-lg"
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-6">
            Employee Breakdown
          </h2>

          <div className="space-y-6">
            {sampleEmployees.map((employee) => (
              <div key={employee.id}>
                <motion.button
                  onClick={() => setExpandedEmployee(
                    expandedEmployee === employee.id ? null : employee.id
                  )}
                  className="w-full"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-accent rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                        <User2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-dark-text">
                          {employee.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-dark-muted">
                          {employee.metrics.totalCount} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-dark-text">
                        ${employee.metrics.totalAmount.toLocaleString()}
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 dark:text-green-400">
                          +12.5%
                        </span>
                        <ArrowUpRight className="w-4 h-4 ml-1 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </div>
                </motion.button>

                {expandedEmployee === employee.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pl-14 space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-dark-muted">Cash</p>
                          <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-dark-text">
                          ${employee.metrics.cash.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-muted">
                          {employee.metrics.cash.count} transactions
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-dark-muted">Card</p>
                          <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-dark-text">
                          ${employee.metrics.card.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-muted">
                          {employee.metrics.card.count} transactions
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-dark-muted">Deposits</p>
                          <PiggyBank className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-dark-text">
                          ${employee.metrics.deposit.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-muted">
                          {employee.metrics.deposit.count} transactions
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text mb-2">
                        Recent Transactions
                      </h4>
                      <div className="space-y-2">
                        {employee.transactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-accent rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              {transaction.type === 'cash' && (
                                <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                              )}
                              {transaction.type === 'card' && (
                                <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                              {transaction.type === 'deposit' && (
                                <PiggyBank className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              )}
                              <span className="text-sm text-gray-900 dark:text-dark-text capitalize">
                                {transaction.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
                                ${transaction.amount.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-dark-muted">
                                {format(transaction.date, 'MMM d, h:mm a')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}