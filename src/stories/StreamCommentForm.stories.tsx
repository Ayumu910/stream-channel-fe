import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import StreamCommentForm from '../components/stream/StreamCommentForm';

interface CommentRequestBody {
  comment_text: string;
  platforms: string;
}

interface PathParams {
  streamId: string;
}

const meta: Meta<typeof StreamCommentForm> = {
  title: 'Stream/StreamCommentForm',
  component: StreamCommentForm,
  parameters: {
    msw: {
      handlers: [
        http.post<PathParams, CommentRequestBody>(`${process.env.VITE_LOCAL_API_URL}/api/streams/:streamId/comments`, async ({ request, params }) => {
          const body = await request.json() as CommentRequestBody;

          action(`POST /api/streams/${params.streamId}/comments called`)({
            url: request.url,
            method: request.method,
            body: body,
            streamId: params.streamId
          });

          return HttpResponse.json({
            message: "Comment added successfully",
            comment: {
              comment_id: 2,
              comment_text: body.comment_text,
              stream_id: params.streamId
            }
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StreamCommentForm>;

export const Default: Story = {
  args: {
    streamId: "3HXfmqAHnxE",
  },
};

export const SubmitComment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const commentInput = canvas.getByPlaceholderText('コメントを入力してください');
    const submitButton = canvas.getByText('送信');

    await userEvent.type(commentInput, 'This is a test comment');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(canvas.getByText('Comment added successfully!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(commentInput).toHaveValue('');
    });
  },
};

export const SubmitEmptyComment: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByText('送信');

    await userEvent.click(submitButton);

    // The form should prevent submission of empty comments
    await waitFor(() => {
      expect(canvas.queryByText('Comment added successfully!')).not.toBeInTheDocument();
    });
  },
};