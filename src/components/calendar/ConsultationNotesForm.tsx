import React from 'react';
import { ConsultationNotes } from '../../types';

interface ConsultationNotesFormProps {
  notes: Partial<ConsultationNotes>;
  onChange: (notes: Partial<ConsultationNotes>) => void;
}

export default function ConsultationNotesForm({ notes, onChange }: ConsultationNotesFormProps) {
  const handleChange = (field: keyof ConsultationNotes, value: string) => {
    onChange({ ...notes, [field]: value });
  };

  const handleAllergiesChange = (value: string) => {
    const allergies = value.split(',').map(item => item.trim()).filter(Boolean);
    onChange({ ...notes, allergies });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Consultation Notes
        </label>
        <textarea
          value={notes.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="General consultation notes..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        <textarea
          value={notes.requirements || ''}
          onChange={(e) => handleChange('requirements', e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Specific requirements or preferences..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Allergies (comma-separated)
        </label>
        <input
          type="text"
          value={notes.allergies?.join(', ') || ''}
          onChange={(e) => handleAllergiesChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="e.g., latex, specific dyes, metals..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medical History
        </label>
        <textarea
          value={notes.medicalHistory || ''}
          onChange={(e) => handleChange('medicalHistory', e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Relevant medical history..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferences
        </label>
        <textarea
          value={notes.preferences || ''}
          onChange={(e) => handleChange('preferences', e.target.value)}
          rows={2}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Style preferences, concerns, or special requests..."
        />
      </div>
    </div>
  );
}