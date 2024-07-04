import { renderHook, act, waitFor } from '@testing-library/react';
import usePlaylists from '../src/hooks/usePlaylists';

const mockPlaylists = [
  {
    playlist_id: 1,
    playlist_title: "My Playlist",
    shared: false,
    user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556",
    thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
  },
  {
    playlist_id: 2,
    playlist_title: "My Playlist2",
    shared: true,
    user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556",
    thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
  }
];

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('usePlaylists', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorage.clear();
    process.env.VITE_LOCAL_API_URL = 'http://example.com';
  });

  it('should fetch and return playlists', async () => {
    const token = 'mocked_token';
    localStorage.setItem('token', token);

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ playlists: mockPlaylists }),
    });

    // usePlaylists フックをレンダリング
    const { result } = renderHook(() => usePlaylists());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.playlists).toEqual(mockPlaylists);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://example.com/api/playlists',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch playlists';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    // usePlaylists フックをレンダリング
    const { result } = renderHook(() => usePlaylists());

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.playlists).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(new Error(errorMessage));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should refetch playlists when refetchPlaylists is called', async () => {
    const token = 'mocked_token';
    localStorage.setItem('token', token);

    // 初回のフェッチのモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ playlists: mockPlaylists }),
    });

    // usePlaylists フックをレンダリング
    const { result } = renderHook(() => usePlaylists());

    // 初回のデータ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.playlists).toEqual(mockPlaylists);
    });

    // 2回目のフェッチのモックを設定（データを変更）
    const updatedPlaylists = [...mockPlaylists, {
      playlist_id: 3,
      playlist_title: "My Playlist3",
      shared: true,
      user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556",
      thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
    }];
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ playlists: updatedPlaylists }),
    });

    // refetchPlaylists を呼び出す
    act(() => {
      result.current.refetchPlaylists();
    });

    // 2回目のデータ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.playlists).toEqual(updatedPlaylists);
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});