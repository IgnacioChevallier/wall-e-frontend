import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { formatCurrency } from '../utils';
import Button from '../components/Common/Button';

const HomePage = () => {
  const { balance, loading, error } = useWallet();

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
            <h1>{formatCurrency(balance)}</h1> {/* Use utility function for formatting */}
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