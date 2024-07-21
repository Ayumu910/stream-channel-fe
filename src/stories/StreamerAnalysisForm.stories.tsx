import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import StreamerAnalysisForm from '../components/streamer/StreamerAnalysisForm';
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

const meta: Meta<typeof StreamerAnalysisForm> = {
  title: 'Streamer/StreamerAnalysisForm',
  component: StreamerAnalysisForm,
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
type Story = StoryObj<typeof StreamerAnalysisForm>;

export const Default: Story = {
  args: {
    onClose: action('Form closed'),
    onSubmit: action('Form submitted'),
  },
};

export const SubmittingForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const genderSelect = canvas.getByLabelText('性別:');
    const ageInput = canvas.getByLabelText('年齢:');
    const humorSlider = canvas.getByLabelText('humor:');
    const submitButton = canvas.getByText('評価');

    await userEvent.selectOptions(genderSelect, 'male');
    await userEvent.type(ageInput, '25');
    await userEvent.click(humorSlider);
    await userEvent.type(humorSlider, '4');

    await userEvent.click(submitButton);

    await waitFor(async () => {
      const successMessage = await canvas.findByText('評価が送信されました');
      expect(successMessage).toBeInTheDocument();
    });
  },
};