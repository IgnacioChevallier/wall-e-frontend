import React, { useState } from 'react';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import FeedbackMessage from '../components/Common/FeedbackMessage';

const AddMoneyPage = () => {
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      const response = await addMoney(amount);
      if (response.success) {
        setFeedback({ message: response.message || 'Money added successfully!', type: 'success' });
        setAmount(''); // Clear field on success
      } else {
        setFeedback({ message: response.message || 'Failed to add money', type: 'error' });
      }
    } catch (err) {
      setFeedback({ message: 'An error occurred while adding money', type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-money-page">
        <div className="form-container">
        <h2 className="page-title" style={{textAlign: 'center'}}>Add Money (Simulated)</h2>
        <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#555', fontSize: '0.9rem' }}>
            Enter the amount you wish to simulate adding from an external source.
        </p>
        <FeedbackMessage message={feedback.message} type={feedback.type} />
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="amount">Amount to Add</label>
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
            <Button type="submit" disabled={loading || !amount || parseFloat(amount) <= 0}>
            {loading ? 'Adding...' : 'Add Money'}
            </Button>
        </form>
        </div>
    </div>
  );
};

export default AddMoneyPage; 