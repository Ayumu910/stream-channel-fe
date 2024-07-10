import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';
import ReviewStreamButton from '../components/stream/ReviewStreamButton';

interface RatingRequestBody {
    rating: {
      good: boolean;
      bad: boolean;
    };
    platforms: string;
}

const meta: Meta<typeof ReviewStreamButton> = {
  title: 'Stream/ReviewStreamButton',
  component: ReviewStreamButton,
  parameters: {
    msw: {
      handlers: [
        http.post(`${process.env.VITE_LOCAL_API_URL}/api/streams/:streamId/ratings`, async ({ request, params }) => {
          const body = await request.json() as RatingRequestBody;
          //リクエストボディで good を渡していれば、good_rate:3 に、そうでなければ bad_rate:2 に
          const isGood = body.rating.good;

          action(`POST /streams/${params.streamId}/ratings called`)({
            body: body,
          });

          return HttpResponse.json({
            stream: {
              good_rate: isGood ? 3 : 2,
              bad_rate: isGood ? 0 : 1,
            }
          });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewStreamButton>;

export const Default: Story = {
  args: {
    streamId: "3HXfmqAHnxE",
    initialGoodCount: 2,
    initialBadCount: 0,
  },
};

export const ClickGoodButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const goodButton = canvas.getByText(/🔥 アタリ枠/);
    await userEvent.click(goodButton);

    await waitFor(() => {
      expect(goodButton).toHaveTextContent('🔥 アタリ枠 3');
    });
  },
};

export const ClickBadButton: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badButton = canvas.getByText(/💧 ハズレ枠/);
    await userEvent.click(badButton);

    await waitFor(() => {
      expect(badButton).toHaveTextContent('💧 ハズレ枠 1');
    });
  },
};