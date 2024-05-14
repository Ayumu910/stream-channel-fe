import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import LoginForm from '../components/auth/LoginForm';
import { AuthProvider } from '../contexts/AuthContext';

const meta: Meta<typeof LoginForm> = {
    title: 'Auth/LoginForm',
    component: LoginForm,
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

type Story = StoryObj<typeof LoginForm>;

const Template: Story = {
    render: (args) => <LoginForm {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};

export const Success: Story = {
    ...Template,
    parameters: {
        msw: {
          handlers: [
            http.post(`${process.env.VITE_LOCAL_API_URL}/api/login`, () => {
              return HttpResponse.json({
                token: 'mocked_token'
              })
            }),
          ],
        }
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await userEvent.type(canvas.getByPlaceholderText('Email'), 'newtest@example.com');
        await userEvent.type(canvas.getByPlaceholderText('Password'), 'NewPass123');

        await step('Submit form', async () => {
            await userEvent.click(canvas.getByRole('button', { name: 'Login' }));
        });

        await waitFor(() => expect( canvas.getByText('Login successful')).toBeInTheDocument());
    },
}


export const Close: Story = {
    ...Template,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: '×' }));
    },
};