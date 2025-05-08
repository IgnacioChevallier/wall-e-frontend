// Placeholder functions to simulate API calls

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Wallet Operations ---
let currentBalance = 2927.00; // Initial dummy balance
let transactionId = 0;
const initialTransactions = [
  {
    id: ++transactionId,
    type: 'income',
    description: 'Simulated Deposit',
    amount: 50.00,
    date: '2025-05-23',
  },
  {
    id: ++transactionId,
    type: 'expense',
    description: 'Transfer to friend@test.com',
    amount: -25.00,
    date: '2025-05-22',
  },
  {
    id: ++transactionId,
    type: 'income',
    description: 'Transfer from other@test.com',
    amount: 100.00,
    date: '2025-05-20',
  },
];
let transactions = [...initialTransactions];

export const getBalance = async () => {
  console.log("Simulating fetching balance");
  await delay(300);
  return { success: true, balance: currentBalance };
};

export const getHistory = async () => {
  console.log("Simulating fetching history");
  await delay(600);
  // Return a copy sorted by date descending for display
  return { success: true, history: [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)) };
};

export const sendMoney = async (recipient, amount) => {
  console.log(`Simulating sending ${amount} to ${recipient}`);
  await delay(800);
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { success: false, message: "Invalid amount" };
  }
  if (currentBalance < numericAmount) {
    return { success: false, message: "Insufficient funds" };
  }
  currentBalance -= numericAmount;
  transactions.push({
    id: ++transactionId,
    type: 'expense',
    description: `Transfer to ${recipient}`,
    amount: -numericAmount,
    date: new Date().toISOString().split('T')[0],
  });
  return { success: true, message: `Successfully sent ${numericAmount.toFixed(2)}` };
};

export const addMoney = async (amount) => {
  console.log(`Simulating adding ${amount}`);
  await delay(500);
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { success: false, message: "Invalid amount" };
  }
  currentBalance += numericAmount;
  transactions.push({
    id: ++transactionId,
    type: 'income',
    description: 'Simulated Deposit',
    amount: numericAmount,
    date: new Date().toISOString().split('T')[0],
  });
  return { success: true, message: `Successfully added ${numericAmount.toFixed(2)}` };
}; 