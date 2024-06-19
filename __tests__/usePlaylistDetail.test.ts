import { renderHook, waitFor, act } from '@testing-library/react';
import usePlaylistDetail from '../src/hooks/usePlaylistDetail';

const mockPlaylistDetail = {
  playlist_id: '1',
  playlist_name: 'Playlist 1',
  streams: [
    {
      stream_id: 'stream1',
      url: 'https://example.com/stream1',
      title: 'Stream 1',
      views: '1000',
      tags: ['tag1', 'tag2'],
      platform: 'youtube',
      thumbnail_image: 'https://example.com/stream1.png',
      addedAt: '2023-06-18T10:00:00Z',
    },
    {
      stream_id: 'stream2',
      url: 'https://example.com/stream2',
      title: 'Stream 2',
      views: '500',
      tags: ['tag2', 'tag3'],
      platform: 'twitch',
      thumbnail_image: 'https://example.com/stream2.png',
      addedAt: '2023-06-17T15:30:00Z',
    },
  ],
};

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('usePlaylistDetail', () => {
  beforeEach(() => {
    fetchMock.mockClear();
    localStorage.clear();
  });

  it('should fetch and return playlist detail', async () => {
    const playlistId = '1';
    const token = 'mocked_token';
    localStorage.setItem('token', token);

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlaylistDetail,
    });

    // usePlaylistDetail フックをレンダリング
    const { result } = renderHook(() => usePlaylistDetail(playlistId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.playlist).toEqual(mockPlaylistDetail);
      expect(result.current.streams).toEqual(mockPlaylistDetail.streams);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it('should handle fetch error', async () => {
    const playlistId = '1';
    const errorMessage = 'Failed to fetch playlist detail';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: errorMessage }),
    });

    // usePlaylistDetail フックをレンダリング
    const { result } = renderHook(() => usePlaylistDetail(playlistId));

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.playlist).toBeNull();
      expect(result.current.streams).toEqual([]);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${null}`,
        },
      }
    );
  });

  it('should sort streams by views', async () => {
    const playlistId = '1';
    localStorage.setItem('token', 'mocked_token');
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlaylistDetail,
    });

    // usePlaylistDetail フックをレンダリング
    const { result } = renderHook(() => usePlaylistDetail(playlistId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual(mockPlaylistDetail.streams);
    });

    // ストリームを視聴回数順に並べ替える
    act(() => {
      result.current.sortStreams('views');
    });

    // 並べ替えの完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual([
        mockPlaylistDetail.streams[0],
        mockPlaylistDetail.streams[1],
      ]);
    });
  });

  it('should sort streams by newest', async () => {
    const playlistId = '1';
    localStorage.setItem('token', 'mocked_token');
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlaylistDetail,
    });

    // usePlaylistDetail フックをレンダリング
    const { result } = renderHook(() => usePlaylistDetail(playlistId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual(mockPlaylistDetail.streams);
    });

    // ストリームを新しい順に並べ替える
    act(() => {
      result.current.sortStreams('newest');
    });

    // 並べ替えの完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual([
        mockPlaylistDetail.streams[0],
        mockPlaylistDetail.streams[1],
      ]);
    });
  });

  it('should sort streams by oldest', async () => {
    const playlistId = '1';
    localStorage.setItem('token', 'mocked_token');
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlaylistDetail,
    });

    // usePlaylistDetail フックをレンダリング
    const { result } = renderHook(() => usePlaylistDetail(playlistId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual(mockPlaylistDetail.streams);
    });

    // ストリームを古い順に並べ替える
    act(() => {
      result.current.sortStreams('oldest');
    });

    // 並べ替えの完了を待つ
    await waitFor(() => {
      expect(result.current.streams).toEqual([
        mockPlaylistDetail.streams[1],
        mockPlaylistDetail.streams[0],
      ]);
    });
  });
});