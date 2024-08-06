import React from 'react';
import { useAppNavigate } from '../../hooks/useAppNavigate'
import styles from '../../styles/PlaylistStream.module.css';
import { Stream } from '../../hooks/usePlaylistDetail';

interface PlaylistStreamProps {
  stream: Stream;
}

const PlaylistStream: React.FC<PlaylistStreamProps> = ({ stream }) => {
  const navigate = useAppNavigate();

  const handleClick = () => {
    navigate(`stream/${stream.stream_id}`);
  };

  return (
    <div className={styles['playlist-stream']} onClick={handleClick}>

      <img
        className={styles['playlist-stream__thumbnail']}
        src={stream.thumbnail_image}
        alt="Stream Thumbnail"
      />

      <div className={styles['playlist-stream__info']}>
        <h3 className={styles['playlist-stream__title']}>{stream.title}</h3>
        <p className={styles['playlist-stream__views']}>{stream.views} views</p>

        <div className={styles['playlist-stream__tags']}>
          {stream.tags.map((tag) => (
            <span key={tag} className={styles['playlist-stream__tag']}>
            {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PlaylistStream;