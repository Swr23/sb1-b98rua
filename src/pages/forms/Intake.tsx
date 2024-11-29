import React from 'react';
import { motion } from 'framer-motion';
import IntakeForm from '../../components/forms/IntakeForm';

export default function Intake() {
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-gray-900 dark:text-dark-text"
      >
        Client Intake Form
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-600 dark:text-dark-muted"
      >
        Please complete this form to help us better understand your needs and preferences.
      </motion.p>
      <IntakeForm />
    </div>
  );
}