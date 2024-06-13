import { useState, useEffect } from 'react';

interface Playlist {
  playlist_id: number;
  playlist_name: string;
  thumbnail: string | null;
}

const useRecommendedPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchRecommendedPlaylists = async () => {
      try {
        const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/recommended-playlists`);
        const data = await response.json();
        setPlaylists(data.playlists);
      } catch (error) {
        console.error('Error fetching recommended playlists:', error);
      }
    };

    fetchRecommendedPlaylists();
  }, []);

  return { playlists };
};

export default useRecommendedPlaylists;