import { useState } from 'react';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return { success: false, message: errorData.message || 'Login failed' };
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

  return { login, loading, error };
};