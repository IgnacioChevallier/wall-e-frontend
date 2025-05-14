import React, { useState } from 'react';
import { addMoney, withdrawMoney } from '../services/api';
import { toast } from 'react-toastify';

const PaymentMethod = {
  BANK_ACCOUNT: 'BANK_ACCOUNT',
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD'
};

const MoneyTransferForm = ({ onSuccess }) => {
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(PaymentMethod.BANK_ACCOUNT);
  const [sourceIdentifier, setSourceIdentifier] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isDeposit) {
        const result = await addMoney(amount, method, sourceIdentifier);
        toast.success('Money added successfully!');
      } else {
        const result = await withdrawMoney(amount, sourceIdentifier);
        toast.success('Withdrawal successful!');
      }
      
      // Clear form
      setAmount('');
      setSourceIdentifier('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error(error.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded ${
            isDeposit
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setIsDeposit(true)}
        >
          Deposit
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded ${
            !isDeposit
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setIsDeposit(false)}
        >
          Withdraw
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
          />
        </div>

        {isDeposit && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={PaymentMethod.BANK_ACCOUNT}>Bank Account</option>
              <option value={PaymentMethod.CREDIT_CARD}>Credit Card</option>
              <option value={PaymentMethod.DEBIT_CARD}>Debit Card</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isDeposit
              ? method === PaymentMethod.BANK_ACCOUNT
                ? 'CBU/Alias'
                : 'Card Number'
              : 'Destination CBU/Alias'}
          </label>
          <input
            type="text"
            value={sourceIdentifier}
            onChange={(e) => setSourceIdentifier(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={
              isDeposit
                ? method === PaymentMethod.BANK_ACCOUNT
                  ? 'Enter CBU or Alias'
                  : 'Enter card number'
                : 'Enter destination CBU or Alias'
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : isDeposit ? 'Add Money' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
};

export default MoneyTransferForm; 