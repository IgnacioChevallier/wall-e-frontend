import React, { useState } from 'react';
import { sendMoney } from '../services/api';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import FeedbackMessage from '../components/Common/FeedbackMessage';

const SendMoneyPage = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      const response = await sendMoney(recipient, amount);
      if (response.success) {
        setFeedback({ message: response.message || 'Transfer successful!', type: 'success' });
        setRecipient(''); // Clear fields on success
        setAmount('');
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

  return (
    <div className="send-money-page">
        <div className="form-container">
        <h2 className="page-title" style={{textAlign: 'center'}}>Send Money</h2>
        <FeedbackMessage message={feedback.message} type={feedback.type} />
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="recipient">Recipient (Email or ID)</label>
            <Input
                type="text"
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient's email or ID"
                required
            />
            </div>
            <div>
            <label htmlFor="amount">Amount</label>
            <Input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$0.00"
                required
                step="0.01" min="0.01"
            />
            </div>
            <Button type="submit" disabled={loading || !recipient || !amount || parseFloat(amount) <= 0}>
            {loading ? 'Sending...' : 'Send'}
            </Button>
        </form>
        </div>
    </div>
  );
};

export default SendMoneyPage; 