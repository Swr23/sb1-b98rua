import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Users } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  color: string;
}

interface StaffFilterProps {
  staffMembers: StaffMember[];
  selectedStaffId: string | null;
  onStaffSelect: (staffId: string | null) => void;
}

export default function StaffFilter({
  staffMembers,
  selectedStaffId,
  onStaffSelect,
}: StaffFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedStaff = selectedStaffId 
    ? staffMembers.find(staff => staff.id === selectedStaffId)
    : null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-2 bg-white dark:bg-dark-accent rounded-lg border border-gray-200 dark:border-dark-border shadow-sm hover:bg-gray-50 dark:hover:bg-dark-border transition-colors duration-200"
      >
        <div className="flex items-center">
          {selectedStaff ? (
            <>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                style={{ backgroundColor: selectedStaff.color }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
                {selectedStaff.name}
              </span>
            </>
          ) : (
            <>
              <Users className="w-5 h-5 text-gray-400 dark:text-dark-muted mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-dark-muted">
                All Staff
              </span>
            </>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 dark:text-dark-muted transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-40 w-full mt-2 bg-white dark:bg-dark-accent rounded-lg border border-gray-200 dark:border-dark-border shadow-lg"
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    onStaffSelect(null);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-border transition-colors duration-200 ${
                    !selectedStaffId ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <Users className="w-5 h-5 text-gray-400 dark:text-dark-muted mr-2" />
                  <span className="font-medium text-gray-700 dark:text-dark-text">
                    All Staff
                  </span>
                </button>

                <div className="border-t border-gray-100 dark:border-dark-border my-1" />

                {staffMembers.map((staff) => (
                  <button
                    key={staff.id}
                    onClick={() => {
                      onStaffSelect(staff.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-dark-border transition-colors duration-200 ${
                      selectedStaffId === staff.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                      style={{ backgroundColor: staff.color }}
                    >
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-dark-text">
                      {staff.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}