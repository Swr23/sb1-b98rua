import React from 'react';
import { Card, Title, BarList } from '@tremor/react';
import { motion } from 'framer-motion';

const data = [
  {
    name: 'Lead',
    value: 456,
    color: 'indigo',
  },
  {
    name: 'Consultation',
    value: 351,
    color: 'blue',
  },
  {
    name: 'Deposit',
    value: 271,
    color: 'cyan',
  },
  {
    name: 'Ready',
    value: 191,
    color: 'teal',
  },
];

export default function SalesFunnel() {
  return (
    <Card className="bg-white rounded-xl shadow-md">
      <Title>Sales Funnel</Title>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BarList
          data={data}
          className="mt-4"
          valueFormatter={(number) => Intl.NumberFormat('us').format(number).toString()}
        />
      </motion.div>
    </Card>
  );
}