import type { Meta, StoryObj } from '@storybook/react';
import StreamerBasicInfo from '../components/streamer/StreamerBasicInfo';

const meta: Meta<typeof StreamerBasicInfo> = {
  title: 'Streamer/StreamerBasicInfo',
  component: StreamerBasicInfo,
};

export default meta;
type Story = StoryObj<typeof StreamerBasicInfo>;

export const Default: Story = {
  args: {
    basicInfo: {
      total_views: '1000000',
      subscribers: '100000'
    },
  },
};

export const TwitchUnavailableViews: Story = {
  args: {
    basicInfo: {
      total_views: '取得できません',
      subscribers: '50000'
    },
  },
};