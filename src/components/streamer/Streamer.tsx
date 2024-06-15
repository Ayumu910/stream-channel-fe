import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Streamer.modules.css';

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
  const navigate = useNavigate();

  const handleStreamerClick = () => {
    navigate(`/streamer/${streamer.id}`);
  };

  return (
    <div className="streamer" onClick={handleStreamerClick}>
      <img className="streamer-icon" src={streamer.streamer_icon} alt={`${streamer.name}'s icon`} />
      <div className="streamer-name">{streamer.name}</div>
      <img
        className="most-recent-stream-thumbnail"
        src={streamer.most_recent_stream_thumbnail}
        alt={`${streamer.name}'s most recent stream thumbnail`}
      />
    </div>
    );
};
export default Streamer;