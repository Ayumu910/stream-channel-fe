import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StreamerAnalysisButton from '../components/streamer/StreamerAnalysisButton';

const meta: Meta<typeof StreamerAnalysisButton> = {
  title: 'Streamer/StreamerAnalysisButton',
  component: StreamerAnalysisButton,
};

export default meta;
type Story = StoryObj<typeof StreamerAnalysisButton>;

export const Default: Story = {
  args: {
    onClick: action('Button clicked'),
  },
};