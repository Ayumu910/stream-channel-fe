import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Stream from '../components/stream/Stream';

const meta: Meta<typeof Stream> = {
  title: 'Stream/Stream',
  component: Stream,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Stream>;

export const YouTube: Story = {
  args: {
    thumbnail: 'https://i.ytimg.com/vi/gECO_vK0ztM/mqdefault.jpg',
    title: '相席しょこ堂',
    streamId: 'gECO_vK0ztM',
  },
};

export const Twitch: Story = {
  args: {
    thumbnail: 'https://static-cdn.jtvnw.net/cf_vods/d3vd9lfkzbru3h/2d609eb36383fa0181fc_stylishnoob4_23282924413_6827773038//thumb/thumb2162551145-640x480.jpg',
    title: '6/3　すと',
    streamId: '50988750',
  },
};

