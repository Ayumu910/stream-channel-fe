import React from 'react';
import { useParams } from 'react-router-dom';
import useCategoryDetail from '../hooks/useCategoryDetail';
import Streamer from '../components/streamer/Streamer';
import '../styles/CategoryDetailPage.modules.css';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { category, isLoading, error } = useCategoryDetail(categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AuthProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <GlobalNavBar />
        <div style={{ display: 'flex' }}>
          <SideMenu />
          <main className="category-detail-page">
            <h1 className="category-name">{category?.category_name}</h1>
            <div className="streamer-list">
              {category?.streamers.map((streamer) => (
                <Streamer key={streamer.id} streamer={streamer} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default CategoryDetailPage;