import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import StreamCommentList from '../components/stream/StreamCommentList';

const meta: Meta<typeof StreamCommentList> = {
  title: 'Stream/StreamCommentList',
  component: StreamCommentList,
};

export default meta;
type Story = StoryObj<typeof StreamCommentList>;

export const WithComments: Story = {
  args: {
    comments: [
      { id: "1", comment_text: "This is the first comment" },
      { id: "2", comment_text: "This is the second comment" },
      { id: "3", comment_text: "This is the third comment" },
    ],
  },
};

export const NoComments: Story = {
  args: {
    comments: [],
  },
};

export const SingleComment: Story = {
  args: {
    comments: [
      { id: "1", comment_text: "This is a single comment" },
    ],
  },
};

export const LongComment: Story = {
  args: {
    comments: [
      { id: "1", comment_text: "This is a very long comment that should wrap to multiple lines. It's important to test how the component handles long text to ensure it doesn't break the layout or become unreadable." },
    ],
  },
};

export const ManyComments: Story = {
  args: {
    comments: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      comment_text: `This is comment number ${i + 1}`,
    })),
  },
};

export const CommentCount: Story = {
  args: {
    comments: [
      { id: "1", comment_text: "First comment" },
      { id: "2", comment_text: "Second comment" },
      { id: "3", comment_text: "Third comment" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const comments = canvas.getAllByRole('listitem');
    expect(comments).toHaveLength(3);
  },
};