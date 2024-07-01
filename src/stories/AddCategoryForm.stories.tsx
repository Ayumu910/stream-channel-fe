import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import AddCategoryForm from '../components/category/AddCategoryForm';

// 動的なデータストア
const categories = [
  { category_id: 1, category_title: "New Category", shared: false, user_id: "bfe5e576-54b6-4835-94de-5a78094f2b3f" },
  { category_id: 2, category_title: "New Category2", shared: false, user_id: "bfe5e576-54b6-4835-94de-5a78094f2b3f" },
  { category_id: 3, category_title: "New Category3", shared: false, user_id: "bfe5e576-54b6-4835-94de-5a78094f2b3f" }
];

const meta: Meta<typeof AddCategoryForm> = {
  title: 'Category/AddCategoryForm',
  component: AddCategoryForm,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          action('GET /api/categories called')();
          return HttpResponse.json({ categories });
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/categories`, async ({ request }) => {
          const body = await request.json() as { title: string };
          action('POST /api/categories called')(body);
          const newCategory = {
            category_id: categories.length + 1,
            category_title: body.title,
            shared: false,
            user_id: 'bfe5e576-54b6-4835-94de-5a78094f2b3f'
          };
          categories.push(newCategory);
          return HttpResponse.json(newCategory);
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/categories/:categoryId`, async ({ params, request }) => {
          const { categoryId } = params;
          const body = await request.json() as { streamer_url: string };
          action(`POST /api/categories/${categoryId} called`)(body);
          return HttpResponse.json({ id: categories.length + 1, category_id: Number(categoryId), streamer_id: 'Ucvf5_z7ahf' });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddCategoryForm>;

export const Default: Story = {
  args: {
    onClose: action('onClose called'),
  },
};

export const EmptyCategories: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          action('GET /api/categories called (Empty)')();
          return HttpResponse.json({ categories: [] });
        }),
      ],
    },
  },
};

export const AddingNewCategory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newCategoryInput = canvas.getByPlaceholderText('Enter new category name');
    const addCategoryButton = canvas.getByText('Add Category');

    await userEvent.type(newCategoryInput, 'New Test Category');
    await userEvent.click(addCategoryButton);

    await waitFor(async () => {
      const newCategory = await canvas.findByText('New Test Category');
      expect(newCategory).toBeInTheDocument();
    });
  },
};

export const AddingStreamerToCategory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 最初のカテゴリーの展開ボタンを探す
    const expandButtons = await canvas.findAllByText('+');
    await userEvent.click(expandButtons[0]);

    const streamerUrlInput = await canvas.findByPlaceholderText('Enter streamer URL');
    const addButton = await canvas.findByText('Add');

    await userEvent.type(streamerUrlInput, 'https://twitch.tv/example');
    await userEvent.click(addButton);
  },
};