import React from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetailPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();

  return (
    <div>
      <h1>Playlist Detail Page</h1>
      <p>Playlist ID: {playlistId}</p>
      {/* ここにプレイリストの詳細を表示するコードを追加 */}
    </div>
  );
};

export default PlaylistDetailPage;