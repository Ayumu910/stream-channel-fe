import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import AddPlaylistForm from '../components/playlist/AddPlaylistForm';

// 動的なデータストア
const playlists = [
  { playlist_id: 1, playlist_title: "My Playlist", shared: false, user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556", thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg" },
  { playlist_id: 2, playlist_title: "My Playlist2", shared: true, user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556", thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg" },
  { playlist_id: 3, playlist_title: "My Playlist3", shared: false, user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556", thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg" }
];

const meta: Meta<typeof AddPlaylistForm> = {
  title: 'Playlist/AddPlaylistForm',
  component: AddPlaylistForm,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, () => {
          action('GET /api/playlists called')();
          return HttpResponse.json({ playlists });
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, async ({ request }) => {
          const body = await request.json() as { playlist_title: string };
          action('POST /api/playlists called')(body);
          const newPlaylist = {
            playlist_id: playlists.length + 1,
            playlist_title: body.playlist_title,
            shared: false,
            user_id: 'a5948156-4118-4af6-95cb-fb6c2a45c556',
            thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
          };
          playlists.push(newPlaylist);
          return HttpResponse.json(newPlaylist);
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/playlists/:playlistId`, async ({ params, request }) => {
          const { playlistId } = params;
          const body = await request.json() as { stream_url: string };
          action(`POST /api/playlists/${playlistId} called`)(body);
          return HttpResponse.json({ id: playlists.length + 1, playlist_id: Number(playlistId), stream_id: 'Ucvf5_z7ahf' });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddPlaylistForm>;

export const Default: Story = {
  args: {
    onClose: action('onClose called'),
  },
};

export const EmptyPlaylists: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, () => {
          action('GET /api/playlists called (Empty)')();
          return HttpResponse.json({ playlists: [] });
        }),
      ],
    },
  },
};

export const AddingNewPlaylist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newPlaylistInput = canvas.getByPlaceholderText('Enter new playlist name');
    const addPlaylistButton = canvas.getByText('Add Playlist');

    await userEvent.type(newPlaylistInput, 'New Test Playlist');
    await userEvent.click(addPlaylistButton);

    await waitFor(async () => {
      const newPlaylist = await canvas.findByText('New Test Playlist');
      expect(newPlaylist).toBeInTheDocument();
    });
  },
};

export const AddingStreamToPlaylist: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 最初のプレイリストの展開ボタンを探す
    const expandButtons = await canvas.findAllByText('+');
    await userEvent.click(expandButtons[0]);

    const streamUrlInput = await canvas.findByPlaceholderText('Enter stream URL');
    const addButton = await canvas.findByText('Add');

    await userEvent.type(streamUrlInput, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    await userEvent.click(addButton);
  },
};