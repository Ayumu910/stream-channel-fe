import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { StreamerContext } from '../contexts/StreamerContext';
import StreamerDetailContainer from '../components/streamer/StreamerDetailContainer';

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

const meta: Meta<typeof StreamerDetailContainer> = {
  title: 'Streamer/StreamerDetailContainer',
  component: StreamerDetailContainer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <StreamerContext.Provider value={{ streamer: mockStreamer, isLoading: false, error: null }}>
          <Story />
        </StreamerContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StreamerDetailContainer>;

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

export const NoStreams: Story = {
  decorators: [
    (Story) => (
      <StreamerContext.Provider value={{ streamer: { ...mockStreamer, streams: [] }, isLoading: false, error: null }}>
        <Story />
      </StreamerContext.Provider>
    ),
  ],
};