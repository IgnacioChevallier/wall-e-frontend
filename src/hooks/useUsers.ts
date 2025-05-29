import { useState, useEffect } from 'react';
import { getUsersAliases } from '../services';

interface UserAliasesResult {
  aliases: string[];
  loading: boolean;
  error: string | null;
}

export const useUserAliases = (): UserAliasesResult => {
  const [aliases, setAliases] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAliases = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getUsersAliases();
        if (result.success) {
          setAliases(result.data || []);
        } else {
          setError(result.message || 'Failed to fetch user aliases');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user aliases';
        setError(errorMessage);
        console.error('Error fetching aliases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAliases();
  }, []);

  return { aliases, loading, error };
}; 