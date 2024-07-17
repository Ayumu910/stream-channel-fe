import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StreamerContext } from '../contexts/StreamerContext';
import StreamerForumPage from '../pages/StreamerForumPage';

const mockStreamer = {
  id: "UCvTZYxbx7LicJnvXTgvK8nw",
  name: "山口一郎の山口パンチ公式",
  url: "https://www.youtube.com/channel/UCvTZYxbx7LicJnvXTgvK8nw",
  platform: "youtube",
  streams: [
    {
      "id": "nTONfJSZmKA",
      "title": "洗濯乾燥が終わるまで。その8。",
      "views": "21749",
      "platform": "youtube",
      "thumbnail_image": "https://i.ytimg.com/vi/nTONfJSZmKA/mqdefault.jpg"
    },
    {
      "id": "RWyJp2gHfAA",
      "title": "洗濯乾燥が終わるまで。その7。",
      "views": "25009",
      "platform": "youtube",
      "thumbnail_image": "https://i.ytimg.com/vi/RWyJp2gHfAA/mqdefault.jpg"
    },
    //途中は省略・・・
    {
      "id": "0YoYSqz9xew",
      "title": "洗濯乾燥が終わるまで。",
      "views": "50053",
      "platform": "youtube",
      "thumbnail_image": "https://i.ytimg.com/vi/0YoYSqz9xew/mqdefault.jpg"
    }
  ],
  streamer_icon: "https://yt3.ggpht.com/X0tHklAINUsf59rJltK2Fh0vZOKygEt_PxpiqYn7LKhHgUKw7401fvpmK6lmrvdmsfOuniJN=s88-c-k-c0x00ffffff-no-rj"
};

// 動的なデータストア
const comments = [
  { comment_id: 1, comment_text: "Great stream!", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
  { comment_id: 2, comment_text: "Keep up the good work!", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
];

const meta: Meta<typeof StreamerForumPage> = {
  title: 'Page/StreamerForumPage',
  component: StreamerForumPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/streamer/UCvTZYxbx7LicJnvXTgvK8nw/forum']}>
        <Routes>
          <Route path="/streamer/:streamerId/forum" element={
            <StreamerContext.Provider value={{ streamer: mockStreamer, isLoading: false, error: null }}>
              <Story />
            </StreamerContext.Provider>
          } />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/streamer/:streamerId/comments`, () => {
          action('GET /api/streamer/:streamerId/comments called')();
          return HttpResponse.json(comments);
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/streamer/:streamerId/comments`, async ({ request }) => {
          const body = await request.json() as { comment_text: string, platform: string };
          action('POST /api/streamer/:streamerId/comments called')(body);
          const newComment = {
            comment_id: comments.length + 1,
            comment_text: body.comment_text,
            streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw"
          };
          comments.push(newComment);
          return HttpResponse.json({ message: "Comment added successfully", comment: newComment });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StreamerForumPage>;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <StreamerContext.Provider value={{ streamer: null, isLoading: true, error: null }}>
        <Story />
      </StreamerContext.Provider>
    ),
  ],
};

export const AddComment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText('Example Streamer')).toBeInTheDocument();
    });

    const commentInput = canvas.getByPlaceholderText('コメントを入力してください');
    await userEvent.type(commentInput, 'New test comment');

    const submitButton = canvas.getByText('送信');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(canvas.getByText('New test comment')).toBeInTheDocument();
    });
  },
};

export const EmptyComments: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/streamer/:streamerId/comments`, () => {
          action('GET /api/streamer/:streamerId/comments called (Empty)')();
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};