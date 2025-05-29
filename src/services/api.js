// I'm replacing the mock API services with real backend calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const getBalance = async () => {
  const response = await fetch(`${API_BASE_URL}/wallet/balance`, {
    credentials: 'include', // Important for cookies
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  const data = await response.json();
  console.log('Balance response:', data);
  if (!response.ok) {
    return { success: false, message: data.message || 'Failed to fetch balance' };
  }
  return { success: true, balance: data.balance };
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

// desmoqueo las llamadas a los endpoints de la API
export const addMoney = async (amount, method, sourceIdentifier) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/deposit`, {
      method: 'POST',
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        method,
        sourceIdentifier
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add money');
    }

    return data;
  } catch (error) {
    console.error('Error adding money:', error);
    throw error;
  }
};

export const withdrawMoney = async (amount, bankAccount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/withdraw`, {
      method: 'POST',
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        bankAccount
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to withdraw money');
    }

    return data;
  } catch (error) {
    console.error('Error withdrawing money:', error);
    throw error;
  }
};

export const requestDebin = async (amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet/topup/debin`, {
      method: 'POST',
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseFloat(amount) })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to process DEBIN request');
    }

    return data;
  } catch (error) {
    console.error('Error processing DEBIN request:', error);
    throw error;
  }
}; 