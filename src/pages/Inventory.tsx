```tsx
import React from 'react';
import { motion } from 'framer-motion';
import InventoryList from '../components/inventory/InventoryList';
import InventoryStats from '../components/inventory/InventoryStats';
import InventoryFilters from '../components/inventory/InventoryFilters';
import { useInventory } from '../hooks/useInventory';

export default function Inventory() {
  const { 
    items,
    stats,
    filters,
    setFilters,
    addItem,
    updateItem,
    deleteItem
  } = useInventory();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">
          Inventory Management
        </h1>
      </motion.div>

      <InventoryStats stats={stats} />
      <InventoryFilters filters={filters} onFilterChange={setFilters} />
      <InventoryList
        items={items}
        onAdd={addItem}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
    </div>
  );
}
```