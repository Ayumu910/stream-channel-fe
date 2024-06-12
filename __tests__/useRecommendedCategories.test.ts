import { renderHook, waitFor } from '@testing-library/react';
import useRecommendedCategories from '../src/hooks/useRecommendedCategories';

const mockRecommendedCategories = {
  categories: [
    {
      category_id: '1',
      streamer_icons: [
        'https://example.com/icon1.png',
        'https://example.com/icon2.png',
        'https://example.com/icon3.png',
      ],
      category_name: 'Category 1',
    },
    {
      category_id: '2',
      streamer_icons: [
        'https://example.com/icon4.png',
        'https://example.com/icon5.png',
    ],
      category_name: 'Category 2',
    },
  ],
};

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useRecommendedCategories', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should fetch and return recommended categories', async () => {
    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecommendedCategories,
    });

    // useRecommendedCategories フックをレンダリング
    const { result } = renderHook(() => useRecommendedCategories());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.categories).toEqual(mockRecommendedCategories.categories);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.VITE_LOCAL_API_URL}/api/recommended-categories`);
  });

  it('should handle fetch error and log to console', async () => {
    const errorMessage = 'Failed to fetch categories';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // useRecommendedCategories フックをレンダリング
    const { result } = renderHook(() => useRecommendedCategories());

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.categories).toEqual([]);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.VITE_LOCAL_API_URL}/api/recommended-categories`);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching recommended categories:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});