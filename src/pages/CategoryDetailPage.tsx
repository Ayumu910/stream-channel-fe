import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <div>
      <h1>Category Detail Page</h1>
      <p>Category ID: {categoryId}</p>
    </div>
  );
};

export default CategoryDetailPage;