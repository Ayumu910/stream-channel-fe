import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import StreamerAnalysisContainer from '../components/streamer/StreamerAnalysisContainer';
import { StreamerContext } from '../contexts/StreamerContext';

const mockStreamer = {
  id: "UCvTZYxbx7LicJnvXTgvK8nw",
  name: "山口一郎の山口パンチ公式",
  url: "https://www.youtube.com/channel/UCvTZYxbx7LicJnvXTgvK8nw",
  platform: "youtube",
  streams: [
    {
      id: "nTONfJSZmKA",
      title: "洗濯乾燥が終わるまで。その8。",
      views: "21749",
      platform: "youtube",
      thumbnail_image: "https://i.ytimg.com/vi/nTONfJSZmKA/mqdefault.jpg"
    },
    {
      id: "RWyJp2gHfAA",
      title: "洗濯乾燥が終わるまで。その7。",
      views: "25009",
      platform: "youtube",
      thumbnail_image: "https://i.ytimg.com/vi/RWyJp2gHfAA/mqdefault.jpg"
    },
    {
      id: "0YoYSqz9xew",
      title: "洗濯乾燥が終わるまで。",
      views: "50053",
      platform: "youtube",
      thumbnail_image: "https://i.ytimg.com/vi/0YoYSqz9xew/mqdefault.jpg"
    }
  ],
  streamer_icon: "https://yt3.ggpht.com/X0tHklAINUsf59rJltK2Fh0vZOKygEt_PxpiqYn7LKhHgUKw7401fvpmK6lmrvdmsfOuniJN=s88-c-k-c0x00ffffff-no-rj"
};

const mockAnalyticsData = {
  basic_info: {
    total_views: '17999083',
    subscribers: '111000'
  },
  ratings: {
    humor: 4.5,
    gaming_skill: 4.0,
    appearance: 3.5,
    uniqueness: 4.2,
    collaboration_frequency: 3.8,
    streaming_frequency: 4.7,
    game_or_chat: 3.9,
    wholesomeness: 4.3
  },
  audience_demographics: {
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
  }
};

const meta: Meta<typeof StreamerAnalysisContainer> = {
  title: 'Streamer/StreamerAnalysisContainer',
  component: StreamerAnalysisContainer,
  decorators: [
    (Story) => (
      <StreamerContext.Provider value={{ streamer: mockStreamer, isLoading: false, error: null }}>
        <Story />
      </StreamerContext.Provider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${process.env.VITE_LOCAL_API_URL}/api/streamer/${mockStreamer.id}/analytics?platform=${mockStreamer.platform}`, () => {
          action('GET /api/streamer/analytics called')();
          return HttpResponse.json(mockAnalyticsData);
        }),
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/streamer/${mockStreamer.id}/analytics`, async ({ request }) => {
          const body = await request.json();
          action('POST /api/streamer/analytics called')(body);
          return HttpResponse.json({ message: 'Analytics submitted successfully' });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StreamerAnalysisContainer>;

export const Default: Story = {};

export const SubmittingAnalysis: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the analysis form
    const analyzeButton = await canvas.findByText('配信者を評価する');
    await userEvent.click(analyzeButton);

    // Fill out the form
    const genderSelect = await canvas.findByLabelText('性別:');
    const ageInput = await canvas.findByLabelText('年齢:');
    const submitButton = await canvas.findByText('評価');

    await userEvent.selectOptions(genderSelect, 'male');
    await userEvent.type(ageInput, '25');

    // Submit the form
    await userEvent.click(submitButton);

    // Wait for the success message
    await waitFor(async () => {
      const successMessage = await canvas.findByText('評価が送信されました');
      expect(successMessage).toBeInTheDocument();
    });
  },
};