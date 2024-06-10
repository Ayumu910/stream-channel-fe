import { renderHook, act, waitFor } from '@testing-library/react';
import useStreamList from '../src/hooks/useStreamList';

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useStreamList', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should fetch and set streams correctly', async () => {
    // モックデータを定義
    const categoriesData = {
      categories: [
        {
          category_id: '1',
          category_title: 'New Category',
          shared: false,
          user_id: '27dc16d9-e3cf-45fc-9784-91f63b670ae3',
        },
      ],
    };

    const categoryData = {
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

    const streamerData = {
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

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => categoriesData,
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => categoryData,
    });
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => streamerData,
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
  });

  it('should update displayCount when handleShowMore is called', async () => {
    // モックデータを定義
    const categoriesData = {
      categories: [],
    };

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => categoriesData,
    });

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

    // displayCount が13に更新されていることを確認
    expect(result.current.displayCount).toBe(13);
  });
});