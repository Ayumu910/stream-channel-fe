import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StreamList from '../src/components/stream/StreamList';
import useStreamList, { Stream } from '../src/hooks/useStreamList';

jest.mock('../src/hooks/useStreamList');

const mockStreams: Stream[] = [
    { id: '1', thumbnail_image: 'thumbnail1.jpg', title: 'Stream 1', views: '100', platform: 'youtube' },
    { id: '2', thumbnail_image: 'thumbnail2.jpg', title: 'Stream 2', views: '200', platform: 'twitch' },
    { id: '3', thumbnail_image: 'thumbnail3.jpg', title: 'Stream 3', views: '300', platform: 'youtube' },
];

const useStreamListMock = useStreamList as jest.MockedFunction<typeof useStreamList>;

describe('StreamList', () => {
  beforeEach(() => {
    useStreamListMock.mockReturnValue({
      streams: mockStreams,
      displayCount: 2,
      handleShowMore: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the stream list correctly', () => {
    render(
      <MemoryRouter>
        <StreamList />
      </MemoryRouter>
    );

    expect(screen.getByText('お気に入りの配信者')).toBeInTheDocument();
    expect(screen.getByText('Stream 1')).toBeInTheDocument();
    expect(screen.getByText('Stream 2')).toBeInTheDocument();
    expect(screen.queryByText('Stream 3')).not.toBeInTheDocument();
    expect(screen.getByText('もっと見る')).toBeInTheDocument();
  });


  it('displays more streams when "もっと見る" button is clicked', () => {
    const mockHandleShowMore = jest.fn();

    useStreamListMock.mockReturnValue({
      streams: mockStreams,
      displayCount: 2,
      handleShowMore: mockHandleShowMore,
    });

    const { unmount } = render(
      <MemoryRouter>
        <StreamList />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('もっと見る'));

    expect(mockHandleShowMore).toHaveBeenCalledTimes(1);

    unmount();

    useStreamListMock.mockReturnValue({
      streams: mockStreams,
      displayCount: 3,
      handleShowMore: jest.fn(),
    });

    render(
      <MemoryRouter>
        <StreamList />
      </MemoryRouter>
    );

    expect(screen.getByText('Stream 1')).toBeInTheDocument();
    expect(screen.getByText('Stream 2')).toBeInTheDocument();
    expect(screen.getByText('Stream 3')).toBeInTheDocument();
    expect(screen.queryByText('もっと見る')).not.toBeInTheDocument();
  });

  it('does not display "もっと見る" button when all streams are shown', () => {
    useStreamListMock.mockReturnValue({
      streams: mockStreams,
      displayCount: 3,
      handleShowMore: jest.fn(),
    });

    render(
      <MemoryRouter>
        <StreamList />
      </MemoryRouter>
    );

    expect(screen.queryByText('もっと見る')).not.toBeInTheDocument();
  });

  it('calls handleShowMore when "もっと見る" button is clicked', () => {
    render(
      <MemoryRouter>
        <StreamList />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('もっと見る'));

    expect(useStreamListMock().handleShowMore).toHaveBeenCalledTimes(1);
  });

  it('does not display "もっと見る" button when all streams are shown', () => {
    useStreamListMock.mockReturnValue({
      streams: mockStreams,
      displayCount: 3,
      handleShowMore: jest.fn(),
    });

    render(
      <MemoryRouter>
        <StreamList />
      </MemoryRouter>
    );

    expect(screen.queryByText('もっと見る')).not.toBeInTheDocument();
  });
});