import React from 'react';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import styles from '../../styles/Streamer.module.css';

interface StreamerProps {
  streamer: {
    id: string;
    name: string;
    platform: string;
    streamer_icon: string;
    most_recent_stream_thumbnail: string;
  };
}
const Streamer: React.FC<StreamerProps> = ({ streamer }) => {
  const navigate = useAppNavigate();

  const handleStreamerClick = () => {
    navigate(`streamer/${streamer.id}`);
  };

  return (
    <div className={styles["streamer"]} onClick={handleStreamerClick}>
      <img className={styles["streamer__icon"]} src={streamer.streamer_icon} alt={`${streamer.name}'s icon`} />
      <div className={styles["streamer__name"]}>{streamer.name}</div>
      <img
        className={styles["streamer__thumbnail"]}
        src={streamer.most_recent_stream_thumbnail}
        alt={`${streamer.name}'s most recent stream thumbnail`}
      />
    </div>
    );
};
export default Streamer;