import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import { useForm } from './useForm';

interface IntakeFormData {
  fullName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  occupation: string;
  referralSource: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
  previousTreatments: string;
}

const initialFormData: IntakeFormData = {
  fullName: '',
  dateOfBirth: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  emergencyContact: '',
  emergencyPhone: '',
  occupation: '',
  referralSource: '',
  medicalConditions: '',
  medications: '',
  allergies: '',
  previousTreatments: '',
};

export default function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit,
    isValid 
  } = useForm<IntakeFormData>({
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
      address: (value) => value.length > 0 || 'Address is required',
      city: (value) => value.length > 0 || 'City is required',
      state: (value) => value.length > 0 || 'State is required',
      zipCode: (value) => /^\d{5}(-\d{4})?$/.test(value) || 'Valid ZIP code is required',
      emergencyContact: (value) => value.length > 0 || 'Emergency contact is required',
      emergencyPhone: (value) => /^\+?[\d\s-]{10,}$/.test(value) || 'Valid phone number is required',
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

        <div className="space-y-4">
          <FormInput
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
            <FormInput
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required
            />
            <FormInput
              label="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Emergency Contact Name"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            error={errors.emergencyContact}
            required
          />
          <FormInput
            label="Emergency Contact Phone"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            error={errors.emergencyPhone}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
          <FormInput
            label="How did you hear about us?"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-4">
          <FormTextarea
            label="Medical Conditions"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            placeholder="Please list any medical conditions we should be aware of"
            rows={3}
          />
          <FormTextarea
            label="Current Medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            placeholder="Please list any medications you are currently taking"
            rows={3}
          />
          <FormTextarea
            label="Allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="Please list any allergies"
            rows={2}
          />
          <FormTextarea
            label="Previous Treatments"
            name="previousTreatments"
            value={formData.previousTreatments}
            onChange={handleChange}
            placeholder="Please list any relevant previous treatments"
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid || isSubmitting || isSuccess}
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
              'Submit Form'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}