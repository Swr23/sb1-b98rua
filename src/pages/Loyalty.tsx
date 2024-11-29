import React from 'react';
import { Gift } from 'lucide-react';

export default function Loyalty() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Loyalty Program</h1>
        <div className="flex space-x-3">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Manage Rewards
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Gift className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">No loyalty rewards configured</p>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Set Up Loyalty Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}