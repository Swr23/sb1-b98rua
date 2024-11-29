```typescript
export const validators = {
  required: (value: string) => value.trim().length > 0 || 'This field is required',
  
  email: (value: string) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email address',
  
  phone: (value: string) => 
    /^\+?[\d\s-]{10,}$/.test(value) || 'Invalid phone number',
  
  minLength: (length: number) => (value: string) =>
    value.length >= length || `Must be at least ${length} characters`,
  
  maxLength: (length: number) => (value: string) =>
    value.length <= length || `Must be no more than ${length} characters`,
  
  numeric: (value: string) =>
    /^\d+$/.test(value) || 'Must be a number',
  
  decimal: (value: string) =>
    /^\d*\.?\d*$/.test(value) || 'Must be a decimal number',
  
  url: (value: string) =>
    /^https?:\/\/.+\..+/.test(value) || 'Invalid URL'
};
```