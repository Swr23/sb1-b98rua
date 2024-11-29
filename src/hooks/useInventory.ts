```typescript
import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: 'item' | 'service';
  quantity: number;
  price: number;
  location: string;
  status: 'available' | 'low' | 'out';
  lastUpdated: Date;
}

interface InventoryFilters {
  search: string;
  category: string;
  location: string;
  status: string;
  priceRange: [number, number];
}

interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStock: number;
  outOfStock: number;
}

const initialFilters: InventoryFilters = {
  search: '',
  category: 'all',
  location: 'all',
  status: 'all',
  priceRange: [0, 1000],
};

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>(() => 
    storage.get('inventory', [])
  );
  const [filters, setFilters] = useState<InventoryFilters>(initialFilters);

  useEffect(() => {
    storage.set('inventory', items);
  }, [items]);

  const stats: InventoryStats = {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    lowStock: items.filter(item => item.status === 'low').length,
    outOfStock: items.filter(item => item.status === 'out').length,
  };

  const addItem = (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, lastUpdated: new Date() }
        : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.sku.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || item.category === filters.category;
    const matchesLocation = filters.location === 'all' || item.location === filters.location;
    const matchesStatus = filters.status === 'all' || item.status === filters.status;
    const matchesPrice = item.price >= filters.priceRange[0] && 
                        item.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && 
           matchesStatus && matchesPrice;
  });

  return {
    items: filteredItems,
    stats,
    filters,
    setFilters,
    addItem,
    updateItem,
    deleteItem,
  };
}
```