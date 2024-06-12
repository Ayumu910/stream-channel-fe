import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RecommendedCategory.modules.css';

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
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="recommended-category" onClick={handleCategoryClick}>
      <div className="category-name">{categoryName}</div>
      <div className="streamer-icons">
        {streamerIcons.map((icon, index) => (
        <img key={index} src={icon} alt={`Streamer Icon ${index + 1}`} />
      ))}
      </div>
    </div>
  );
};

export default RecommendedCategory;