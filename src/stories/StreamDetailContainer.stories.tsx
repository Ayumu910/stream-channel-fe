import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import StreamDetailContainer from '../components/stream/StreamDetailContainer';

const mockStream = {
  id: "3HXfmqAHnxE",
  url: "https://www.youtube.com/watch?v=3HXfmqAHnxE",
  title: "洗濯乾燥が終わるまで。その4。",
  views: "33252",
  streamer: {
    id: "UCvTZYxbx7LicJnvXTgvK8nw",
    name: "山口一郎の山口パンチ公式",
    platform: "youtube",
    streamer_icon: "https://yt3.ggpht.com/X0tHklAINUsf59rJltK2Fh0vZOKygEt_PxpiqYn7LKhHgUKw7401fvpmK6lmrvdmsfOuniJN=s88-c-k-c0x00ffffff-no-rj"
  },
  rating: {
    good: 2,
    bad: 0
  },
  tags: ["#PS5Live", "PlayStation 5", "Sony Interactive Entertainment", "ヒューマン フォール フラット"],
  platform: "youtube",
  comments: [
    { id: "1", comment_text: "This is a test comment" }
  ],
  thumbnail_image: "https://i.ytimg.com/vi/3HXfmqAHnxE/sddefault.jpg"
};

const meta: Meta<typeof StreamDetailContainer> = {
  title: 'Stream/StreamDetailContainer',
  component: StreamDetailContainer,
  args: {
    streamId: "3HXfmqAHnxE",
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/streams/:streamId`, () => {
          action('GET /api/streams/:streamId called')();
          return HttpResponse.json(mockStream);
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StreamDetailContainer>;

export const Default: Story = {};

export const LoadingState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/streams/:streamId`, async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          action('GET /api/streams/:streamId called (delayed)')();
          return HttpResponse.json(mockStream);
        }),
      ],
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/streams/:streamId`, () => {
          action('GET /api/streams/:streamId called (error)')();
          return HttpResponse.error();
        }),
      ],
    },
  },
};