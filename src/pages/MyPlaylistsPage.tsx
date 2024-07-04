import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import PlaylistContainer from '../components/playlist/PlaylistContainer';
import PlaylistActionPane from '../components/playlist/PlaylistActionPane';
import styles from '../styles/MyPlaylistsPage.module.css';

const MyPlaylistsPage: React.FC = () => {
  return (
    <AuthProvider>
      <div className={styles['my-playlists-page']}>
        <GlobalNavBar />
        <div className={styles['my-playlists-page__content']}>
          <SideMenu />
          <main className={styles['my-playlists-page__main']}>
            <PlaylistContainer />
            <PlaylistActionPane />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default MyPlaylistsPage;