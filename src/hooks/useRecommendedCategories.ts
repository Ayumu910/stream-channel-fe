import { useState, useEffect } from 'react';

interface Category {
  category_id: string;
  streamer_icons: string[];
  category_name: string;
}

const useRecommendedCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recommended-categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching recommended categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return { categories };
};

export default useRecommendedCategories;