import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label: string;
  options: Option[];
  error?: string;
}

export default function FormSelect({ label, options, error, className = '', ...props }: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1 relative">
        <select
          {...props}
          className={`
            block w-full rounded-lg border-gray-300 shadow-sm
            focus:border-blue-500 focus:ring-blue-500
            dark:bg-dark-accent dark:border-dark-border dark:text-dark-text
            disabled:bg-gray-50 disabled:text-gray-500
            appearance-none
            ${error ? 'border-red-300' : ''}
            ${className}
          `}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {error ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}