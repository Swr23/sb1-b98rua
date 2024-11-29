import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { ReferencePhoto } from '../../types';

interface ReferencePhotosFormProps {
  photos: ReferencePhoto[];
  onAdd: (photo: Omit<ReferencePhoto, 'id' | 'uploadedAt'>) => void;
  onRemove: (photoId: string) => void;
}

export default function ReferencePhotosForm({ photos, onAdd, onRemove }: ReferencePhotosFormProps) {
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDescription, setNewPhotoDescription] = useState('');

  const handleAddPhoto = () => {
    if (newPhotoUrl) {
      onAdd({
        url: newPhotoUrl,
        description: newPhotoDescription,
      });
      setNewPhotoUrl('');
      setNewPhotoDescription('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Add Reference Photo
        </label>
        <input
          type="url"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter photo URL..."
        />
        <textarea
          value={newPhotoDescription}
          onChange={(e) => setNewPhotoDescription(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Add description..."
          rows={2}
        />
        <button
          type="button"
          onClick={handleAddPhoto}
          disabled={!newPhotoUrl}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Upload className="mr-2 h-4 w-4" />
          Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative rounded-lg border border-gray-300 p-2"
          >
            <button
              onClick={() => onRemove(photo.id)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
              {photo.url ? (
                <img
                  src={photo.url}
                  alt={photo.description}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {photo.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}