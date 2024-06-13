import React from 'react';
import Playlist from './Playlist';
import '../../styles/RecommendedPlaylists.modules.css'
import useRecommendedPlaylists from '../../hooks/useRecommendedPlaylists';

const RecommendedPlaylists: React.FC = () => {
  const { playlists } = useRecommendedPlaylists();

  return (
    <div className="recommended-playlists">
      <h2>人気のプレイリスト</h2>
      <div className="playlist-list">
        {playlists.map((playlist) => (
          <Playlist
            key={playlist.playlist_id}
            playlistId={playlist.playlist_id}
            playlistName={playlist.playlist_name}
            thumbnail={playlist.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaylists;