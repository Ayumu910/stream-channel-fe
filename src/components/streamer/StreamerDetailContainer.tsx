import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStreamerDetail from '../../hooks/useStreamerDetail';
import AddToCategoryButton from './AddToCategoryButton';
import Stream from '../stream/Stream';
import styles from '../../styles/StreamerDetailContainer.module.css';

interface StreamerDetailContainerProps {
  streamerId: string | undefined;
}

const StreamerDetailContainer: React.FC<StreamerDetailContainerProps> = ({ streamerId }) => {
  const { streamer, isLoading, error } = useStreamerDetail(streamerId);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stream');

  if (isLoading) return <div className={styles['streamer-detail__loading']}>Loading...</div>;
  if (error) return <div className={styles['streamer-detail__error']}>Error: {error.message}</div>;
  if (!streamer) return <div className={styles['streamer-detail__not-found']}>No streamer found</div>;

  const handleTabClick = (tab: string) => {
    if (tab === 'forum') {
      navigate(`/streamer/${streamerId}/forum`);
    } else if (tab === 'analysis') {
      navigate(`/streamer/${streamerId}/analysis`);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={styles['streamer-detail']}>
      <div className={styles['streamer-detail__header']}>
        <img
          src={streamer.streamer_icon}
          alt={streamer.name}
          className={styles['streamer-detail__icon']}
        />
        <h1 className={styles['streamer-detail__name']}>{streamer.name}</h1>
        <AddToCategoryButton streamerId={streamerId} />
      </div>
      <div className={styles['streamer-detail__tabs']}>
        <button
          className={`${styles['streamer-detail__tab']} ${activeTab === 'stream' ? styles['streamer-detail__tab--active'] : ''}`}
          onClick={() => handleTabClick('stream')}
        >
          Stream
        </button>
        <button
          className={`${styles['streamer-detail__tab']} ${activeTab === 'forum' ? styles['streamer-detail__tab--active'] : ''}`}
          onClick={() => handleTabClick('forum')}
        >
          Forum
        </button>
        <button
          className={`${styles['streamer-detail__tab']} ${activeTab === 'analysis' ? styles['streamer-detail__tab--active'] : ''}`}
          onClick={() => handleTabClick('analysis')}
        >
          Analysis
        </button>
      </div>
      {activeTab === 'stream' && (
        <div className={styles['streamer-detail__streams']}>
          {streamer.streams.map((stream) => (
            <Stream
              key={stream.id}
              thumbnail={stream.thumbnail_image}
              title={stream.title}
              streamId={stream.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamerDetailContainer;