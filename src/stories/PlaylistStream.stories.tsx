import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import PlaylistStream from '../components/stream/PlaylistStream';

const meta: Meta<typeof PlaylistStream> = {
  title: 'Stream/PlaylistStream',
  component: PlaylistStream,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlaylistStream>;

export const YouTube: Story = {
  args: {
    stream: {
        "stream_id": "CP6As9wXpP8",
        "url": "https://www.youtube.com/watch?v=CP6As9wXpP8",
        "title": "ヒカキンの生配信",
        "views": "1234567",
        "tags": [
          "HIKAKIN",
          "生配信"
        ],
        "platform": "youtube",
        "thumbnail_image": "https://i.ytimg.com/vi/CP6As9wXpP8/sddefault.jpg",
        "addedAt": "2024-06-17T08:20:56.584Z"
      },
  },
};

export const Twitch: Story = {
  args: {
    stream: {
        "stream_id": "2156231850",
        "url": "https://www.twitch.tv/videos/2156231850",
        "title": "朝サバゲー",
        "views": "65619",
        "tags": [],
        "platform": "twitch",
        "thumbnail_image": "https://static-cdn.jtvnw.net/cf_vods/d3vd9lfkzbru3h/54f9dc5c741e07a15d69_stylishnoob4_41326714823_1716768957//thumb/thumb0-640x480.jpg",
        "addedAt": "2024-06-17T08:21:18.695Z"
      }
  },
};