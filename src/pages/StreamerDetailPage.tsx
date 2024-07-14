import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { StreamerProvider } from '../contexts/StreamerContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import StreamerHeader from '../components/streamer/StreamerHeader';
import StreamerDetailContainer from '../components/streamer/StreamerDetailContainer';
import styles from '../styles/StreamerDetailPage.module.css';

const StreamerDetailPage: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();

  if (!streamerId) return <div>Streamer ID not provided</div>;

  return (
    <AuthProvider>
      <StreamerProvider streamerId={streamerId}>
        <div className={styles['streamer-detail-page']}>
          <GlobalNavBar />
          <div className={styles['streamer-detail-page__content']}>
            <SideMenu />
            <main className={styles['streamer-detail-page__main']}>
              <StreamerHeader />
              <StreamerDetailContainer />
            </main>
          </div>
        </div>
      </StreamerProvider>
    </AuthProvider>
  );
};

export default StreamerDetailPage;