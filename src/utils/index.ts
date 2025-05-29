import { UI_CONSTANTS, VALIDATION } from '../constants';

// Currency formatting utilities
export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return '...';
  return `${UI_CONSTANTS.CURRENCY_SYMBOL}${Math.abs(amount).toFixed(2)}`;
};

export const formatCurrencyWithSign = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return '...';
  const value = Math.abs(amount).toFixed(2);
  return amount >= 0 ? `+${UI_CONSTANTS.CURRENCY_SYMBOL}${value}` : `-${UI_CONSTANTS.CURRENCY_SYMBOL}${value}`;
};

// Date formatting utilities
export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }): string => {
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatFullDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validateAmount = (amount: string | number): boolean => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(numericAmount) && 
         numericAmount >= VALIDATION.MIN_AMOUNT && 
         numericAmount <= VALIDATION.MAX_AMOUNT;
};

export const validatePassword = (password: string): boolean => {
  return !!password && password.length >= VALIDATION.MIN_PASSWORD_LENGTH;
};

interface StorageAPI {
  get: <T>(key: string, defaultValue?: T | null) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}

// Local Storage utilities
export const storage: StorageAPI = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  }
};

// API utilities
export const handleApiError = (error: Error): string => {
  const errorObj = error as any;
  if (errorObj.response) {
    // Server responded with error status
    return errorObj.response.data?.message || 'Server error occurred';
  } else if (errorObj.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

// Async delay utility
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms)); 