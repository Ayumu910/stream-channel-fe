import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import StreamerDetailContainer from '../components/streamer/StreamerDetailContainer';
import styles from '../styles/StreamerDetailPage.module.css';

const StreamerDetailPage: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();

  return (
    <AuthProvider>
      <div className={styles['streamer-detail-page']}>
        <GlobalNavBar />
        <div className={styles['streamer-detail-page__content']}>
          <SideMenu />
          <main className={styles['streamer-detail-page__main']}>
            <StreamerDetailContainer streamerId={streamerId} />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default StreamerDetailPage;