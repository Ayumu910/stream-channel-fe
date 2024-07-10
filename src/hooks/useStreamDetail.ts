import { useState, useEffect } from 'react';

interface Streamer {
  id: string;
  name: string;
  platform: string;
  streamer_icon: string;
}

interface Rating {
  good: number;
  bad: number;
}

interface Comment {
  id: string;
  comment_text: string;
}

interface Stream {
  id: string;
  url: string;
  title: string;
  views: string;
  streamer: Streamer;
  rating: Rating;
  tags: string[];
  platform: string;
  comments: Comment[];
  thumbnail_image: string;
}

const useStreamDetail = (streamId: string | undefined) => {
  const [stream, setStream] = useState<Stream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStreamDetail = async () => {
      if (!streamId) return;

      setIsLoading(true);
      setError(null);

      try {
        const platform = /^\d+$/.test(streamId) ? 'twitch' : 'youtube';
        const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/streams/${streamId}?platforms=${platform}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stream detail');
        }
        const data: Stream = await response.json();
        setStream(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamDetail();
  }, [streamId]);

  return { stream, isLoading, error };
};

export default useStreamDetail;