import React, { useState, useCallback } from 'react';
import Streamer from '../streamer/Streamer';
import DeleteButton from '../common/DeleteButton';
import useCategories from '../../hooks/useCategories';
import useCategoryDetail from '../../hooks/useCategoryDetail';
import styles from '../../styles/MyCategoryList.module.css';

const MyCategoryList: React.FC = () => {
  const { categories, isLoading: isCategoriesLoading, error: categoriesError, refetchCategories } = useCategories(); //エイリアス
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);   //カテゴリの展開、非展開状態を配列で管理

  //カテゴリを展開または非展開に
  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  //カテゴリを削除
  const handleDeleteCategory = useCallback(async (categoryId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      //削除に成功したら再 fetch
      refetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }, [refetchCategories]);

  if (isCategoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error: {categoriesError.message}</div>;

  return (
    <div className={styles['category-list']}>
      {categories.map(category => (
        <CategoryItem
          key={category.category_id}
          category={category}
          isExpanded={expandedCategories.includes(category.category_id)}
          onToggle={() => toggleCategory(category.category_id)}
          onDeleteCategory={() => handleDeleteCategory(category.category_id)}
          refetchCategories={refetchCategories}
        />
      ))}
    </div>
  );
};

interface CategoryItemProps {
  category: {
    category_id: string;
    category_title: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onDeleteCategory: () => void;
  refetchCategories: () => void;
}

//1つのカテゴリを表すコンポーネント
const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isExpanded,
  onToggle,
  onDeleteCategory,
  refetchCategories
}) => {
  const { category: categoryDetail, isLoading, error } = useCategoryDetail(category.category_id); //エイリアス

  //配信者を削除
  const handleDeleteStreamer = useCallback(async (streamerId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${category.category_id}/streamers/${streamerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete streamer');
      }

      //削除に成功したら、再 fetch
      refetchCategories();
    } catch (error) {
      console.error('Error deleting streamer:', error);
    }
  }, [category.category_id, refetchCategories]);

  if (isLoading) return <div>Loading category details...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles['category-list__item']}>
      <div className={styles['category-list__header']}  onClick={onToggle} >
        <h3 className={styles['category-list__title']}>{category.category_title}</h3>
        <DeleteButton
          onDelete={onDeleteCategory}
          itemType="category"
        />
      </div>
      {isExpanded && categoryDetail && (
        <div className={styles['category-list__streamer-list']}>
          {categoryDetail.streamers.map(streamer => (
            <div key={streamer.id} className={styles['category-list__streamer-item']}>
              <div className={styles['category-list__streamer-wrapper']}>
                <Streamer streamer={streamer} />
              </div>
              <DeleteButton
                onDelete={() => handleDeleteStreamer(streamer.id)}
                itemType="streamer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCategoryList;