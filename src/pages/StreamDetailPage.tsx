import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import StreamDetailContainer from '../components/stream/StreamDetailContainer';
import styles from '../styles/StreamDetailPage.module.css';

const StreamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AuthProvider>
      <div className={styles['stream-detail-page']}>
        <GlobalNavBar />
        <div className={styles['stream-detail-page__content']}>
          <SideMenu />
          <main className={styles['stream-detail-page__main']}>
            <StreamDetailContainer streamId={id} />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default StreamDetailPage;