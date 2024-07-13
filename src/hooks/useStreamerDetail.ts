import { useState, useEffect } from 'react';

interface Streamer {
  id: string;
  name: string;
  url: string;
  platform: string;
  streams: Stream[];
  streamer_icon: string;
}

interface Stream {
  id: string;
  title: string;
  views: string;
  platform: string;
  thumbnail_image: string;
}

const useStreamerDetail = (streamerId: string | undefined) => {
  const [streamer, setStreamer] = useState<Streamer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStreamerDetail = async () => {
      if (!streamerId) return;

      setIsLoading(true);
      setError(null);

      try {
        const platform = /^\d+$/.test(streamerId) ? 'twitch' : 'youtube';
        const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/streamer/${streamerId}?platform=${platform}`);

        if (!response.ok) {
          throw new Error('Failed to fetch streamer details');
        }

        const data = await response.json();
        setStreamer(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamerDetail();
  }, [streamerId]);

  return { streamer, isLoading, error };
};

export default useStreamerDetail;