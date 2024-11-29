export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: 'lead' | 'consultation' | 'deposit' | 'ready';
  loyaltyPoints: number;
  notes: string[];
  consultationNotes?: ConsultationNotes;
  referencePhotos?: ReferencePhoto[];
  previousDeposits?: Deposit[];
  createdAt: Date;
}

export interface ConsultationNotes {
  id: string;
  date: Date;
  notes: string;
  requirements: string;
  allergies: string[];
  medicalHistory: string;
  preferences: string;
}

export interface ReferencePhoto {
  id: string;
  url: string;
  description: string;
  uploadedAt: Date;
}

export interface Deposit {
  id: string;
  amount: number;
  date: Date;
  bookingId: string;
  status: 'available' | 'used' | 'refunded';
}

export interface Booking {
  id: string;
  clientId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  value: number;
  deposit?: Deposit;
  consultationNotes?: ConsultationNotes;
  referencePhotos?: ReferencePhoto[];
}

export interface User {
  id: string;
  name: string;
  role: 'staff' | 'admin';
  email: string;
}