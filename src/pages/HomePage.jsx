import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalance } from '../services/api';
import Button from '../components/Common/Button';

const HomePage = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBalance();
        if (response.success) {
          setBalance(response.balance);
        } else {
          setError('Failed to fetch balance');
        }
      } catch (err) {
        setError('An error occurred while fetching balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '...';
    // Format without $ sign, assuming currency symbol is handled elsewhere if needed
    return amount.toFixed(2);
  };

  return (
    <div className="home-page">
      {/* Optional: Add a page title if desired */}
      {/* <h2 className="page-title">Account</h2> */}

      <div className="card balance-card"> {/* Use card style */}
        {loading && <p>Loading balance...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {balance !== null && (
          <>
            <p>Current balance</p> {/* Label like in screenshot */}
            <h1>${formatCurrency(balance)}</h1> {/* Add currency symbol here */}
          </>
        )}
      </div>

      <div className="quick-actions">
        <Link to="/send">
          {/* Apply button class directly to Link or wrap Button */}
          <Button>Send Money</Button>
        </Link>
        <Link to="/add">
          <Button>Add Money</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 