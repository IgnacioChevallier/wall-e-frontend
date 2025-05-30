import React, { useState } from 'react';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import FeedbackMessage from '../components/Common/FeedbackMessage';
import { addMoney, requestDebin } from '../services';
import { useWallet } from '../hooks/useWallet';

// Simple Toggle Switch Component
const ToggleSwitch = ({ label, leftOption, rightOption, value, onChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.5rem', 
        fontWeight: '500',
        color: '#374151'
      }}>
        {label}
      </label>
      <div style={{
        display: 'flex',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem',
        padding: '0.25rem',
        width: 'fit-content',
        margin: '0 auto'
      }}>
        <button
          type="button"
          onClick={() => onChange(leftOption.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: !value ? '#3b82f6' : 'transparent',
            color: !value ? 'white' : '#6b7280',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '80px'
          }}
        >
          {leftOption.label}
        </button>
        <button
          type="button"
          onClick={() => onChange(rightOption.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: value ? '#3b82f6' : 'transparent',
            color: value ? 'white' : '#6b7280',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '80px'
          }}
        >
          {rightOption.label}
        </button>
      </div>
    </div>
  );
};

const AddMoneyPage = () => {
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [useDebin, setUseDebin] = useState(false);
  const { refetchBalance } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', type: '' });

    try {
      let response;
      
      if (useDebin) {
        // Use DEBIN to request money from external bank
        response = await requestDebin(amount);
      } else {
        // Use simulated add money (existing functionality)
        response = await addMoney(amount, 'SIMULATION', 'simulated-source');
      }

      if (response.success) {
        const successMessage = useDebin 
          ? 'DEBIN request sent successfully! Money will be added to your account shortly.'
          : 'Money added successfully!';
        setFeedback({ 
          message: response.message || successMessage, 
          type: 'success' 
        });
        setAmount(''); // Clear field on success
        
        // Refresh the balance to show updated amount
        await refetchBalance();
      } else {
        const errorMessage = useDebin
          ? 'Failed to process DEBIN request'
          : 'Failed to add money';
        setFeedback({ 
          message: response.message || errorMessage, 
          type: 'error' 
        });
      }
    } catch (err) {
      const errorMessage = useDebin
        ? 'An error occurred while processing DEBIN request'
        : 'An error occurred while adding money';
      setFeedback({ 
        message: errorMessage, 
        type: 'error' 
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-money-page">
      <div className="form-container">
        <h2 className="page-title" style={{textAlign: 'center'}}>Add Money</h2>
        
        {/* Method Selection Toggle */}
        <ToggleSwitch
          label="Payment Method"
          leftOption={{ label: 'Simulate', value: false }}
          rightOption={{ label: 'DEBIN', value: true }}
          value={useDebin}
          onChange={setUseDebin}
        />

        {/* Description based on selected method */}
        <p style={{ 
          textAlign: 'center', 
          marginBottom: '1rem', 
          color: '#555', 
          fontSize: '0.9rem',
          minHeight: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {useDebin 
            ? 'Request money from your external bank account using DEBIN. The transfer will be processed automatically.'
            : 'Enter the amount you wish to simulate adding from an external source.'
          }
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
              step="0.01" 
              min="0.01"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading || !amount || parseFloat(amount) <= 0}
            style={{
              backgroundColor: useDebin ? '#2563eb' : '#10b981',
              borderColor: useDebin ? '#2563eb' : '#10b981'
            }}
          >
            {loading 
              ? (useDebin ? 'Processing DEBIN...' : 'Adding...') 
              : (useDebin ? 'Request via DEBIN' : 'Add Money')
            }
          </Button>
        </form>

        {/* Additional info for DEBIN */}
        {useDebin && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#1e40af'
          }}>
            <strong>About DEBIN:</strong>
            <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
              <li>DEBIN is a direct debit system for instant bank transfers</li>
              <li>Funds will be transferred from your linked bank account</li>
              <li>Processing typically takes a few seconds</li>
              <li>You'll receive a confirmation once the transfer is complete</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMoneyPage; 