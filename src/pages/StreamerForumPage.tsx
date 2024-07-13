import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import styles from '../styles/StreamerForumPage.module.css';

const StreamerForumPage: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();

  return (
    <AuthProvider>
      <div className={styles['streamer-page']}>
        <GlobalNavBar />
        <div className={styles['streamer-page__content']}>
          <SideMenu />
          <main className={styles['streamer-page__main']}>
            <h1>Streamer Forum Page</h1>
            <p>Streamer ID: {streamerId}</p>
            <p>This page is under construction.</p>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default StreamerForumPage;