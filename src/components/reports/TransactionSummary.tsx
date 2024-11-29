import React from 'react';
import { Card, Title, Grid, Text, Metric } from '@tremor/react';
import { CreditCard, DollarSign, PiggyBank, TrendingUp } from 'lucide-react';

interface TransactionSummaryProps {
  employees: any[];
}

export default function TransactionSummary({ employees }: TransactionSummaryProps) {
  const totalMetrics = employees.reduce(
    (totals, employee) => ({
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
      cash: { amount: 0, count: 0 },
      card: { amount: 0, count: 0 },
      deposit: { amount: 0, count: 0 },
    }
  );

  const totalAmount = Object.values(totalMetrics).reduce(
    (sum, { amount }) => sum + amount,
    0
  );

  const metrics = [
    {
      title: 'Total Transactions',
      metric: `$${totalAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: 'blue',
    },
    {
      title: 'Cash Transactions',
      metric: `$${totalMetrics.cash.amount.toLocaleString()}`,
      subtext: `${totalMetrics.cash.count} transactions`,
      icon: DollarSign,
      color: 'emerald',
    },
    {
      title: 'Card Transactions',
      metric: `$${totalMetrics.card.amount.toLocaleString()}`,
      subtext: `${totalMetrics.card.count} transactions`,
      icon: CreditCard,
      color: 'violet',
    },
    {
      title: 'Deposits',
      metric: `$${totalMetrics.deposit.amount.toLocaleString()}`,
      subtext: `${totalMetrics.deposit.count} transactions`,
      icon: PiggyBank,
      color: 'indigo',
    },
  ];

  return (
    <Card className="dark:bg-dark-secondary">
      <Title className="dark:text-dark-text">Transaction Summary</Title>
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mt-6">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} decoration="top" decorationColor={item.color as any} className="dark:bg-dark-accent">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="dark:text-dark-muted">{item.title}</Text>
                  <Metric className="dark:text-dark-text">{item.metric}</Metric>
                  {item.subtext && (
                    <Text className="mt-2 dark:text-dark-muted">{item.subtext}</Text>
                  )}
                </div>
                <Icon className={`h-6 w-6 text-${item.color}-500`} />
              </div>
            </Card>
          );
        })}
      </Grid>
    </Card>
  );
}