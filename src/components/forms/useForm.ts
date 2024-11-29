import { useState, useCallback } from 'react';

type ValidationRule<T> = (value: string) => true | string;

interface UseFormOptions<T> {
  initialData: T;
  onSubmit: (data: T) => void | Promise<void>;
  validationRules?: Partial<Record<keyof T, ValidationRule<T>>>;
}

export function useForm<T extends Record<string, any>>({
  initialData,
  onSubmit,
  validationRules = {},
}: UseFormOptions<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback((name: keyof T, value: string) => {
    const rule = validationRules[name];
    if (!rule) return true;

    const result = rule(value);
    if (result === true) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
      return true;
    } else {
      setErrors(prev => ({ ...prev, [name]: result }));
      return false;
    }
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isFormValid = true;

    Object.keys(validationRules).forEach((key) => {
      const rule = validationRules[key as keyof T];
      if (rule) {
        const result = rule(formData[key]);
        if (result !== true) {
          newErrors[key as keyof T] = result;
          isFormValid = false;
        }
      }
    });

    setErrors(newErrors);
    setIsValid(isFormValid);
    return isFormValid;
  }, [formData, validationRules]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof T, value);
  }, [validateField]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  }, [formData, onSubmit, validateForm]);

  return {
    formData,
    errors,
    isValid,
    handleChange,
    handleSubmit,
  };
}