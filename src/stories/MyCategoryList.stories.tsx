import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import MyCategoryList from '../components/category/MyCategoryList';
import { MemoryRouter } from 'react-router-dom';

interface Category {
  category_id: number;
  category_title: string;
  shared: boolean;
  user_id: string;
}

interface CategoriesResponse {
  categories: Category[];
}

const categories: CategoriesResponse = {
  "categories": [
    {
      "category_id": 1,
      "category_title": "New Category",
      "shared": false,
      "user_id": "bfe5e576-54b6-4835-94de-5a78094f2b3f"
    },
    {
      "category_id": 2,
      "category_title": "New Category2",
      "shared": false,
      "user_id": "bfe5e576-54b6-4835-94de-5a78094f2b3f"
    },
    {
      "category_id": 3,
      "category_title": "New Category3",
      "shared": false,
      "user_id": "bfe5e576-54b6-4835-94de-5a78094f2b3f"
    }
  ]
};

const categoryDetail = {
  "category_id": "1",
  "category_name": "New Category",
  "streamers": [
    {
      "id": "50988750",
      "name": "stylishnoob4",
      "platform": "twitch",
      "streamer_icon": "https://static-cdn.jtvnw.net/jtv_user_pictures/stylishnoob4-profile_image-08271f11296c16df-300x300.png",
      "most_recent_stream_thumbnail": "https://static-cdn.jtvnw.net/cf_vods/d3vd9lfkzbru3h/fad7f600e37611d6769d_stylishnoob4_89530296752_5499187786//thumb/thumb2176048056-480x360.jpg"
    },
    {
      "id": "UCvTZYxbx7LicJnvXTgvK8nw",
      "name": "山口一郎の山口パンチ公式",
      "platform": "youtube",
      "streamer_icon": "https://yt3.ggpht.com/X0tHklAINUsf59rJltK2Fh0vZOKygEt_PxpiqYn7LKhHgUKw7401fvpmK6lmrvdmsfOuniJN=s88-c-k-c0x00ffffff-no-rj",
      "most_recent_stream_thumbnail": "https://i.ytimg.com/vi/nTONfJSZmKA/hqdefault.jpg"
    }
  ]
};

const meta: Meta<typeof MyCategoryList> = {
  title: 'Category/MyCategoryList',
  component: MyCategoryList,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          return HttpResponse.json(categories);
        }),

        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories/:categoryId`, ({ params }) => {
          const { categoryId } = params;
          categoryDetail.category_id = categoryId as string;
          return HttpResponse.json(categoryDetail);
        }),

        http.delete(`${process.env.VITE_LOCAL_API_URL}/api/categories/:categoryId`, ({ params }) => {
          const { categoryId } = params;
          categories.categories = categories.categories.filter(c => c.category_id !== Number(categoryId));
          return new HttpResponse(null, {
            status: 204,
            statusText: 'No Content',
          });
        }),

        http.delete(`${process.env.VITE_LOCAL_API_URL}/api/categories/:categoryId/streamers/:streamerId`, ({ params }) => {
          const { streamerId } = params;
          categoryDetail.streamers = categoryDetail.streamers.filter(s => s.id !== streamerId);
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
type Story = StoryObj<typeof MyCategoryList>;

export const Default: Story = {};

export const EmptyList: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          return HttpResponse.json({ categories: [] });
        }),
      ],
    },
  },
};