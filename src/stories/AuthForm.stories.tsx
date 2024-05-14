import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import AuthForm from '../components/auth/AuthForm';
import { AuthProvider } from '../contexts/AuthContext';

const meta: Meta<typeof AuthForm> = {
    title: 'Auth/AuthForm',
    component: AuthForm,
    tags: ['autodocs'],
    argTypes: {
        onClose: { action: 'closed' },
    },
    decorators: [
      (Story) => (
        <AuthProvider>
          <Story />
        </AuthProvider>
      ),
    ],
};
export default meta;

type Story = StoryObj<typeof AuthForm>;

const Template: Story = {
    render: (args) => <AuthForm {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};


export const GuestLoginSuccess: Story = {
    ...Template,
    parameters: {
        msw: {
          handlers: [
            http.post(`${process.env.VITE_LOCAL_API_URL}/api/guest-login`, () => {
              return HttpResponse.json({
                token: 'mocked_token'
              })
            }),
          ],
        }
    },
    play: async ({canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Submit form', async () => {
            await userEvent.click(canvas.getByRole('button', { name: 'Guest Login' }));
        });

        await waitFor(() => expect( canvas.getByText('Login successful')).toBeInTheDocument());
    },
}