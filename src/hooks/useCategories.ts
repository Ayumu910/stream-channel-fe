import { useState, useEffect, useCallback } from 'react';
import { setCacheItem } from '../utils/cacheUtils';

export interface Category {
  category_id: string;
  category_title: string;
  shared: boolean;
  user_id: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.categories);
      await setCacheItem('categories', data.categories);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const refetchCategories = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, error, refetchCategories };
};

export default useCategories;