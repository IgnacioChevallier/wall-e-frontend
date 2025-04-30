import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi'; // Icons for income/expense

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getHistory();
        if (response.success) {
          setHistory(response.history);
        } else {
          setError('Failed to fetch transaction history');
        }
      } catch (err) {
        setError('An error occurred while fetching history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatCurrency = (amount) => {
    const value = Math.abs(amount).toFixed(2);
    return amount >= 0 ? `+$${value}` : `-$${value}`;
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' }; // e.g., "May 11"
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="history-page">
      <h2 className="page-title">Activity</h2> {/* Title from screenshot */}

      {loading && <p>Loading history...</p>}
      {error && <p className="feedback-message error">{error}</p>}
      {!loading && !error && history.length === 0 && (
        <div className="card"><p>No transactions yet.</p></div>
      )}

      {!loading && !error && history.length > 0 && (
        <ul className="transaction-list">
          {history.map((item) => (
            <li key={item.id} className="transaction-item card"> {/* Apply card style */}
              <div className="transaction-details">
                 {/* Basic Icon based on type */}
                 <span className={`transaction-icon ${item.type}`}>
                    {item.type === 'income' ? <FiArrowDownCircle color="var(--income-color)"/> : <FiArrowUpCircle color="var(--expense-color)"/>}
                 </span>
                 <div className="transaction-info">
                    <p className="description">{item.description}</p>
                    <p className="date">{formatDate(item.date)}</p>
                 </div>
              </div>
              <span className={`amount ${item.type}`}>
                {formatCurrency(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage; 