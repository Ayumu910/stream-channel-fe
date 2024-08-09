import React from 'react';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import styles from '../../styles/Playlist.module.css';

interface PlaylistProps {
  playlistId: number;
  playlistName: string;
  thumbnail: string | null;
}

const Playlist: React.FC<PlaylistProps> = ({ playlistId, playlistName, thumbnail }) => {
  const navigate = useAppNavigate();

  const handleClick = () => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className={styles["playlist"]} onClick={handleClick}>
      <div className={styles["playlist__name"]}>{playlistName}</div>
      <div className={styles["playlist__thumbnail"]}>
        {thumbnail ? (
          <img className={styles['playlist__thumbnail-image']} src={thumbnail} alt={playlistName} />
        ) : (
          <div className={styles["playlist__default-thumbnail"]}>No Image</div>
        )}
      </div>
    </div>
  );
};

export default Playlist;