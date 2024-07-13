import { renderHook, waitFor } from '@testing-library/react';
import useStreamerDetail from '../src/hooks/useStreamerDetail';

const mockStreamerDetail = {
  id: "UCvTZYxbx7LicJnvXTgvK8nw",
  name: "Example Streamer",
  url: "https://www.youtube.com/channel/UCvTZYxbx7LicJnvXTgvK8nw",
  platform: "youtube",
  streams: [
    {
      id: "stream1",
      title: "Example Stream 1",
      views: "1000",
      platform: "youtube",
      thumbnail_image: "https://example.com/thumbnail1.jpg"
    },
    {
      id: "stream2",
      title: "Example Stream 2",
      views: "2000",
      platform: "youtube",
      thumbnail_image: "https://example.com/thumbnail2.jpg"
    }
  ],
  streamer_icon: "https://example.com/streamer_icon.jpg"
};

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useStreamerDetail', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should fetch and return streamer detail', async () => {
    const streamerId = 'UCvTZYxbx7LicJnvXTgvK8nw'; //youtube の配信者ID

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStreamerDetail,
    });

    // useStreamerDetail フックをレンダリング
    const { result } = renderHook(() => useStreamerDetail(streamerId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.streamer).toEqual(mockStreamerDetail);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/streamer/${streamerId}?platform=youtube`
    );
  });

  it('should handle fetch error', async () => {
    const streamerId = 'UCvTZYxbx7LicJnvXTgvK8nw';
    const errorMessage = 'Failed to fetch streamer detail';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    // useStreamerDetail フックをレンダリング
    const { result } = renderHook(() => useStreamerDetail(streamerId));

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error(errorMessage));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/streamer/${streamerId}?platform=youtube`
    );
  });

  it('should handle undefined streamerId', async () => {
    // useStreamerDetail フックをレンダリング（streamerId を undefined で呼び出す）
    const { result } = renderHook(() => useStreamerDetail(undefined));

    // streamerId が undefined の場合、fetch は呼ばれない
    expect(fetchMock).not.toHaveBeenCalled();

    // streamer は null のままで、エラーも発生しない
    expect(result.current.streamer).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle non-OK response', async () => {
    const streamerId = 'UCvTZYxbx7LicJnvXTgvK8nw';

    // fetch のモックを設定（非 OK レスポンス）
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    // useStreamerDetail フックをレンダリング
    const { result } = renderHook(() => useStreamerDetail(streamerId));

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('Failed to fetch streamer details'));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should handle Twitch streamer ID', async () => {
    const streamerId = '12345'; // Twitch の配信者ID

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockStreamerDetail, platform: 'twitch' }),
    });

    const { result } = renderHook(() => useStreamerDetail(streamerId));

    await waitFor(() => {
      expect(result.current.streamer).toEqual({ ...mockStreamerDetail, platform: 'twitch' });
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/streamer/${streamerId}?platform=twitch`
    );
  });
});