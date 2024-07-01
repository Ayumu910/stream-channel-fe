import { renderHook, act, waitFor } from '@testing-library/react';
import useCategories from '../src/hooks/useCategories';

const mockCategories = [
  {
    category_id: "1",
    category_title: "New Category",
    shared: false,
    user_id: "bfe5e576-54b6-4835-94de-5a78094f2b3f"
  },
  {
    category_id: "2",
    category_title: "New Category2",
    shared: false,
    user_id: "bfe5e576-54b6-4835-94de-5a78094f2b3f"
  }
];

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useCategories', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorage.clear();
    process.env.VITE_LOCAL_API_URL = 'http://example.com';
  });

  it('should fetch and return categories', async () => {
    const token = 'mocked_token';
    localStorage.setItem('token', token);

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categories: mockCategories }),
    });

    // useCategories フックをレンダリング
    const { result } = renderHook(() => useCategories());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.categories).toEqual(mockCategories);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://example.com/api/categories',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch categories';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    // useCategories フックをレンダリング
    const { result } = renderHook(() => useCategories());

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.categories).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(new Error(errorMessage));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should refetch categories when refetchCategories is called', async () => {
    const token = 'mocked_token';
    localStorage.setItem('token', token);

    // 初回のフェッチのモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categories: mockCategories }),
    });

    // useCategories フックをレンダリング
    const { result } = renderHook(() => useCategories());

    // 初回のデータ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.categories).toEqual(mockCategories);
    });

    // 2回目のフェッチのモックを設定（データを変更）
    const updatedCategories = [...mockCategories, {
      category_id: "3",
      category_title: "New Category3",
      shared: true,
      user_id: "bfe5e576-54b6-4835-94de-5a78094f2b3f"
    }];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categories: updatedCategories }),
    });

    // refetchCategories を呼び出す
    act(() => {
      result.current.refetchCategories();
    });

    // 2回目のデータ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.categories).toEqual(updatedCategories);
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});