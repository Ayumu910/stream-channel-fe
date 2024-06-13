import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Playlist from '../components/playlist/Playlist';

const meta: Meta<typeof Playlist> = {
  title: 'Playlist/Playlist',
  component: Playlist,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Playlist>;

export const Default: Story = {
  args: {
    playlistId: 1,
    playlistName: "新しいプレイリスト",
    thumbnail: 'https://static-cdn.jtvnw.net/cf_vods/d3vd9lfkzbru3h/2d609eb36383fa0181fc_stylishnoob4_23282924413_6827773038//thumb/thumb2162551145-640x480.jpg',
  },
};
