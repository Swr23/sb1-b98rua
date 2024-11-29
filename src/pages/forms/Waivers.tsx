import React from 'react';
import { motion } from 'framer-motion';
import WaiverForm from '../../components/forms/WaiverForm';

export default function Waivers() {
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-gray-900 dark:text-dark-text"
      >
        Service Waiver Form
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-gray-600 dark:text-dark-muted"
      >
        Please review and sign our service waiver form.
      </motion.p>
      <WaiverForm />
    </div>
  );
}