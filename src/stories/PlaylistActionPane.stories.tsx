import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/test';
import PlaylistActionPane from '../components/playlist/PlaylistActionPane';

const meta: Meta<typeof PlaylistActionPane> = {
  title: 'Playlist/PlaylistActionPane',
  component: PlaylistActionPane,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PlaylistActionPane>;

export const Default: Story = {};

export const ClickAddPlaylist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('Add Playlist');
    await userEvent.click(addButton);
    action('Add Playlist button clicked')();
  },
};

export const ClickSharePlaylist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shareButton = canvas.getByText('Share Playlist');
    await userEvent.click(shareButton);
    action('Share Playlist button clicked')();
  },
};