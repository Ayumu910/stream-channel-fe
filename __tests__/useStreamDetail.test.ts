import { renderHook, waitFor } from '@testing-library/react';
import useStreamDetail from '../src/hooks/useStreamDetail';

const mockStreamDetail = {
  id: "aaaaaaaaa",
  url: "https://www.youtube.com/watch?v=aaaaaaaaa",
  title: "配信をします",
  views: "33252",
  streamer: {
    id: "UCv6sahYakdujnw",
    name: "配信者です",
    platform: "youtube",
    streamer_icon: "https://example.com/streamer_icon.jpg"
  },
  rating: {
    good: 2,
    bad: 0
  },
  tags: ["ゲーム実況", "Switch"],
  platform: "youtube",
  comments: [
    { id: "1", comment_text: "This is a test comment" }
  ],
  thumbnail_image: "https://example.com/thumbnail.jpg"
};

// fetch のモックを作成
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('useStreamDetail', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it('should fetch and return stream detail', async () => {
    const streamId = 'aaaaaaaaa';

    // fetch のモックを設定
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStreamDetail,
    });

    // useStreamDetail フックをレンダリング
    const { result } = renderHook(() => useStreamDetail(streamId));

    // データ取得の完了を待つ
    await waitFor(() => {
      expect(result.current.stream).toEqual(mockStreamDetail);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/streams/${streamId}?platforms=youtube`
    );
  });

  it('should handle fetch error', async () => {
    const streamId = 'aaaaaaaaa';
    const errorMessage = 'Failed to fetch stream detail';
    fetchMock.mockRejectedValueOnce(new Error(errorMessage));

    // useStreamDetail フックをレンダリング
    const { result } = renderHook(() => useStreamDetail(streamId));

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error(errorMessage));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.VITE_LOCAL_API_URL}/api/streams/${streamId}?platforms=youtube`
    );
  });

  it('should handle undefined streamId', async () => {
    // useStreamDetail フックをレンダリング（streamId を undefined で呼び出す）
    const { result } = renderHook(() => useStreamDetail(undefined));

    // streamId が undefined の場合、fetch は呼ばれない
    expect(fetchMock).not.toHaveBeenCalled();

    // stream は null のままで、エラーも発生しない
    expect(result.current.stream).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle non-OK response', async () => {
    const streamId = 'aaaaaaaaa';

    // fetch のモックを設定（非 OK レスポンス）
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    // useStreamDetail フックをレンダリング
    const { result } = renderHook(() => useStreamDetail(streamId));

    // エラー処理の完了を待つ
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('Failed to fetch stream detail'));
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});