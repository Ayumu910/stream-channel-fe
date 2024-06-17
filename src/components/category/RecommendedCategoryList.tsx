import React from 'react';
import RecommendedCategory from '../category/RecommendedCategory';
import styles from '../../styles/RecommendedCategoryList.module.css';
import useRecommendedCategories from '../../hooks/useRecommendedCategories'

const RecommendedCategoryList: React.FC = () => {
  const { categories } = useRecommendedCategories();

    return (
      <div className={styles["recommended-category-list"]}>
        <h2 className={styles['recommended-category-list__heading']}>他の人はこんな配信者を見ています</h2>
        <div className={styles["recommended-category-list__grid-wrapper"]}>
        <div className={styles["recommended-category-list__grid"]}>
          {categories.map((category) => (
            <RecommendedCategory
              key={category.category_id}
              categoryId={category.category_id}
              categoryName={category.category_name}
              streamerIcons={category.streamer_icons}
            />
          ))}
        </div>
        </div>
    </div>
  );
};

export default RecommendedCategoryList;