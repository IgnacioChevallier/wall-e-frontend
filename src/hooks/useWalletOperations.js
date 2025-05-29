import { useState } from 'react';
import { walletApi } from '../services/walletApi';
import { PAYMENT_METHODS } from '../constants';

export const useWalletOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deposit = async (amount, method, sourceIdentifier) => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      if (method === PAYMENT_METHODS.DEBIN) {
        result = await walletApi.requestDebin(amount);
      } else {
        result = await walletApi.deposit(amount, method, sourceIdentifier);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (amount, bankAccount) => {
    try {
      setLoading(true);
      setError(null);
      const result = await walletApi.withdraw(amount, bankAccount);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deposit,
    withdraw
  };
};