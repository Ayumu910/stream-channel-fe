import React from 'react';
import Stream from './Stream';
import styles from '../../styles/StreamList.module.css'
import useStreamList from '../../hooks/useStreamList';

const StreamList: React.FC = () => {
  const { streams, displayCount, handleShowMore } = useStreamList();

  return (
    <div className={styles["stream-list"]}>
      <h2 className={styles['stream-list__heading']}>お気に入りの配信者</h2>
      <div className={styles["stream-list__grid"]}>
        {streams.slice(0, displayCount).map((stream) => (
          <Stream
            key={stream.id}
            thumbnail={stream.thumbnail_image}
            title={stream.title}
            streamId={stream.id}
          />
        ))}
      </div>
      {displayCount < streams.length && (
        <div className={styles["stream-list__show-more"]}>
          <div className={styles["stream-list__show-more-line"]}></div>
          <button className={styles["stream-list__show-more-button"]} onClick={handleShowMore}>
            もっと見る
          </button>
          <div className={styles["stream-list__show-more-line"]}></div>
        </div>
      )}
    </div>
  );
};

export default StreamList;