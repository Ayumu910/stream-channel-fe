import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Streamer from '../components/streamer/Streamer';

const meta: Meta<typeof Streamer> = {
  title: 'Streamer/Streamer',
  component: Streamer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Streamer>;

export const Default: Story = {
  args: {
    streamer: {
        "id": "UCcGSTI830YkwaocFV31Q7MA",
        "name": "スタンミ",
        "platform": "youtube",
        "streamer_icon": "https://yt3.ggpht.com/ytc/AIdro_kFidnsDf0Cykf4XfN68vBVO7igoqN9F-1HhnNQpkH_wg=s88-c-k-c0x00ffffff-no-rj",
        "most_recent_stream_thumbnail": "https://i.ytimg.com/vi/nLy_d7yaXk4/hqdefault.jpg"
    },
  },
};