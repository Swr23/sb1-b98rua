import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, Loader2 } from 'lucide-react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import { useForm } from './useForm';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  serviceType: '',
  message: '',
};

export default function InteractiveForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit, 
    isValid 
  } = useForm<FormData>({
    initialData: initialFormData,
    onSubmit: async (data) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsSuccess(false);
      }, 2000);
    },
    validationRules: {
      firstName: (value) => value.length >= 2 || 'First name must be at least 2 characters',
      lastName: (value) => value.length >= 2 || 'Last name must be at least 2 characters',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email address',
      phone: (value) => /^\+?[\d\s-]{10,}$/.test(value) || 'Invalid phone number',
      serviceType: (value) => value.length > 0 || 'Please select a service type',
    },
  });

  const serviceTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'booking', label: 'Booking' },
    { value: 'inquiry', label: 'General Inquiry' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={false}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg overflow-hidden"
      >
        <button
          onClick={() => !isSuccess && setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-primary"
        >
          <span className="text-lg font-medium text-gray-900 dark:text-dark-text">
            Contact Us
          </span>
          <motion.div
            variants={{
              expanded: { rotate: 180 },
              collapsed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="ml-4"
          >
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-dark-muted" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                </div>

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <FormInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />

                <FormSelect
                  label="Service Type"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  options={serviceTypes}
                  error={errors.serviceType}
                  required
                />

                <FormTextarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`
                      flex items-center px-4 py-2 rounded-lg text-white font-medium
                      transition-all duration-200
                      ${isSuccess
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Submitted!
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}