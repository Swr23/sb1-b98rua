```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Package, DollarSign, MapPin } from 'lucide-react';
import { InventoryItem } from '../../hooks/useInventory';
import InventoryForm from './InventoryForm';

interface InventoryListProps {
  items: InventoryItem[];
  onAdd: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  onUpdate: (id: string, updates: Partial<InventoryItem>) => void;
  onDelete: (id: string) => void;
}

export default function InventoryList({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: InventoryListProps) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      onDelete(id);
    }
  };

  const statusColors = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    out: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsAddingItem(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-dark-text">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">
                    SKU: {item.sku}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1 text-gray-400 hover:text-gray-500 dark:text-dark-muted dark:hover:text-dark-text"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-dark-muted">
                <DollarSign className="w-4 h-4 mr-1" />
                ${item.price.toFixed(2)}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-dark-muted">
                <Package className="w-4 h-4 mr-1" />
                {item.quantity} in stock
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-dark-muted">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {(isAddingItem || editingItem) && (
          <InventoryForm
            item={editingItem}
            onSubmit={(data) => {
              if (editingItem) {
                onUpdate(editingItem.id, data);
                setEditingItem(null);
              } else {
                onAdd(data);
                setIsAddingItem(false);
              }
            }}
            onCancel={() => {
              setIsAddingItem(false);
              setEditingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```