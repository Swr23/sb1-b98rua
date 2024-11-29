import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import { useForm } from './useForm';

interface WaiverFormData {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  signature: string;
  date: string;
  acknowledgement: boolean;
}

const initialFormData: WaiverFormData = {
  fullName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  signature: '',
  date: new Date().toISOString().split('T')[0],
  acknowledgement: false,
};

const waiverText = `
I understand and agree that:

1. The services provided are not substitutes for medical treatment or medications.
2. I am responsible for consulting my physician about any contraindications.
3. I will inform the practitioner of any physical, mental, or medical conditions.
4. I release the practitioner from any liability related to the services provided.
5. I understand that any information provided will be kept confidential.
6. I agree to give 24 hours notice for cancellations or be subject to cancellation fees.

By signing below, I acknowledge that I have read, understood, and agree to the terms above.
`;

export default function WaiverForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit,
    isValid 
  } = useForm<WaiverFormData>({
    initialData: initialFormData,
    onSubmit: async (data) => {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setIsSuccess(true);
    },
    validationRules: {
      fullName: (value) => value.length >= 2 || 'Full name is required',
      dateOfBirth: (value) => value.length > 0 || 'Date of birth is required',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Valid email is required',
      phone: (value) => /^\+?[\d\s-]{10,}$/.test(value) || 'Valid phone number is required',
      signature: (value) => value.length >= 2 || 'Signature is required',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />
          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        <div className="p-4 bg-gray-50 dark:bg-dark-accent rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
            Waiver Agreement
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-dark-muted font-sans">
              {waiverText}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="acknowledgement"
                name="acknowledgement"
                type="checkbox"
                checked={formData.acknowledgement}
                onChange={(e) => handleChange({
                  target: {
                    name: 'acknowledgement',
                    value: e.target.checked
                  }
                } as any)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
            </div>
            <label
              htmlFor="acknowledgement"
              className="ml-3 text-sm text-gray-600 dark:text-dark-muted"
            >
              I have read and agree to the terms above
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Electronic Signature"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              error={errors.signature}
              required
              placeholder="Type your full name as signature"
            />
            <FormInput
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid || !formData.acknowledgement || isSubmitting || isSuccess}
            className={`
              flex items-center px-6 py-2 rounded-lg text-white font-medium
              transition-all duration-200
              ${isSuccess
                ? 'bg-green-500'
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
                Submitted Successfully
              </>
            ) : (
              'Sign & Submit'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}