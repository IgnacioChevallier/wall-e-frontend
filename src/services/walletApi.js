import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants';

// Wallet API Service
export const walletApi = {
  async getBalance() {
    const result = await apiClient.get(API_CONFIG.ENDPOINTS.WALLET.BALANCE);
    if (result.success) {
      return { success: true, balance: result.data.balance };
    }
    return result;
  },

  async deposit(amount, method, sourceIdentifier) {
    return apiClient.post(API_CONFIG.ENDPOINTS.WALLET.DEPOSIT, {
      amount: parseFloat(amount),
      method,
      sourceIdentifier
    });
  },

  async withdraw(amount, bankAccount) {
    return apiClient.post(API_CONFIG.ENDPOINTS.WALLET.WITHDRAW, {
      amount: parseFloat(amount),
      bankAccount
    });
  },

  async requestDebin(amount) {
    return apiClient.post(API_CONFIG.ENDPOINTS.WALLET.DEBIN, {
      amount: parseFloat(amount)
    });
  }
};