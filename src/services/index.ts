// Import API services
import { apiClient } from './apiClient';
import { walletApi } from './walletApi';
import { transactionsApi } from './transactionsApi';
import { usersApi } from './usersApi';

// Export all API services from a central location
export { apiClient } from './apiClient';
export { walletApi } from './walletApi';
export { transactionsApi } from './transactionsApi';
export { usersApi } from './usersApi';

// TypeScript interfaces
export type { Transaction } from './transactionsApi';
export type { UsersApiService } from './usersApi';
export type { WalletApiService } from './walletApi';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Legacy exports for backward compatibility (if needed)
export const getBalance = async (): Promise<ApiResponse<{ balance: number }>> => {
  return await walletApi.getBalance();
};

export const getHistory = async (): Promise<ApiResponse<any>> => {
  return await transactionsApi.getHistory();
};

export const sendMoney = async (recipientAlias: string, amount: string | number): Promise<ApiResponse> => {
  return await transactionsApi.sendMoney(recipientAlias, amount);
};

export const addMoney = async (
  amount: string | number, 
  method: string, 
  sourceIdentifier: string
): Promise<ApiResponse> => {
  return await walletApi.deposit(amount, method, sourceIdentifier);
};

export const withdrawMoney = async (
  amount: string | number, 
  bankAccount: string
): Promise<ApiResponse> => {
  return await walletApi.withdraw(amount, bankAccount);
};

export const requestDebin = async (amount: string | number): Promise<ApiResponse> => {
  return await walletApi.requestDebin(amount);
};

export const getUsersAliases = async (): Promise<ApiResponse<string[]>> => {
  return await usersApi.getUsersAliases();
}; 