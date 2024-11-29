import React from 'react';
import { Deposit } from '../../types';

interface DepositSelectorProps {
  availableDeposits: Deposit[];
  selectedDepositId: string | null;
  onSelect: (depositId: string | null) => void;
  onAmountChange: (amount: string) => void;
  depositAmount: string;
}

export default function DepositSelector({
  availableDeposits,
  selectedDepositId,
  onSelect,
  onAmountChange,
  depositAmount,
}: DepositSelectorProps) {
  return (
    <div className="space-y-4">
      {availableDeposits.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Use Existing Deposit
          </label>
          <select
            value={selectedDepositId || ''}
            onChange={(e) => onSelect(e.target.value || null)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">New Deposit</option>
            {availableDeposits.map((deposit) => (
              <option key={deposit.id} value={deposit.id}>
                ${deposit.amount} from {deposit.date.toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      )}

      {!selectedDepositId && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Deposit Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="block w-full rounded-md border border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      )}
    </div>
  );
}