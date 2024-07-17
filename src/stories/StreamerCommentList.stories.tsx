import type { Meta, StoryObj } from '@storybook/react';
import StreamerCommentList from '../components/streamer/StreamerCommentList';

const meta: Meta<typeof StreamerCommentList> = {
  title: 'Streamer/StreamerCommentList',
  component: StreamerCommentList,
};

export default meta;
type Story = StoryObj<typeof StreamerCommentList>;

export const EmptyList: Story = {
  args: {
    comments: [],
  },
};

export const SingleComment: Story = {
  args: {
    comments: [
      { comment_id: 1, comment_text: "This is a single comment", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
    ],
  },
};

export const MultipleComments: Story = {
  args: {
    comments: [
      { comment_id: 1, comment_text: "First comment", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
      { comment_id: 2, comment_text: "Second comment", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
      { comment_id: 3, comment_text: "Third comment", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
    ],
  },
};

export const LongComment: Story = {
  args: {
    comments: [
      { comment_id: 1, comment_text: "This is a very long comment that should wrap to multiple lines. It's important to test how the component handles long text to ensure proper formatting and readability.", streamer_id: "UCvTZYxbx7LicJnvXTgvK8nw" },
    ],
  },
};