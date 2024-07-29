import { useState, useEffect } from 'react';
import { setCacheItem } from '../utils/cacheUtils';

export interface Streamer {
  id: string;
  name: string;
  platform: string;
  streamer_icon: string;
  most_recent_stream_thumbnail: string;
}

export interface CategoryDetail {
  category_id: string;
  category_name: string;
  streamers: Streamer[];
}

const useCategoryDetail = (categoryId: string | undefined) => {
  const [category, setCategory] = useState<CategoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${categoryId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch category detail');
        }

        const data: CategoryDetail = await response.json();
        setCategory(data);
        await setCacheItem(`category_${categoryId}`, data);
      } catch (error) {
        setError(error as Error);
      }
        setIsLoading(false);
      };

    if (categoryId) {
      fetchCategoryDetail();
    }
  }, [categoryId]);

  return { category, isLoading, error };
};

export default useCategoryDetail;