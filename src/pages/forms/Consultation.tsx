import React from 'react';
import InteractiveForm from '../../components/forms/InteractiveForm';

export default function Consultation() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
        Consultation Form
      </h1>
      <InteractiveForm />
    </div>
  );
}