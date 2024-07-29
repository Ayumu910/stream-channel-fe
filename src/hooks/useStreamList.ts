import { useState, useEffect } from 'react';
import { getCacheItem } from '../utils/cacheUtils';
import { Category } from './useCategories';
import { CategoryDetail } from './useCategoryDetail';
import { Streamer, Stream } from './useStreamerDetail';

const useStreamList = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStreams = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // キャッシュからカテゴリを取得
        const cachedCategories = await getCacheItem<Category[]>('categories');
        if (!cachedCategories) {
          throw new Error('Categories not found in cache');
        }

        const allStreams: Stream[] = [];

        for (const category of cachedCategories) {
          // キャッシュからカテゴリ詳細を取得
          const cachedCategoryDetail = await getCacheItem<CategoryDetail>(`category_${category.category_id}`);
          if (cachedCategoryDetail) {
            for (const streamer of cachedCategoryDetail.streamers) {
              // キャッシュからストリーマー詳細を取得
              const cacheKey = `streamer_${streamer.id}`;
              const cachedStreamerDetail = await getCacheItem<Streamer>(cacheKey);
              if (cachedStreamerDetail) {
                allStreams.push(...cachedStreamerDetail.streams);
              }
            }
          }
        }

        setStreams(allStreams);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreams();
  }, []);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  return { streams, displayCount, handleShowMore, isLoading, error };
};

export default useStreamList;