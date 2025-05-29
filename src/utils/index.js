import { UI_CONSTANTS, VALIDATION } from '../constants';

// Currency formatting utilities
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '...';
  return `${UI_CONSTANTS.CURRENCY_SYMBOL}${Math.abs(amount).toFixed(2)}`;
};

export const formatCurrencyWithSign = (amount) => {
  if (amount === null || amount === undefined) return '...';
  const value = Math.abs(amount).toFixed(2);
  return amount >= 0 ? `+${UI_CONSTANTS.CURRENCY_SYMBOL}${value}` : `-${UI_CONSTANTS.CURRENCY_SYMBOL}${value}`;
};

// Date formatting utilities
export const formatDate = (dateString, options = { month: 'short', day: 'numeric' }) => {
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Validation utilities
export const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validateAmount = (amount) => {
  const numericAmount = parseFloat(amount);
  return !isNaN(numericAmount) && 
         numericAmount >= VALIDATION.MIN_AMOUNT && 
         numericAmount <= VALIDATION.MAX_AMOUNT;
};

export const validatePassword = (password) => {
  return password && password.length >= VALIDATION.MIN_PASSWORD_LENGTH;
};

// Local Storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  }
};

// API utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || 'Server error occurred';
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

// Async delay utility
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));