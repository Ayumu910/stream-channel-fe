import { useState, useEffect, useCallback } from 'react';

interface Playlist {
  playlist_id: number;
  playlist_title: string;
  shared: boolean;
  user_id: string;
  thumbnail: string;
}

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlaylists = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/playlists`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const data = await response.json();
      setPlaylists(data.playlists);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const refetchPlaylists = useCallback(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return { playlists, isLoading, error, refetchPlaylists };
};

export default usePlaylists;