// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
    },
    WALLET: {
      BALANCE: '/wallet/balance',
      DEPOSIT: '/wallet/deposit',
      WITHDRAW: '/wallet/withdraw',
      DEBIN: '/wallet/topup/debin',
    },
    TRANSACTIONS: {
      BASE: '/transactions',
      P2P: '/transactions/p2p',
    },
    USERS: {
      ALIASES: '/users/aliases',
    },
  },
};

// Payment Methods
export const PAYMENT_METHODS = {
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  DEBIN: 'DEBIN',
  CREDIT_CARD: 'CREDIT_CARD',
};

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  TRANSFER: 'transfer',
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
};

// UI Constants
export const UI_CONSTANTS = {
  CURRENCY_SYMBOL: '$',
  DATE_FORMAT: 'YYYY-MM-DD',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
};

// Validation Constants
export const VALIDATION = {
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99,
  MIN_PASSWORD_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};