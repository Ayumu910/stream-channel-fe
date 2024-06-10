import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Stream.modules.css'

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
    <div className="stream" onClick={handleClick}>
      <img className="stream-thumbnail" src={thumbnail} alt="Stream Thumbnail" />
      <h3 className="stream-title">{title}</h3>
    </div>
  );
};

export default Stream;