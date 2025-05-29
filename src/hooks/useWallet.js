import { useState, useEffect } from 'react';
import { walletApi } from '../services/walletApi';

export const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await walletApi.getBalance();
      if (result.success) {
        setBalance(result.balance);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    balance,
    loading,
    error,
    refetchBalance: fetchBalance
  };
};