import React from 'react';
import { User } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  color: string;
}

interface StaffLegendProps {
  staffMembers: StaffMember[];
  selectedStaff: string[];
  onStaffToggle: (staffId: string) => void;
}

export default function StaffLegend({ 
  staffMembers, 
  selectedStaff, 
  onStaffToggle 
}: StaffLegendProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-dark-secondary rounded-lg shadow-sm">
      {staffMembers.map((staff) => (
        <button
          key={staff.id}
          onClick={() => onStaffToggle(staff.id)}
          className={`
            flex items-center space-x-2 px-3 py-1.5 rounded-full border-2 transition-all duration-200
            ${selectedStaff.includes(staff.id)
              ? 'border-transparent text-white'
              : 'border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text'
            }
          `}
          style={{
            backgroundColor: selectedStaff.includes(staff.id) ? staff.color : 'transparent'
          }}
        >
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">{staff.name}</span>
        </button>
      ))}
    </div>
  );
}