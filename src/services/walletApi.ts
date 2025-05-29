import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

interface BalanceResponse extends ApiResponse {
  balance?: number;
}

export interface WalletApiService {
  getBalance: () => Promise<BalanceResponse>;
  deposit: (amount: string | number, method: string, sourceIdentifier: string) => Promise<ApiResponse>;
  withdraw: (amount: string | number, bankAccount: string) => Promise<ApiResponse>;
  requestDebin: (amount: string | number) => Promise<ApiResponse>;
}

// Wallet API Service
export const walletApi: WalletApiService = {
  async getBalance() {
    const result = await apiClient.get<{ balance: number }>(API_CONFIG.ENDPOINTS.WALLET.BALANCE);
    if (result.success) {
      return { success: true, balance: result.data?.balance };
    }
    return result;
  },

  async deposit(amount, method, sourceIdentifier) {
    return apiClient.post(API_CONFIG.ENDPOINTS.WALLET.DEPOSIT, {
      amount: parseFloat(amount as string),
      method,
      sourceIdentifier
    });
  },

  async withdraw(amount, bankAccount) {
    return apiClient.post(API_CONFIG.ENDPOINTS.WALLET.WITHDRAW, {
      amount: parseFloat(amount as string),
      bankAccount
    });
  },

  async requestDebin(amount) {
    return apiClient.post(API_CONFIG.ENDPOINTS.WALLET.DEBIN, {
      amount: parseFloat(amount as string)
    });
  }
}; 