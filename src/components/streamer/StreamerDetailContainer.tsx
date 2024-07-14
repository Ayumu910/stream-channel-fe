import React from 'react';
import { useStreamerContext } from '../../contexts/StreamerContext';
import Stream from '../stream/Stream';
import styles from '../../styles/StreamerDetailContainer.module.css';

const StreamerDetailContainer: React.FC = () => {
  const { streamer, isLoading, error } = useStreamerContext();

  if (isLoading) return <div className={styles['streamer-detail__loading']}>Loading...</div>;
  if (error) return <div className={styles['streamer-detail__error']}>Error: {error.message}</div>;
  if (!streamer) return <div className={styles['streamer-detail__not-found']}>No streamer found</div>;

  return (
    <div className={styles['streamer-detail']}>
      <div className={styles['streamer-detail__streams']}>
        {streamer.streams && streamer.streams.map((stream) => (
          <Stream
            key={stream.id}
            thumbnail={stream.thumbnail_image}
            title={stream.title}
            streamId={stream.id}
          />
        ))}
      </div>
    </div>
  );
};

export default StreamerDetailContainer;