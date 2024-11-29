import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Search, User, Clock, DollarSign, Calendar, AlertCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { ConsultationNotes, ReferencePhoto } from '../../types';
import ConsultationNotesForm from './ConsultationNotesForm';
import ReferencePhotosForm from './ReferencePhotosForm';
import DepositSelector from './DepositSelector';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSave: (booking: {
    service: string;
    startTime: string;
    duration: number;
    consultationNotes?: ConsultationNotes;
    referencePhotos?: ReferencePhoto[];
  }) => void;
}

// Sample services data - replace with actual data
const services = [
  { id: '1', name: 'Haircut', duration: 60, price: 50 },
  { id: '2', name: 'Massage', duration: 90, price: 80 },
  { id: '3', name: 'Facial', duration: 60, price: 65 },
];

// Sample clients data - replace with actual data
const clients = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '123-456-7891' },
];

export default function BookingModal({ isOpen, onClose, selectedDate, onSave }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [startTime, setStartTime] = useState('09:00');
  const [consultationNotes, setConsultationNotes] = useState<Partial<ConsultationNotes>>({});
  const [referencePhotos, setReferencePhotos] = useState<ReferencePhoto[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState('weekly');
  const [recurringCount, setRecurringCount] = useState(4);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositPaid, setDepositPaid] = useState(false);
  const [reminderEmail, setReminderEmail] = useState(true);
  const [reminderSMS, setReminderSMS] = useState(false);

  if (!isOpen || !selectedDate) return null;

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleAddPhoto = (photo: Omit<ReferencePhoto, 'id' | 'uploadedAt'>) => {
    const newPhoto: ReferencePhoto = {
      ...photo,
      id: String(Date.now()),
      uploadedAt: new Date(),
    };
    setReferencePhotos([...referencePhotos, newPhoto]);
  };

  const handleRemovePhoto = (photoId: string) => {
    setReferencePhotos(referencePhotos.filter(photo => photo.id !== photoId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    onSave({
      service: selectedService.name,
      startTime,
      duration: selectedService.duration,
      consultationNotes: consultationNotes as ConsultationNotes,
      referencePhotos,
    });
    onClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search Client
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search by name or email..."
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="mt-2 max-h-60 overflow-y-auto">
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client);
                    setStep(2);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                >
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Service
              </label>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setStep(3);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${
                      selectedService?.id === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{service.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{service.duration} min</span>
                          <DollarSign className="h-4 w-4 text-gray-400 ml-2" />
                          <span className="text-sm text-gray-500">${service.price}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Consultation Notes</h4>
                <ConsultationNotesForm
                  notes={consultationNotes}
                  onChange={setConsultationNotes}
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Reference Photos</h4>
                <ReferencePhotosForm
                  photos={referencePhotos}
                  onAdd={handleAddPhoto}
                  onRemove={handleRemovePhoto}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Recurring Booking</label>
                <button
                  type="button"
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isRecurring ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isRecurring ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {isRecurring && (
                <div className="space-y-4 pl-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Repeat Every
                    </label>
                    <select
                      value={recurringType}
                      onChange={(e) => setRecurringType(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="weekly">Week</option>
                      <option value="biweekly">2 Weeks</option>
                      <option value="monthly">Month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Occurrences
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="12"
                      value={recurringCount}
                      onChange={(e) => setRecurringCount(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deposit Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="depositPaid"
                checked={depositPaid}
                onChange={(e) => setDepositPaid(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="depositPaid" className="text-sm text-gray-700">
                Deposit Paid
              </label>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Reminders
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="reminderEmail"
                    checked={reminderEmail}
                    onChange={(e) => setReminderEmail(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="reminderEmail" className="text-sm text-gray-700">
                    Send email reminder (24h before)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="reminderSMS"
                    checked={reminderSMS}
                    onChange={(e) => setReminderSMS(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="reminderSMS" className="text-sm text-gray-700">
                    Send SMS reminder (2h before)
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              New Booking for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            {selectedClient && (
              <p className="mt-1 text-sm text-gray-500">
                Client: {selectedClient.name}
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div
                    className={`flex items-center ${
                      step >= stepNumber ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`rounded-full border-2 ${
                        step >= stepNumber
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                      } h-8 w-8 flex items-center justify-center`}
                    >
                      <span className={`text-sm font-medium ${
                        step >= stepNumber ? 'text-white' : 'text-gray-500'
                      }`}>
                        {stepNumber}
                      </span>
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {stepNumber === 1 ? 'Client' : stepNumber === 2 ? 'Service' : 'Details'}
                    </span>
                  </div>
                  {stepNumber < 3 && (
                    <div className="flex-1 border-t-2 border-gray-300 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm ${
                    (step === 1 && !selectedClient) || (step === 2 && !selectedService)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={
                    (step === 1 && !selectedClient) || (step === 2 && !selectedService)
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                >
                  Create Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}