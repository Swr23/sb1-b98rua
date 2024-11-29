```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { InventoryItem } from '../../hooks/useInventory';
import { useForm } from '../../hooks/useForm';

interface InventoryFormProps {
  item?: InventoryItem | null;
  onSubmit: (data: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  onCancel: () => void;
}

const initialData = {
  sku: '',
  name: '',
  description: '',
  category: 'item',
  quantity: 0,
  price: 0,
  location: '',
  status: 'available',
};

export default function InventoryForm({ item, onSubmit, onCancel }: InventoryFormProps) {
  const { formData, handleChange, handleSubmit, errors } = useForm({
    initialData: item || initialData,
    onSubmit,
    validationRules: {
      sku: (value) => value.length > 0 || 'SKU is required',
      name: (value) => value.length > 0 || 'Name is required',
      quantity: (value) => Number(value) >= 0 || 'Quantity must be non-negative',
      price: (value) => Number(value) > 0 || 'Price must be greater than 0',
      location: (value) => value.length > 0 || 'Location is required',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="w-full max-w-2xl bg-white dark:bg-dark-secondary rounded-xl shadow-xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
            {item ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sku}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              >
                <option value="item">Item</option>
                <option value="service">Service</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:text-dark-text"
              >
                <option value="available">Available</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 dark:text-dark-text bg-gray-100 dark:bg-dark-accent rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {item ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
```