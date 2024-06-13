import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Playlist.modules.css';

interface PlaylistProps {
  playlistId: number;
  playlistName: string;
  thumbnail: string | null;
}

const Playlist: React.FC<PlaylistProps> = ({ playlistId, playlistName, thumbnail }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="playlist" onClick={handleClick}>
      <div className="playlist-name">{playlistName}</div>
      <div className="playlist-thumbnail">
        {thumbnail ? (
          <img src={thumbnail} alt={playlistName} />
        ) : (
          <div className="default-thumbnail">No Image</div>
        )}
      </div>
    </div>
  );
};

export default Playlist;