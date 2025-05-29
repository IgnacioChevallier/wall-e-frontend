import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrencyWithSign, formatDate } from '../utils';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';

const HistoryPage = () => {
  const { transactions: history, loading, error } = useTransactions();

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
                {formatCurrencyWithSign(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;