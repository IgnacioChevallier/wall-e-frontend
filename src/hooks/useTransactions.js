import { useState, useEffect } from 'react';
import { transactionsApi } from '../services/transactionsApi';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const transferMoney = async (recipientAlias, amount) => {
    try {
      const result = await transactionsApi.sendMoney(recipientAlias, amount);
      if (result.success) {
        // Refresh transactions after successful transfer
        await fetchTransactions();
      }
      return result;
    } catch (err) {
      return { success: false, message: err.message };
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