// User and Authentication Types (Updated to match Prisma schema)
export interface User {
  id: string;
  email: string;
  alias: string;  // Added alias field from schema
  createdAt: string;
  updatedAt: string;
  wallet?: Wallet;  // Optional wallet relation
}

export interface Wallet {
  id: string;
  balance: number;
  userId: string;
  user?: User;  // Optional user relation
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// Transaction Types (Updated to match Prisma schema)
export interface Transaction {
  id: string;
  amount: number;
  type: 'IN' | 'OUT';  // Changed to match TransactionType enum
  description?: string;
  createdAt: string;
  senderWalletId: string;
  receiverWalletId: string;
  effectedWalletId: string;
  // Optional relations
  senderWallet?: Wallet;
  receiverWallet?: Wallet;
  effectedWallet?: Wallet;
}

// Frontend display transaction (transformed from backend)
export interface DisplayTransaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';  // Simplified for UI
  description: string;
  date: string;
  createdAt: string;
}

export interface P2PTransfer {
  recipientAlias: string;  // This should match the P2PTransferDto field name
  amount: number;
  description?: string;
}

// Wallet Operations (for deposit/withdraw - might use external services)
export interface WalletOperation {
  amount: number;
  method: PaymentMethod;
  sourceIdentifier?: string;
  bankAccount?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types (Updated)
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  alias: string;  // Added alias field
  password: string;
  confirmPassword: string;
}

export interface SendMoneyForm {
  recipientAlias: string;  // Changed to alias
  amount: string;
}

// Hook State Types (Updated)
export interface UseWalletState {
  balance: number;
  loading: boolean;
  error: string | null;
  refetchBalance: () => Promise<void>;
}

export interface UseTransactionsState {
  transactions: DisplayTransaction[];  // Using display type
  loading: boolean;
  error: string | null;
  transferMoney: (recipientAlias: string, amount: string) => Promise<ApiResponse>;
  refetchTransactions: () => Promise<void>;
}

export interface UseWalletOperationsState {
  loading: boolean;
  error: string | null;
  deposit: (amount: string, method: string, sourceIdentifier?: string) => Promise<ApiResponse>;
  withdraw: (amount: string, bankAccount: string) => Promise<ApiResponse>;
}

// Enum Types (Updated)
export type PaymentMethod = 'BANK_ACCOUNT' | 'DEBIN' | 'CREDIT_CARD';
export type BackendTransactionType = 'IN' | 'OUT';  // Backend types
export type DisplayTransactionType = 'income' | 'expense';  // Frontend display types
export type FeedbackType = 'success' | 'error' | 'warning' | 'info';