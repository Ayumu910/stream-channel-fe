import React from 'react';
import Stream from './Stream';
import '../../styles/StreamList.modules.css'
import useStreamList from '../../hooks/useStreamList';

const StreamList: React.FC = () => {
  const { streams, displayCount, handleShowMore } = useStreamList();

  return (
    <div className="stream-list">
      <h2>お気に入りの配信者</h2>
      <div className="stream-grid">
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
        <div className="show-more-container">
          <div className="show-more-line"></div>
          <button className="show-more-button" onClick={handleShowMore}>
            もっと見る
          </button>
          <div className="show-more-line"></div>
        </div>
      )}
    </div>
  );
};

export default StreamList;