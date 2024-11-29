import React from 'react';
import { Card, Title } from '@tremor/react';
import { format } from 'date-fns';

interface TransactionTableProps {
  employees: any[];
}

export default function TransactionTable({ employees }: TransactionTableProps) {
  return (
    <Card className="dark:bg-dark-secondary">
      <Title className="dark:text-dark-text">Detailed Transaction List</Title>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-dark-accent text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-dark-accent text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">
                  Transaction Type
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-dark-accent text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-dark-accent text-left text-xs font-medium text-gray-500 dark:text-dark-muted uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-secondary divide-y divide-gray-200 dark:divide-dark-border">
              {employees.map(employee =>
                employee.transactions.map((transaction: any) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text capitalize">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-dark-text">
                      {format(transaction.date, 'MM/dd/yy HH:mm')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}