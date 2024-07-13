import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import AddToCategoryButton from '../components/streamer/AddToCategoryButton';

const mockCategories = [
  { category_id: 1, category_title: "My Category 1", shared: false, user_id: "user1" },
  { category_id: 2, category_title: "My Category 2", shared: false, user_id: "user1" },
];

const meta: Meta<typeof AddToCategoryButton> = {
  title: 'Streamer/AddToCategoryButton',
  component: AddToCategoryButton,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          action('GET /api/categories called')();
          return HttpResponse.json({ categories: mockCategories });
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/categories/:categoryId`, async ({ params }) => {
          action(`POST /api/categories/${params.categoryId} called`)();
          return HttpResponse.json({ message: "Streamer added to category successfully" });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddToCategoryButton>;

export const Default: Story = {
  args: {
    streamerId: "UCvTZYxbx7LicJnvXTgvK8nw",
  },
};

export const OpenAddToCategoryForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('お気に入り');
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(canvas.getByText('Add to Category')).toBeInTheDocument();
      expect(canvas.getByText('My Category 1')).toBeInTheDocument();
      expect(canvas.getByText('My Category 2')).toBeInTheDocument();
    });
  },
};

export const AddStreamerToCategory: Story = {
  args: {
    streamerId: "UCvTZYxbx7LicJnvXTgvK8nw",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('お気に入り');
    await userEvent.click(addButton);

    await waitFor(() => {
      const categoryRadio = canvas.getByLabelText('My Category 1');
      userEvent.click(categoryRadio);
    });

    await waitFor(() => {
      const okButton = canvas.getByText('OK');
      userEvent.click(okButton);
    });

    await waitFor(() => {
      expect(canvas.getByText('Streamer added to category successfully!')).toBeInTheDocument();
    });
  },
};

export const CancelAddingToCategory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText('お気に入り');
    await userEvent.click(addButton);

    await waitFor(() => {
      const cancelButton = canvas.getByText('Cancel');
      userEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(canvas.queryByText('Add to Category')).not.toBeInTheDocument();
    });
  },
};