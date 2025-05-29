import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useWallet } from '../hooks/useWallet';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import FeedbackMessage from '../components/Common/FeedbackMessage';
import AliasToggle from '../components/Common/AliasToggle';

interface FeedbackState {
  message: string;
  type: string;
}

const styles = {
  inputToggle: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '0.5rem',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#1890ff',
    cursor: 'pointer',
    fontSize: '0.8rem',
    textDecoration: 'underline',
  },
};

const SendMoneyPage: React.FC = () => {
  const [recipientAlias, setRecipientAlias] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [feedback, setFeedback] = useState<FeedbackState>({ message: '', type: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [useToggle, setUseToggle] = useState<boolean>(true);

  const { transferMoney } = useTransactions();
  const { refetchBalance } = useWallet();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      const response = await transferMoney(recipientAlias, amount);
      if (response.success) {
        setFeedback({ message: response.message || 'Transfer successful!', type: 'success' });
        setRecipientAlias(''); // Clear fields on success
        setAmount('');
        // Refresh balance after successful transfer
        refetchBalance();
      } else {
        setFeedback({ message: response.message || 'Transfer failed', type: 'error' });
      }
    } catch (err) {
      setFeedback({ message: 'An error occurred during the transfer', type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAliasSelect = (alias: string): void => {
    setRecipientAlias(alias);
  };

  const toggleInputMethod = (): void => {
    setUseToggle(!useToggle);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRecipientAlias(e.target.value);
  };

  // This is a dummy onClick handler for the submit button
  // The actual submission is handled by the form onSubmit
  const handleButtonClick = (): void => {
    // Form submit handler will take care of the actual submission
  };

  return (
    <div className="send-money-page">
      <div className="form-container">
        <h2 className="page-title" style={{textAlign: 'center'}}>Send Money</h2>
        <FeedbackMessage message={feedback.message} type={feedback.type} />
        <form onSubmit={handleSubmit}>
          <div>
            <div style={styles.inputToggle}>
              <label htmlFor="recipientAlias">Recipient Alias</label>
              <button 
                type="button" 
                style={styles.toggleBtn}
                onClick={toggleInputMethod}
              >
                {useToggle ? 'Type manually' : 'Select from list'}
              </button>
            </div>

            {useToggle ? (
              <AliasToggle 
                onSelect={handleAliasSelect} 
                selectedAlias={recipientAlias}
              />
            ) : (
              <Input
                type="text"
                id="recipientAlias"
                name="recipientAlias"
                value={recipientAlias}
                onChange={handleRecipientChange}
                placeholder="Enter recipient's alias"
                required
              />
            )}
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="$0.00"
              required
              step="0.01" 
              min="0.01"
            />
          </div>
          <Button 
            type="submit" 
            onClick={handleButtonClick}
            disabled={loading || !recipientAlias || !amount || parseFloat(amount) <= 0}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendMoneyPage; 