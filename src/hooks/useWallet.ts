import { useState, useEffect } from 'react';
import { walletApi } from '../services/walletApi';

interface UseWalletResult {
  balance: number;
  loading: boolean;
  error: string | null;
  refetchBalance: () => Promise<void>;
}

export const useWallet = (): UseWalletResult => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async (): Promise<void> => {
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
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
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