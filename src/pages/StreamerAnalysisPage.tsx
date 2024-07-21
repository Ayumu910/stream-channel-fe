import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { StreamerProvider } from '../contexts/StreamerContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import StreamerHeader from '../components/streamer/StreamerHeader';
import StreamerAnalysisContainer from '../components/streamer/StreamerAnalysisContainer';
import styles from '../styles/StreamerAnalysisPage.module.css';

const StreamerAnalysisPage: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();

  if (!streamerId) return <div>Streamer ID not provided</div>;

  return (
    <AuthProvider>
      <StreamerProvider streamerId={streamerId}>
        <div className={styles['streamer-analysis-page']}>
          <GlobalNavBar />
          <div className={styles['streamer-analysis-page__content']}>
            <SideMenu />
            <main className={styles['streamer-analysis-page__main']}>
              <StreamerHeader />
              <StreamerAnalysisContainer />
            </main>
          </div>
        </div>
      </StreamerProvider>
    </AuthProvider>
  );
};

export default StreamerAnalysisPage;