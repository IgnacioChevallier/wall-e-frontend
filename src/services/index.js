// Export all API services from a central location
export { apiClient } from './apiClient';
export { walletApi } from './walletApi';
export { transactionsApi } from './transactionsApi';

// Legacy exports for backward compatibility (if needed)
export const getBalance = async () => {
  return await walletApi.getBalance();
};

export const getHistory = async () => {
  return await transactionsApi.getHistory();
};

export const sendMoney = async (recipientAlias, amount) => {
  return await transactionsApi.sendMoney(recipientAlias, amount);
};

export const addMoney = async (amount, method, sourceIdentifier) => {
  return await walletApi.deposit(amount, method, sourceIdentifier);
};

export const withdrawMoney = async (amount, bankAccount) => {
  return await walletApi.withdraw(amount, bankAccount);
};

export const requestDebin = async (amount) => {
  return await walletApi.requestDebin(amount);
};