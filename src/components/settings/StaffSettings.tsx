import React, { useState } from 'react';
import { User, Plus, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SettingsSection from './SettingsSection';
import FormInput from '../forms/FormInput';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  color: string;
  availability: {
    [key: string]: { start: string; end: string; }
  };
}

const defaultAvailability = {
  monday: { start: '09:00', end: '17:00' },
  tuesday: { start: '09:00', end: '17:00' },
  wednesday: { start: '09:00', end: '17:00' },
  thursday: { start: '09:00', end: '17:00' },
  friday: { start: '09:00', end: '17:00' },
  saturday: { start: '', end: '' },
  sunday: { start: '', end: '' },
};

export default function StaffSettings() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    color: '#3B82F6',
    availability: defaultAvailability,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaffId) {
      setStaffMembers(prev => prev.map(staff => 
        staff.id === editingStaffId ? { ...formData, id: staff.id } : staff
      ));
      setEditingStaffId(null);
    } else {
      setStaffMembers(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    setIsAddingStaff(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      color: '#3B82F6',
      availability: defaultAvailability,
    });
  };

  const handleEdit = (staff: StaffMember) => {
    setFormData(staff);
    setEditingStaffId(staff.id);
    setIsAddingStaff(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      setStaffMembers(prev => prev.filter(staff => staff.id !== id));
    }
  };

  return (
    <>
      <SettingsSection
        title="Staff Management"
        description="Manage staff members and their schedules"
      >
        <div className="space-y-6">
          {!isAddingStaff ? (
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddingStaff(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Staff Member
              </button>
            </div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-50 dark:bg-dark-accent p-6 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <FormInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text">
                    Calendar Color
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="h-10 w-full rounded-lg border border-gray-300 dark:border-dark-border"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-dark-text mb-4">
                  Availability
                </h4>
                <div className="space-y-4">
                  {Object.entries(formData.availability).map(([day, times]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <span className="w-24 text-sm capitalize text-gray-700 dark:text-dark-text">
                        {day}
                      </span>
                      <input
                        type="time"
                        value={times.start}
                        onChange={(e) => setFormData({
                          ...formData,
                          availability: {
                            ...formData.availability,
                            [day]: { ...times, start: e.target.value }
                          }
                        })}
                        className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text"
                      />
                      <span className="text-gray-500 dark:text-dark-muted">to</span>
                      <input
                        type="time"
                        value={times.end}
                        onChange={(e) => setFormData({
                          ...formData,
                          availability: {
                            ...formData.availability,
                            [day]: { ...times, end: e.target.value }
                          }
                        })}
                        className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingStaff(false);
                    setEditingStaffId(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-dark-text bg-gray-100 dark:bg-dark-accent rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {editingStaffId ? 'Update' : 'Add'} Staff Member
                </button>
              </div>
            </motion.form>
          )}

          <div className="space-y-4">
            {staffMembers.map((staff) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-dark-accent rounded-lg border border-gray-200 dark:border-dark-border"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: staff.color }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-dark-text">
                      {staff.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">
                      {staff.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="p-2 text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="p-2 text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SettingsSection>
    </>
  );
}