import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import PlaylistContainer from '../components/playlist/PlaylistContainer';
import { MemoryRouter } from 'react-router-dom';

interface Playlist {
  playlist_id: number;
  playlist_title: string;
  shared: boolean;
  user_id: string;
  thumbnail: string;
}

interface PlaylistsResponse {
  playlists: Playlist[];
}

const playlists: PlaylistsResponse = {
  "playlists": [
    {
      "playlist_id": 1,
      "playlist_title": "My Playlist",
      "shared": false,
      "user_id": "a5948156-4118-4af6-95cb-fb6c2a45c556",
      "thumbnail": "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
    },
    {
      "playlist_id": 2,
      "playlist_title": "My Playlist2",
      "shared": true,
      "user_id": "a5948156-4118-4af6-95cb-fb6c2a45c556",
      "thumbnail": "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
    },
    {
      "playlist_id": 3,
      "playlist_title": "My Playlist3",
      "shared": false,
      "user_id": "a5948156-4118-4af6-95cb-fb6c2a45c556",
      "thumbnail": "https://i.ytimg.com/vi/NpEaa2P7qZI/hqdefault.jpg"
    }
  ]
};

const meta: Meta<typeof PlaylistContainer> = {
  title: 'Playlist/PlaylistContainer',
  component: PlaylistContainer,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, () => {
          return HttpResponse.json(playlists);
        }),

        http.delete(`${process.env.VITE_LOCAL_API_URL}/api/playlists/:playlistId`, ({ params }) => {
          const { playlistId } = params;
          playlists.playlists = playlists.playlists.filter(p => p.playlist_id !== Number(playlistId));
          return new HttpResponse(null, {
            status: 204,
            statusText: 'No Content',
          });
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
type Story = StoryObj<typeof PlaylistContainer>;

export const Default: Story = {};

export const EmptyList: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, () => {
          return HttpResponse.json({ playlists: [] });
        }),
      ],
    },
  },
};