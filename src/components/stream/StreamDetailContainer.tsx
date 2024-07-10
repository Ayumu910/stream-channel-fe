import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStreamDetail from '../../hooks/useStreamDetail';
import AddToPlaylistButton from './AddToPlaylistButton';
import ReviewStreamButton from './ReviewStreamButton';
import StreamCommentForm from './StreamCommentForm';
import StreamCommentList from './StreamCommentList';
import styles from '../../styles/StreamDetailContainer.module.css';

interface StreamDetailContainerProps {
  streamId: string | undefined;
}

const StreamDetailContainer: React.FC<StreamDetailContainerProps> = ({ streamId }) => {
  const { stream, isLoading, error } = useStreamDetail(streamId);
  const navigate = useNavigate();

  if (isLoading) return <div className={styles['stream-detail__loading']}>Loading...</div>;
  if (error) return <div className={styles['stream-detail__error']}>Error: {error.message}</div>;
  if (!stream) return <div className={styles['stream-detail__not-found']}>No stream found</div>;

  const handleStreamerClick = () => {
    navigate(`/streamer/${stream.streamer.id}`);
  };

  const handleThumbnailClick = () => {
    if (stream.url) {
      window.open(stream.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={styles['stream-detail']}>
      <div
        className={styles['stream-detail__thumbnail']}
        onClick={handleThumbnailClick}
        style={{ cursor: stream.url ? 'pointer' : 'default' }}
      >
        {stream.thumbnail_image && (
          <img src={stream.thumbnail_image} alt={stream.title} />
        )}
      </div>
      <h1 className={styles['stream-detail__title']}>{stream.title}</h1>
      <div className={styles['stream-detail__info-row']}>
        <div className={styles['stream-detail__streamer-info']} onClick={handleStreamerClick}>
          {stream.streamer.streamer_icon && (
            <img src={stream.streamer.streamer_icon} alt={stream.streamer.name} className={styles['stream-detail__streamer-icon']} />
          )}
          <span className={styles['stream-detail__streamer-name']}>{stream.streamer.name}</span>
        </div>
        <div className={styles['stream-detail__actions']}>
        <AddToPlaylistButton url={stream.url} />
          <ReviewStreamButton
            streamId={stream.id}
            initialGoodCount={stream.rating?.good ?? 0}
            initialBadCount={stream.rating?.bad ?? 0}
          />
        </div>
      </div>
      {stream.tags && stream.tags.length > 0 && (
        <div className={styles['stream-detail__tags']}>
          {stream.tags.map((tag, index) => (
            <span key={index} className={styles['stream-detail__tag']}>{tag}</span>
          ))}
        </div>
      )}
      <StreamCommentForm streamId={stream.id} />
      <StreamCommentList comments={stream.comments ?? []} />
    </div>
  );
};

export default StreamDetailContainer;