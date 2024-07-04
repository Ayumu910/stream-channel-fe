import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, expect } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import SharePlaylistForm from '../components/playlist/SharePlaylistForm';

const playlists = [
  { playlist_id: 1, playlist_title: "My Playlist", shared: false, user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556", thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg" },
  { playlist_id: 2, playlist_title: "My Playlist2", shared: true, user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556", thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg" },
  { playlist_id: 3, playlist_title: "My Playlist3", shared: false, user_id: "a5948156-4118-4af6-95cb-fb6c2a45c556", thumbnail: "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg" }
];

const meta: Meta<typeof SharePlaylistForm> = {
  title: 'Playlist/SharePlaylistForm',
  component: SharePlaylistForm,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, () => {
          return HttpResponse.json({ playlists });
        }),
        http.put(`${process.env.VITE_LOCAL_API_URL}/api/playlists/:playlistId/share`, async ({ params, request }) => {
          const { playlistId } = params;
          const body = await request.json() as { share: boolean };
          action(`PUT /api/playlists/${playlistId}/share called`)(body);
          return HttpResponse.json({ success: true });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SharePlaylistForm>;

export const Default: Story = {
  args: {
    onClose: action('onClose called'),
  },
};

export const ToggleSharing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButtons = await canvas.findAllByText(/Not Shared|Shared/);
    await userEvent.click(toggleButtons[0]);

    await waitFor(async () => {
      const confirmationDialog = await canvas.findByText('Are you sure you want to change the share status of this playlist?');
      expect(confirmationDialog).toBeInTheDocument();
    });

    const confirmButton = await canvas.findByText('OK');
    await userEvent.click(confirmButton);
  },
};