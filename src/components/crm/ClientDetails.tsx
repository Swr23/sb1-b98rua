import React from 'react';
import { motion } from 'framer-motion';
import { Client } from '../../types';
import { format } from 'date-fns';
import { 
  User2, Mail, Phone, Calendar, Star, 
  FileText, AlertCircle, Image as ImageIcon,
  DollarSign, ChevronRight
} from 'lucide-react';

interface ClientDetailsProps {
  client: Client;
  onUpdateStage: (stage: Client['stage']) => void;
  onAddNote: (note: string) => void;
}

const stages: Client['stage'][] = ['lead', 'consultation', 'deposit', 'ready'];

export default function ClientDetails({ client, onUpdateStage, onAddNote }: ClientDetailsProps) {
  const [newNote, setNewNote] = React.useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User2 className="h-8 w-8 text-gray-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-600">{client.loyaltyPoints} loyalty points</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Client since {format(new Date(client.createdAt), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Stage Progression</h3>
            <div className="flex items-center justify-between">
              {stages.map((stage, index) => (
                <React.Fragment key={stage}>
                  <button
                    onClick={() => onUpdateStage(stage)}
                    className={`flex flex-col items-center ${
                      stages.indexOf(client.stage) >= index ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stages.indexOf(client.stage) >= index 
                        ? 'bg-blue-100' 
                        : 'bg-gray-100'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="mt-1 text-xs capitalize">{stage}</span>
                  </button>
                  {index < stages.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notes & History</h3>
          <form onSubmit={handleAddNote} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Add Note
              </button>
            </div>
          </form>
          <div className="space-y-4">
            {client.notes.map((note, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">{note}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {format(new Date(), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {client.consultationNotes && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Consultation Notes</h3>
            <div className="rounded-lg bg-gray-50 p-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Notes</h4>
                <p className="mt-1 text-sm text-gray-600">{client.consultationNotes.notes}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Requirements</h4>
                <p className="mt-1 text-sm text-gray-600">{client.consultationNotes.requirements}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Allergies</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {client.consultationNotes.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {client.referencePhotos && client.referencePhotos.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reference Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {client.referencePhotos.map((photo) => (
                <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.description}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-2 right-2 text-xs text-white">
                    {photo.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}