import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants';

// Transform backend transaction to display format
const transformTransaction = (transaction) => {
  const displayType = transaction.type === 'IN' ? 'income' : 'expense';
  
  return {
    id: transaction.id,
    type: displayType,
    description: transaction.description || `${transaction.type} transaction`,
    amount: Math.abs(transaction.amount),
    date: transaction.createdAt.split('T')[0],
    createdAt: transaction.createdAt,
  };
};

// Transactions API Service
export const transactionsApi = {
  async getHistory() {
    const result = await apiClient.get(API_CONFIG.ENDPOINTS.TRANSACTIONS.BASE);
    if (result.success) {
      const transformedHistory = (Array.isArray(result.data) ? result.data : [])
        .map(transformTransaction)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return { success: true, history: transformedHistory };
    }
    return result;
  },

  async sendMoney(recipientAlias, amount) {
    return apiClient.post(API_CONFIG.ENDPOINTS.TRANSACTIONS.P2P, {
      recipientAlias,
      amount: parseFloat(amount),
    });
  },

  async getTransaction(id) {
    return apiClient.get(`${API_CONFIG.ENDPOINTS.TRANSACTIONS.BASE}/${id}`);
  },

  async updateTransaction(id, updateData) {
    return apiClient.patch(`${API_CONFIG.ENDPOINTS.TRANSACTIONS.BASE}/${id}`, updateData);
  },

  async deleteTransaction(id) {
    return apiClient.delete(`${API_CONFIG.ENDPOINTS.TRANSACTIONS.BASE}/${id}`);
  }
};