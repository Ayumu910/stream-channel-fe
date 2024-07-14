import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStreamerContext } from '../../contexts/StreamerContext';
import AddToCategoryButton from './AddToCategoryButton';
import styles from '../../styles/StreamerHeader.module.css';

const StreamerHeader: React.FC = () => {
  const { streamer } = useStreamerContext();
  const location = useLocation();

  if (!streamer) return null;

  return (
    <div className={styles['streamer-header']}>
      <div className={styles['streamer-header__info']}>
        <img
          src={streamer.streamer_icon}
          alt={streamer.name}
          className={styles['streamer-header__icon']}
        />
        <h1 className={styles['streamer-header__name']}>{streamer.name}</h1>
        <AddToCategoryButton streamerId={streamer.id} />
      </div>
      <div className={styles['streamer-header__tabs']}>
        <Link
          to={`/streamer/${streamer.id}`}
          className={`${styles['streamer-header__tab']} ${location.pathname === `/streamer/${streamer.id}` ? styles['streamer-header__tab--active'] : ''}`}
        >
          Stream
        </Link>
        <Link
          to={`/streamer/${streamer.id}/forum`}
          className={`${styles['streamer-header__tab']} ${location.pathname === `/streamer/${streamer.id}/forum` ? styles['streamer-header__tab--active'] : ''}`}
        >
          Forum
        </Link>
        <Link
          to={`/streamer/${streamer.id}/analysis`}
          className={`${styles['streamer-header__tab']} ${location.pathname === `/streamer/${streamer.id}/analysis` ? styles['streamer-header__tab--active'] : ''}`}
        >
          Analysis
        </Link>
      </div>
    </div>
  );
};

export default StreamerHeader;