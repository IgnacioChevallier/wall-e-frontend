import { apiClient } from './apiClient';
import { API_CONFIG } from '../constants';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

interface BackendTransaction {
  id: string | number;
  type: string;
  amount: number;
  description?: string;
  createdAt: string;
  [key: string]: any;
}

export interface Transaction {
  id: string | number;
  type: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
  [key: string]: any;
}

interface TransactionHistoryResponse extends ApiResponse {
  history?: Transaction[];
}

export interface TransactionsApiService {
  getHistory: () => Promise<TransactionHistoryResponse>;
  sendMoney: (recipientAlias: string, amount: string | number) => Promise<ApiResponse>;
  getTransaction: (id: string | number) => Promise<ApiResponse>;
  updateTransaction: (id: string | number, updateData: Partial<Transaction>) => Promise<ApiResponse>;
  deleteTransaction: (id: string | number) => Promise<ApiResponse>;
}

// Transform backend transaction to display format
const transformTransaction = (transaction: BackendTransaction): Transaction => {
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
export const transactionsApi: TransactionsApiService = {
  async getHistory() {
    const result = await apiClient.get<BackendTransaction[]>(API_CONFIG.ENDPOINTS.TRANSACTIONS.BASE);
    if (result.success && result.data) {
      const transformedHistory = (Array.isArray(result.data) ? result.data : [])
        .map(transformTransaction)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      return { success: true, history: transformedHistory };
    }
    return { success: false, message: result.message };
  },

  async sendMoney(recipientAlias, amount) {
    return apiClient.post(API_CONFIG.ENDPOINTS.TRANSACTIONS.P2P, {
      recipientAlias,
      amount: typeof amount === 'string' ? parseFloat(amount) : amount,
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