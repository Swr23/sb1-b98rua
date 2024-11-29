import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, DollarSign, Receipt, Loader2, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentFormData {
  clientName: string;
  amount: string;
  paymentMethod: 'card' | 'cash';
  description: string;
  email: string;
  sendReceipt: boolean;
}

const initialFormData: PaymentFormData = {
  clientName: '',
  amount: '',
  paymentMethod: 'card',
  description: '',
  email: '',
  sendReceipt: true,
};

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState<PaymentFormData>(initialFormData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState<'details' | 'confirm' | 'complete'>('details');

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setIsSuccess(false);
      setIsProcessing(false);
      setStep('details');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('confirm');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate transaction ID and store payment details
    const transactionId = `TXN-${Date.now()}`;
    const paymentRecord = {
      ...formData,
      transactionId,
      timestamp: new Date(),
      status: 'completed',
    };

    // Store in local storage for demo purposes
    const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    localStorage.setItem('payments', JSON.stringify([...existingPayments, paymentRecord]));

    setIsProcessing(false);
    setIsSuccess(true);
    setStep('complete');

    // Close modal after success
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'details':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-dark-muted">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-dark-border pl-8 pr-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    formData.paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    formData.paymentMethod === 'cash'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Cash
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Email for Receipt
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendReceipt"
                checked={formData.sendReceipt}
                onChange={(e) => setFormData({ ...formData, sendReceipt: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="sendReceipt" className="ml-2 text-sm text-gray-600 dark:text-dark-muted">
                Send receipt via email
              </label>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-dark-accent rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
                Payment Summary
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-dark-muted">Client</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {formData.clientName}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-dark-muted">Amount</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {formatCurrency(Number(formData.amount))}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-dark-muted">Payment Method</dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-dark-text capitalize">
                    {formData.paymentMethod}
                  </dd>
                </div>
                {formData.description && (
                  <div className="pt-3 border-t border-gray-200 dark:border-dark-border">
                    <dt className="text-sm text-gray-500 dark:text-dark-muted mb-1">Description</dt>
                    <dd className="text-sm text-gray-900 dark:text-dark-text">
                      {formData.description}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="flex items-center">
              <Receipt className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
              <span className="ml-2 text-sm text-gray-600 dark:text-dark-muted">
                {formData.sendReceipt
                  ? `Receipt will be sent to ${formData.email}`
                  : 'No receipt will be sent'}
              </span>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">
              Payment Complete
            </h3>
            <p className="text-sm text-gray-500 dark:text-dark-muted">
              {formData.sendReceipt
                ? `Receipt has been sent to ${formData.email}`
                : 'Transaction completed successfully'}
            </p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isProcessing && step === 'details') {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-white dark:bg-dark-secondary rounded-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {step !== 'complete' && (
            <button
              onClick={onClose}
              disabled={isProcessing || step === 'confirm'}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-6">
              {step === 'details' && 'Process Payment'}
              {step === 'confirm' && 'Confirm Payment'}
              {step === 'complete' && 'Payment Status'}
            </h2>

            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {step !== 'complete' && (
                <div className="mt-6 flex justify-end space-x-3">
                  {step === 'confirm' && (
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      disabled={isProcessing}
                      className="px-4 py-2 text-gray-700 dark:text-dark-text bg-gray-100 dark:bg-dark-accent rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isProcessing || (step === 'details' && (!formData.clientName || !formData.amount))}
                    className={`
                      flex items-center px-4 py-2 rounded-lg text-white font-medium
                      transition-colors duration-200
                      ${isSuccess
                        ? 'bg-green-500'
                        : 'bg-blue-500 hover:bg-blue-600'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : step === 'details' ? (
                      'Continue'
                    ) : (
                      'Confirm Payment'
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}