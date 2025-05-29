import React from 'react';

interface FeedbackMessageProps {
  message: string;
  type: string; // 'success' or 'error'
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`feedback-message ${type}`}>
      {message}
    </div>
  );
};

export default FeedbackMessage; 