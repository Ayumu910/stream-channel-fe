import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import RegisterForm from '../components/auth/RegisterForm'

const meta: Meta<typeof RegisterForm> = {
    title: 'Auth/RegisterForm',
    component: RegisterForm,
    tags: ['autodocs'],
    argTypes: {
        onClose: { action: 'closed' },
        setIsLoggedIn: { action: 'logged in' },
    },
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

const Template: Story = {
    render: (args) => <RegisterForm {...args} />,
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
            http.post(`${process.env.VITE_LOCAL_API_URL}/api/accounts`, () => {
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
        await userEvent.click(canvas.getByRole('button', { name: 'Register' }));

        await step('Submit form', async () => {
            await userEvent.click(canvas.getByRole('button', { name: 'Register' }));
        });

        await waitFor(() => expect( canvas.getByText('Registration successful')).toBeInTheDocument());
    },
}

export const Close: Story = {
    ...Template,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: '×' }));
    },
};