import React from 'react';
import { useParams } from 'react-router-dom';
import usePlaylistDetail from '../hooks/usePlaylistDetail';
import PlaylistStream from '../components/stream/PlaylistStream';
import SortMenu from '../components/playlist/SortMenu';
import styles from '../styles/PlaylistDetailPage.module.css';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';

const PlaylistDetailPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { playlist, streams, sortStreams } = usePlaylistDetail(playlistId);

  return (
    <AuthProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <GlobalNavBar />
        <div style={{ display: 'flex' }}>
          <SideMenu />
          <div className={styles['playlist-detail-page']}>
            <div className={styles['playlist-detail-page__header']}>
              <h2 className={styles['playlist-detail-page__title']}>{playlist?.playlist_name}</h2>
              <SortMenu onSort={sortStreams} />
            </div>
            <div className={styles['playlist-detail-page__meta']}>
              <p className={styles['playlist-detail-page__stream-count']}>
                {streams.length} streams
              </p>
            </div>
            <div className={styles['playlist-detail-page__stream-list']}>
              {streams.map((stream) => (
                <PlaylistStream key={stream.stream_id} stream={stream} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default PlaylistDetailPage;