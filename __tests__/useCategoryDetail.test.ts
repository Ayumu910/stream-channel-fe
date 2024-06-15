import { renderHook, waitFor } from '@testing-library/react';
import useCategoryDetail from '../src/hooks/useCategoryDetail';

const mockCategoryDetail = {
  category_id: '1',
  category_name: 'Category 1',
  streamers: [
    {
      id: 'streamer1',
      name: 'Streamer 1',
      platform: 'youtube',
      streamer_icon: 'https://example.com/streamer1.png',
      most_recent_stream_thumbnail: 'https://example.com/stream1.png',
    },
    {
      id: 'streamer2',
      name: 'Streamer 2',
      platform: 'twitch',
      streamer_icon: 'https://example.com/streamer2.png',
      most_recent_stream_thumbnail: 'https://example.com/stream2.png',
    },
  ],
};

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useCategoryDetail', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorage.clear();
  });

  it('should fetch and return category detail', async () => {
    const categoryId = '1';
    const token = 'mocked_token';
    localStorage.setItem('token', token);

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategoryDetail,
    });

    // useCategoryDetail フックをレンダリング
    const { result } = renderHook(() => useCategoryDetail(categoryId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.category).toEqual(mockCategoryDetail);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/categories/${categoryId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it('should handle fetch error', async () => {
    const categoryId = '1';
    const errorMessage = 'Failed to fetch category detail';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    // useCategoryDetail フックをレンダリング
    const { result } = renderHook(() => useCategoryDetail(categoryId));

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error(errorMessage));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/categories/${categoryId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${null}`,
        },
      }
    );
  });
});