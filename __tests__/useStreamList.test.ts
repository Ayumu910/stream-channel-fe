import { renderHook, act, waitFor } from '@testing-library/react';
import useStreamList from '../src/hooks/useStreamList';
import { getCacheItem } from '../src/utils/cacheUtils';

// getCacheItemのモックを作成
jest.mock('../src/utils/cacheUtils', () => ({
  getCacheItem: jest.fn(),
}));

describe('useStreamList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch streams from cache correctly', async () => {
    // モックデータを定義
    const cachedCategories = [
      {
        category_id: '1',
        category_title: 'New Category',
        shared: false,
        user_id: '27dc16d9-e3cf-45fc-9784-91f63b670ae3',
      },
    ];

    const cachedCategoryDetail = {
      category_id: '1',
      category_name: 'New Category',
      streamers: [
        {
          id: 'UCx1nAvtVDIsaGmCMSe8ofsQ',
          name: 'jun channel',
          platform: 'youtube',
          streamer_icon: 'https://example.com/jun_channel_icon.jpg',
          most_recent_stream_thumbnail: 'https://example.com/jun_channel_thumbnail.jpg',
        },
      ],
    };

    const cachedStreamerDetail = {
      id: 'UCx1nAvtVDIsaGmCMSe8ofsQ',
      name: 'jun channel',
      url: 'https://www.youtube.com/channel/UCx1nAvtVDIsaGmCMSe8ofsQ',
      platform: 'youtube',
      streams: [
        {
          id: 'gECO_vK0ztM',
          title: '相席しょこ堂',
          views: '1055552',
          platform: 'youtube',
          thumbnail_image: 'https://example.com/stream_thumbnail.jpg',
        },
      ],
      streamer_icon: 'https://example.com/jun_channel_icon.jpg',
    };

    // getCacheItemのモックを設定
    (getCacheItem as jest.Mock).mockImplementation((key) => {
      if (key === 'categories') return Promise.resolve(cachedCategories);
      if (key === 'category_1') return Promise.resolve(cachedCategoryDetail);
      if (key.includes('streamer_UCx1nAvtVDIsaGmCMSe8ofsQ')) return Promise.resolve(cachedStreamerDetail);
      return Promise.resolve(null);
    });

    // useStreamList フックをレンダリング
    const { result } = renderHook(() => useStreamList());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual([
        {
          id: 'gECO_vK0ztM',
          title: '相席しょこ堂',
          views: '1055552',
          platform: 'youtube',
          thumbnail_image: 'https://example.com/stream_thumbnail.jpg',
        },
      ]);
    });

    // getCacheItemが正しく呼び出されたことを確認
    expect(getCacheItem).toHaveBeenCalledWith('categories');
    expect(getCacheItem).toHaveBeenCalledWith('category_1');
    expect(getCacheItem).toHaveBeenCalledWith('streamer_UCx1nAvtVDIsaGmCMSe8ofsQ');
  });

  it('should handle empty cache', async () => {
    // getCacheItemのモックを設定（すべてのキーに対してnullを返す）
    (getCacheItem as jest.Mock).mockResolvedValue(null);

    // useStreamList フックをレンダリング
    const { result } = renderHook(() => useStreamList());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual([]);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Categories not found in cache');
    });
  });

  it('should update displayCount when handleShowMore is called', async () => {
    // getCacheItemのモックを設定（空の配列を返す）
    (getCacheItem as jest.Mock).mockResolvedValue([]);

    // useStreamList フックをレンダリング
    const { result } = renderHook(() => useStreamList());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual([]);
    });

    // handleShowMore を呼び出す
    act(() => {
      result.current.handleShowMore();
    });

    // displayCount が14に更新されていることを確認
    expect(result.current.displayCount).toBe(14);
  });
});