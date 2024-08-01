import React from 'react';
import Playlist from './Playlist';
import styles from '../../styles/RecommendedPlaylists.module.css'
import useRecommendedPlaylists from '../../hooks/useRecommendedPlaylists';

const RecommendedPlaylists: React.FC = () => {
  const { playlists } = useRecommendedPlaylists();

  return (
    <div className={styles["recommended-playlists"]}>
      <h2 className={styles['recommended-playlists__heading']}>他の人が見ているプレイリスト</h2>
      <div className={styles["recommended-playlists__list"]}>
        {playlists.map((playlist) => (
          <Playlist
            key={playlist.playlist_id}
            playlistId={playlist.playlist_id}
            playlistName={playlist.playlist_name}
            thumbnail={playlist.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaylists;