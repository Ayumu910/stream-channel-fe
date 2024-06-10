import { useState, useEffect } from 'react';

export interface Stream {
  id: string;
  title: string;
  views: string;
  platform: string;
  thumbnail_image: string;
}

export interface Streamer {
  id: string;
  name: string;
  platform: string;
  streamer_icon: string;
  most_recent_stream_thumbnail: string;
}

export interface Category {
  category_id: string;
  category_title: string;
  shared: boolean;
  user_id: string;
}

const useStreamList = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      //ユーザーのカテゴリ一覧を取得
      const categoriesResponse = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { categories } = await categoriesResponse.json();

      // 配信者の取得
      const streamersPromises = categories.map(async (category: Category) => {
        const categoryResponse = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${category.category_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { streamers } = await categoryResponse.json();
        return streamers;
      });

      const streamersData = await Promise.all(streamersPromises);
      const streamers = streamersData.flat();

      // 配信の取得
      const streamsPromises = streamers.map(async (streamer: Streamer) => {
        const streamResponse = await fetch(
          `${process.env.VITE_LOCAL_API_URL}/api/streamer/${streamer.id}?platform=${streamer.platform}`
        );
        const { streams } = await streamResponse.json();
        return streams;
      });

      const streamsData = await Promise.all(streamsPromises);
      const streams = streamsData.flat();
      setStreams(streams);
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  return { streams, displayCount, handleShowMore };
};

export default useStreamList;