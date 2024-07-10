import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import AddToPlaylistButton from '../components/stream/AddToPlaylistButton';

const mockPlaylists = [
  { playlist_id: 1, playlist_title: "My Playlist 1", shared: false, user_id: "user1", thumbnail: "https://example.com/thumbnail1.jpg" },
  { playlist_id: 2, playlist_title: "My Playlist 2", shared: false, user_id: "user1", thumbnail: "https://example.com/thumbnail2.jpg" },
];

//AddToPlaylistForm もこの Storybook でテスト
const meta: Meta<typeof AddToPlaylistButton> = {
  title: 'Stream/AddToPlaylistButton',
  component: AddToPlaylistButton,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, () => {
          action('GET /api/playlists called')();
          return HttpResponse.json({ playlists: mockPlaylists });
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/playlists/:playlistId`, async ({ params }) => {
          action(`GET /api/playlists:/${params.playlistId} called`)();
          return HttpResponse.json({ message: "Stream added to playlist successfully" });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddToPlaylistButton>;

export const Default: Story = {
  args: {
    url: "https://www.youtube.com/watch?v=3HXfmqAHnxE",
  },
};

export const OpenAddToPlaylistForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('保存');
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(canvas.getByText('Add to Playlist')).toBeInTheDocument();
      expect(canvas.getByText('My Playlist 1')).toBeInTheDocument();
      expect(canvas.getByText('My Playlist 2')).toBeInTheDocument();
    })
  },
};

export const AddStreamToPlaylist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('保存');
    await userEvent.click(addButton);

    await waitFor(() => {
      const playlistRadio = canvas.getByLabelText('My Playlist 1');
      userEvent.click(playlistRadio);
    })

    await waitFor(() => {
      const okButton = canvas.getByText('OK');
      userEvent.click(okButton);
    })

    await waitFor(() => {
      expect(canvas.getByText('Stream added to playlist successfully!')).toBeInTheDocument();
    })

  },
};

export const CancelAddingToPlaylist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('保存');
    await userEvent.click(addButton);

    await waitFor(() => {
      const cancelButton = canvas.getByText('Cancel');
      userEvent.click(cancelButton);
    })

    await waitFor(() => {
      expect(canvas.queryByText('Add to Playlist')).not.toBeInTheDocument();
    })
  },
};