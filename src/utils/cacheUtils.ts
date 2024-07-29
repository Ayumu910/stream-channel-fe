// src/utils/cacheUtils.ts
const CACHE_NAME = 'stream-app-cache-v1';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1時間（ミリ秒）

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export async function setCacheItem<T>(key: string, data: T) {
  const cache = await caches.open(CACHE_NAME);
  const cacheData: CacheData<T> = {
    data,
    timestamp: Date.now()
  };
  await cache.put(key, new Response(JSON.stringify(cacheData)));
}

export async function getCacheItem<T>(key: string): Promise<T | null> {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();

  // キーに "streamer_" が含まれている場合、streamer_id を抽出
  const streamerId = key.includes('streamer_') ? key.split('streamer_')[1] : null;

  if (streamerId) {
    // streamer_id を含むキャッシュを検索
    for (const request of keys) {
      if (request.url.includes(streamerId)) {
        const response = await cache.match(request);
        if (response) {
          const cacheData = await response.json();
          if (Date.now() - cacheData.timestamp < CACHE_EXPIRATION) {
            console.log(`Cache hit for streamer_id: ${streamerId}, key: ${request.url}`);
            return cacheData.data;
          } else {
            // 期限切れの場合、キャッシュを削除
            await cache.delete(request);
            console.log(`Expired cache removed for key: ${request.url}`);
          }
        }
      }
    }
    console.log(`No valid cache found for streamer_id: ${streamerId}`);
  } else {
    // streamer 以外のキャッシュの場合、通常の検索を行う
    const response = await cache.match(key);
    if (response) {
      const cacheData = await response.json();
      if (Date.now() - cacheData.timestamp < CACHE_EXPIRATION) {
        console.log(`Cache hit for key: ${key}`);
        return cacheData.data;
      } else {
        await cache.delete(key);
        console.log(`Expired cache removed for key: ${key}`);
      }
    }
  }

  return null;
}

export async function updateCacheItem<T>(key: string, updateFn: (data: T) => T) {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(key);
  if (response) {
    const cacheData: CacheData<T> = await response.json();
    if (Date.now() - cacheData.timestamp < CACHE_EXPIRATION) {
      const updatedData = updateFn(cacheData.data);
      await setCacheItem(key, updatedData);
    } else {
      // キャッシュが期限切れの場合、削除する
      await cache.delete(key);
    }
  }
}