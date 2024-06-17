import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Stream.module.css'

interface StreamProps {
  thumbnail: string;
  title: string;
  streamId: string;
}

const Stream: React.FC<StreamProps> = ({ thumbnail, title, streamId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stream/${streamId}`);
  };

  return (
    <div className={styles["stream"]} onClick={handleClick}>
      <img className={styles["stream__thumbnail"]} src={thumbnail} alt="Stream Thumbnail" />
      <h3 className={styles["stream__title"]}>{title}</h3>
    </div>
  );
};

export default Stream;