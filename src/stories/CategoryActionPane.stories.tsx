import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import CategoryActionPane from '../components/category/CategoryActionPane';

const meta: Meta<typeof CategoryActionPane> = {
  title: 'Category/CategoryActionPane',
  component: CategoryActionPane,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          return HttpResponse.json({
            categories: [
              { category_id: '1', category_title: "Category 1", shared: false },
              { category_id: '2', category_title: "Category 2", shared: true },
            ]
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryActionPane>;

export const Default: Story = {};

export const OpenAddCategoryForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('Streamer Category');
    await userEvent.click(addButton);

    await expect(canvas.getByText('Add Streamer to Category')).toBeInTheDocument();
  },
};

export const OpenShareCategoryForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shareButton = canvas.getByText('Share Category');
    await userEvent.click(shareButton);

    await expect(canvas.getByText('Share Categories')).toBeInTheDocument();
  },
};