import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import ShareCategoryForm from '../components/category/ShareCategoryForm';

// 動的なカテゴリーデータ
let categories = [
  { category_id: '1', category_title: "Category 1", shared: false },
  { category_id: '2', category_title: "Category 2", shared: true },
  { category_id: '3', category_title: "Category 3", shared: false },
];

const meta: Meta<typeof ShareCategoryForm> = {
  title: 'Category/ShareCategoryForm',
  component: ShareCategoryForm,
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/categories`, () => {
          action('GET /api/categories called')();
          return HttpResponse.json({ categories });
        }),
        http.put(`${process.env.VITE_LOCAL_API_URL}/api/categories/:categoryId/share`, async ({ params, request }) => {
          const { categoryId } = params;
          const body = await request.json() as { share: boolean };
          action(`PUT /api/categories/${categoryId}/share called`)(body);

          // カテゴリーの共有状態を更新
          categories = categories.map(cat =>
            cat.category_id === categoryId ? { ...cat, shared: body.share } : cat
          );

          return HttpResponse.json({ success: true });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShareCategoryForm>;

export const Default: Story = {
  args: {
    onClose: action('onClose called'),
  },
};

export const WithConfirmationDialog: Story = {
  args: {
    onClose: action('onClose called'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shareToggleButtons = await canvas.findAllByText(/^(Not Shared|Shared)$/);
    await userEvent.click(shareToggleButtons[0]);

    await waitFor(async () => {
      const confirmationDialog = await canvas.findByText('Are you sure you want to change the share status of this category?');
      expect(confirmationDialog).toBeInTheDocument();
    });
  },
};

export const ChangingShareStatus: Story = {
  args: {
    onClose: action('onClose called'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initialShareToggleButtons = await canvas.findAllByText(/^(Not Shared|Shared)$/);
    const initialStatus = initialShareToggleButtons[0].textContent;
    await userEvent.click(initialShareToggleButtons[0]);

    await waitFor(async () => {
      const confirmButton = await canvas.findByText('OK');
      await userEvent.click(confirmButton);
    });

    await waitFor(async () => {
      const updatedShareToggleButtons = await canvas.findAllByText(/^(Not Shared|Shared)$/);
      const newStatus = updatedShareToggleButtons[0].textContent;
      expect(newStatus).not.toBe(initialStatus);
      expect(newStatus).toBe(initialStatus === 'Not Shared' ? 'Shared' : 'Not Shared');
    });
  },
};

export const CancellingShareStatusChange: Story = {
  args: {
    onClose: action('onClose called'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shareToggleButtons = await canvas.findAllByText(/^(Not Shared|Shared)$/);
    const initialStatus = shareToggleButtons[0].textContent;
    await userEvent.click(shareToggleButtons[0]);

    await waitFor(async () => {
      const cancelButton = await canvas.findByText('Cancel');
      await userEvent.click(cancelButton);
    });

    await waitFor(async () => {
      const confirmationDialog = canvas.queryByText('Are you sure you want to change the share status of this category?');
      expect(confirmationDialog).not.toBeInTheDocument();

      const updatedShareToggleButtons = await canvas.findAllByText(/^(Not Shared|Shared)$/);
      expect(updatedShareToggleButtons[0].textContent).toBe(initialStatus);
    });
  },
};