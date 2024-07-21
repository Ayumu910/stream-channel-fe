import type { Meta, StoryObj } from '@storybook/react';
import StreamerDemographics from '../components/streamer/StreamerDemographics';

const meta: Meta<typeof StreamerDemographics> = {
  title: 'Streamer/StreamerDemographics',
  component: StreamerDemographics,
};

export default meta;
type Story = StoryObj<typeof StreamerDemographics>;

export const Default: Story = {
  args: {
    demographics: {
      '10s_male': 10,
      '20s_male': 20,
      '30s_male': 15,
      '40s_male': 5,
      '50s_male': 2,
      '60s_over_male': 1,
      '10s_female': 8,
      '20s_female': 18,
      '30s_female': 12,
      '40s_female': 6,
      '50s_female': 2,
      '60s_over_female': 1
    },
  },
};

export const YoungAudience: Story = {
  args: {
    demographics: {
      '10s_male': 30,
      '20s_male': 25,
      '30s_male': 5,
      '40s_male': 1,
      '50s_male': 0,
      '60s_over_male': 0,
      '10s_female': 25,
      '20s_female': 12,
      '30s_female': 2,
      '40s_female': 0,
      '50s_female': 0,
      '60s_over_female': 0
    },
  },
};

export const OlderAudience: Story = {
  args: {
    demographics: {
      '10s_male': 1,
      '20s_male': 3,
      '30s_male': 10,
      '40s_male': 20,
      '50s_male': 15,
      '60s_over_male': 10,
      '10s_female': 2,
      '20s_female': 4,
      '30s_female': 8,
      '40s_female': 15,
      '50s_female': 10,
      '60s_over_female': 2
    },
  },
};