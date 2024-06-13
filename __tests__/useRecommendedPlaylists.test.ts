import { renderHook, waitFor } from '@testing-library/react';
import useRecommendedPlaylists from '../src/hooks/useRecommendedPlaylists';

const mockRecommendedPlaylists = {
  playlists: [
    {
      playlist_id: 1,
      playlist_name: 'My Playlist',
      thumbnail: 'https://example.com/thumbnail.jpg',
    },
    {
      playlist_id: 2,
      playlist_name: 'Another Playlist',
      thumbnail: null,
    },
  ],
};

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useRecommendedPlaylists', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should fetch and set playlists correctly', async () => {
    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecommendedPlaylists,
    });

    // useRecommendedPlaylists フックをレンダリング
    const { result } = renderHook(() => useRecommendedPlaylists());

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.playlists).toEqual(mockRecommendedPlaylists.playlists);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.VITE_LOCAL_API_URL}/api/recommended-playlists`);
  });

  it('should handle fetch error and log to console', async () => {
    const errorMessage = 'Failed to fetch recommended playlists';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // useRecommendedPlaylists フックをレンダリング
    const { result } = renderHook(() => useRecommendedPlaylists());

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.playlists).toEqual([]);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.VITE_LOCAL_API_URL}/api/recommended-playlists`);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching recommended playlists:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});