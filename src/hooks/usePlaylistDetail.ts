import { useState, useEffect } from 'react';

export interface Stream {
  stream_id: string;
  url: string;
  title: string;
  views: string;
  tags: string[];
  platform: string;
  thumbnail_image: string;
  addedAt: string;
}

export interface Playlist {
  playlist_id: string;
  playlist_name: string;
  streams: Stream[];
}

const usePlaylistDetail = (playlistId: string | undefined) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!playlistId) return;

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/playlists/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data: Playlist = await response.json();

      setPlaylist(data);
      setStreams(data.streams);
    };

    fetchData();
  }, [playlistId]);

  const sortStreams = (order: 'views' | 'newest' | 'oldest') => {
    const sortedStreams = [...streams].sort((a, b) => {
      if (order === 'views') {
        return Number(b.views) - Number(a.views);
      } else if (order === 'newest') {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      } else {
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      }
    });

    setStreams(sortedStreams);
  };
  return { playlist, streams, sortStreams };
};

export default usePlaylistDetail;