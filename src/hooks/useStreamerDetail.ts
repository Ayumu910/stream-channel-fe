import { useState, useEffect } from 'react';
import { setCacheItem, getCacheItem } from '../utils/cacheUtils';

export interface Streamer {
  id: string;
  name: string;
  url: string;
  platform: string;
  streams: Stream[];
  streamer_icon: string;
}

export interface Stream {
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
        const cacheKey = `streamer_${streamerId}`;
        const cachedStreamer = await getCacheItem<Streamer>(cacheKey);
        if (cachedStreamer) {
          setStreamer(cachedStreamer);
          setIsLoading(false);
          return;
        }

        const platform = /^\d+$/.test(streamerId) ? 'twitch' : 'youtube';
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/streamer/${streamerId}?platform=${platform}`);

        if (!response.ok) {
          throw new Error('Failed to fetch streamer details');
        }

        const data = await response.json();
        setStreamer(data);
        await setCacheItem(cacheKey, data);
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