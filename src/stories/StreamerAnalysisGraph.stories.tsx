import type { Meta, StoryObj } from '@storybook/react';
import StreamerAnalysisGraph from '../components/streamer/StreamerAnalysisGraph';

const meta: Meta<typeof StreamerAnalysisGraph> = {
  title: 'Streamer/StreamerAnalysisGraph',
  component: StreamerAnalysisGraph,
};

export default meta;
type Story = StoryObj<typeof StreamerAnalysisGraph>;

export const Default: Story = {
  args: {
    ratings: {
      humor: 4.5,
      gaming_skill: 4.0,
      appearance: 3.5,
      uniqueness: 4.2,
      collaboration_frequency: 1.1,
      streaming_frequency: 4.7,
      game_or_chat: 1.1,
      wholesomeness: 4.3
    },
  },
};

export const LowRatings: Story = {
  args: {
    ratings: {
      humor: 1.5,
      gaming_skill: 2.0,
      appearance: 1.0,
      uniqueness: 1.2,
      collaboration_frequency: 1.8,
      streaming_frequency: 2.7,
      game_or_chat: 1.9,
      wholesomeness: 2.3
    },
  },
};

export const HighRatings: Story = {
  args: {
    ratings: {
      humor: 5.0,
      gaming_skill: 4.8,
      appearance: 4.9,
      uniqueness: 5.0,
      collaboration_frequency: 4.7,
      streaming_frequency: 5.0,
      game_or_chat: 4.9,
      wholesomeness: 5.0
    },
  },
};