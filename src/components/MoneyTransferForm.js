import React, { useState } from 'react';
import { useWalletOperations } from '../hooks/useWalletOperations';
import { PAYMENT_METHODS } from '../constants';
import Button from './Common/Button';
import Input from './Common/Input';
import FeedbackMessage from './Common/FeedbackMessage';

const MoneyTransferForm = ({ onSuccess }) => {
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(PAYMENT_METHODS.BANK_ACCOUNT);
  const [sourceIdentifier, setSourceIdentifier] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const { loading, deposit, withdraw } = useWalletOperations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    try {
      let result;
      if (isDeposit) {
        result = await deposit(amount, method, sourceIdentifier);
        if (result.success) {
          setFeedback({ 
            message: method === PAYMENT_METHODS.DEBIN 
              ? 'DEBIN request processed successfully!' 
              : 'Money added successfully!', 
            type: 'success' 
          });
        }
      } else {
        result = await withdraw(amount, sourceIdentifier);
        if (result.success) {
          setFeedback({ message: 'Withdrawal successful!', type: 'success' });
        }
      }

      if (result.success) {
        // Clear form
        setAmount('');
        setSourceIdentifier('');
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setFeedback({ message: result.message, type: 'error' });
      }
    } catch (error) {
      setFeedback({ message: 'Operation failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="card">
      <FeedbackMessage message={feedback.message} type={feedback.type} />
      
      <div className="button-group">
        <Button
          variant={isDeposit ? 'primary' : 'secondary'}
          onClick={() => setIsDeposit(true)}
        >
          Deposit
        </Button>
        <Button
          variant={!isDeposit ? 'primary' : 'secondary'}
          onClick={() => setIsDeposit(false)}
        >
          Withdraw
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
          min="0"
          step="0.01"
        />

        {isDeposit && (
          <div className="form-group">
            <label className="label">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="select"
            >
              <option value={PAYMENT_METHODS.BANK_ACCOUNT}>Bank Account</option>
              <option value={PAYMENT_METHODS.DEBIN}>DEBIN (Direct Debit)</option>
            </select>
          </div>
        )}

        {isDeposit && method !== PAYMENT_METHODS.DEBIN && (
          <Input
            label={method === PAYMENT_METHODS.BANK_ACCOUNT ? 'CBU/Alias' : 'Card Number'}
            type="text"
            value={sourceIdentifier}
            onChange={(e) => setSourceIdentifier(e.target.value)}
            placeholder={
              method === PAYMENT_METHODS.BANK_ACCOUNT
                ? 'Enter CBU or Alias'
                : 'Enter card number'
            }
            required={method !== PAYMENT_METHODS.DEBIN}
          />
        )}

        {!isDeposit && (
          <Input
            label="Destination CBU/Alias"
            type="text"
            value={sourceIdentifier}
            onChange={(e) => setSourceIdentifier(e.target.value)}
            placeholder="Enter destination CBU or Alias"
            required
          />
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="submit-button"
        >
          {loading 
            ? 'Processing...' 
            : isDeposit 
              ? method === PAYMENT_METHODS.DEBIN 
                ? 'Request DEBIN' 
                : 'Add Money' 
              : 'Withdraw'
          }
        </Button>
      </form>
    </div>
  );
};

export default MoneyTransferForm;