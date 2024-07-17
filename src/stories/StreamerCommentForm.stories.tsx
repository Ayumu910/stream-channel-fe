import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import StreamerCommentForm from '../components/streamer/StreamerCommentForm';

const mockAddComment = async (commentText: string) => {
  action('onAddComment')(commentText);
  return Promise.resolve();
};

const meta: Meta<typeof StreamerCommentForm> = {
  title: 'Streamer/StreamerCommentForm',
  component: StreamerCommentForm,
  args: {
    streamerId: 'UCvTZYxbx7LicJnvXTgvK8nw',
    onAddComment: mockAddComment
  },
};

export default meta;
type Story = StoryObj<typeof StreamerCommentForm>;

export const Default: Story = {};

export const FillingOutForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const commentInput = canvas.getByPlaceholderText('コメントを入力してください');
    await userEvent.type(commentInput, 'This is a test comment');
    expect(commentInput).toHaveValue('This is a test comment');
  },
};

export const SubmittingComment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const commentInput = canvas.getByPlaceholderText('コメントを入力してください');
    await userEvent.type(commentInput, 'This is a test comment');
    const submitButton = canvas.getByText('送信');
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(commentInput).toHaveValue(''); // フォームがクリアされたことを確認
    });
  },
};