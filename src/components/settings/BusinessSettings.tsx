import React from 'react';
import { Building, MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';
import SettingsSection from './SettingsSection';
import FormInput from '../forms/FormInput';

export default function BusinessSettings() {
  return (
    <>
      <SettingsSection
        title="Business Information"
        description="Manage your business details and contact information"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Business Name"
              name="businessName"
              icon={Building}
              placeholder="Enter business name"
            />
            <FormInput
              label="Website"
              name="website"
              type="url"
              icon={Globe}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Contact Email"
              name="email"
              type="email"
              icon={Mail}
              placeholder="contact@example.com"
            />
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              icon={Phone}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <FormInput
            label="Business Address"
            name="address"
            icon={MapPin}
            placeholder="Enter your business address"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              label="City"
              name="city"
              placeholder="City"
            />
            <FormInput
              label="State/Province"
              name="state"
              placeholder="State"
            />
            <FormInput
              label="ZIP/Postal Code"
              name="zipCode"
              placeholder="ZIP Code"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Business Hours"
        description="Set your regular business hours"
      >
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-dark-text">
                  {day}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <select className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>Closed</option>
                </select>
                <span className="text-gray-500 dark:text-dark-muted">to</span>
                <select className="rounded-md border border-gray-300 dark:border-dark-border px-3 py-1.5 text-sm dark:bg-dark-accent dark:text-dark-text">
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>
    </>
  );
}