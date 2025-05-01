
import { useState } from 'react';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5173/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};