import React from 'react';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import styles from '../../styles/RecommendedCategory.module.css';

interface RecommendedCategoryProps {
  categoryId: string;
  categoryName: string;
  streamerIcons: string[];
}
const RecommendedCategory: React.FC<RecommendedCategoryProps> = ({
  categoryId,
  categoryName,
  streamerIcons,
  }) =>
{
  const navigate = useAppNavigate();

  const handleCategoryClick = () => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className={styles["recommended-category"]} onClick={handleCategoryClick}>
      <div className={styles["recommended-category__name"]}>{categoryName}</div>
      <div className={styles["recommended-category__streamer-icons"]}>
        {streamerIcons.map((icon, index) => (
        <img
          key={index}
          className={styles['recommended-category__streamer-icon']}
          src={icon}
          alt={`Streamer Icon ${index + 1}`} />
      ))}
      </div>
    </div>
  );
};

export default RecommendedCategory;