import React from 'react';
import { Card, Title, BarList, Flex, Text } from '@tremor/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface EmployeePerformanceProps {
  employees: any[];
}

export default function EmployeePerformance({ employees }: EmployeePerformanceProps) {
  const sortedEmployees = [...employees].sort(
    (a, b) => b.metrics.totalAmount - a.metrics.totalAmount
  );

  const performanceData = sortedEmployees.map(employee => ({
    name: employee.name,
    value: employee.metrics.totalAmount,
    icon: () => (
      <div className={`p-1 rounded-full ${
        employee === sortedEmployees[0] ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-dark-accent'
      }`}>
        {employee === sortedEmployees[0] ? (
          <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
        ) : (
          <ArrowDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </div>
    ),
  }));

  return (
    <Card className="dark:bg-dark-secondary">
      <Title className="dark:text-dark-text">Employee Performance Ranking</Title>
      <Flex className="mt-6">
        <Text className="dark:text-dark-muted">Employee</Text>
        <Text className="dark:text-dark-muted">Total Transactions</Text>
      </Flex>
      <BarList
        data={performanceData}
        className="mt-2"
        valueFormatter={(number) => `$${number.toLocaleString()}`}
      />
    </Card>
  );
}