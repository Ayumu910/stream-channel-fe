import { useState, useEffect } from 'react';

interface AnalyticsData {
  basic_info: {
    total_views: string;
    subscribers: string;
  };
  ratings: {
    [key: string]: number;
  };
  audience_demographics: {
    [key: string]: number;
  };
}

const useStreamerAnalytics = (streamerId: string | undefined, platform: string | undefined) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    if (!streamerId || !platform) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/streamer/${streamerId}/analytics?platform=${platform}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [streamerId, platform]);

  return { analyticsData, isLoading, error, refetchAnalytics: fetchAnalytics };
};

export default useStreamerAnalytics;