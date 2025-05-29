import { useState, useEffect } from 'react';
import { transactionsApi } from '../services/transactionsApi';

interface Transaction {
  id: string | number;
  type: string;
  amount: number;
  description: string;
  date: string;
  [key: string]: any; // For any additional properties
}

interface TransferResult {
  success: boolean;
  message?: string;
  [key: string]: any;
}

interface UseTransactionsResult {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  transferMoney: (recipientAlias: string, amount: string | number) => Promise<TransferResult>;
  refetchTransactions: () => Promise<void>;
}

export const useTransactions = (): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await transactionsApi.getHistory();
      if (result.success) {
        setTransactions(result.history);
      } else {
        setError(result.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const transferMoney = async (recipientAlias: string, amount: string | number): Promise<TransferResult> => {
    try {
      const result = await transactionsApi.sendMoney(recipientAlias, amount);
      if (result.success) {
        // Refresh transactions after successful transfer
        await fetchTransactions();
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      return { success: false, message: errorMessage };
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    transferMoney,
    refetchTransactions: fetchTransactions
  };
}; 