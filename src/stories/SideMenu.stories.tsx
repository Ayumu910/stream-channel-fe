import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import SideMenu from '../components/layout/SideMenu'

const meta: Meta<typeof SideMenu> = {
    title: 'Layout/SideMenu',
    component: SideMenu,
    tags: ['autodocs'],
    argTypes: {
        isLoggedIn: { control: 'boolean' },
        setIsLoggedIn: { action: 'logged in or logged out' },
    },
};
export default meta;

type Story = StoryObj<typeof SideMenu>;

const Template: Story = {
    render: (args) => <SideMenu {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};

export const LoggedIn: Story = {
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

        await step('click signup button', async () => {
            const signupButton = await canvas.getByRole('button', { name: /sign up/i });
            await userEvent.click(signupButton);
        });

        await step('click login button', async () => {
            const loginButton = await canvas.findByRole('button', { name: 'Login' });
            await userEvent.click(loginButton);
        });

        await step('submit on login form', async () => {
            const emailInput = await canvas.findByPlaceholderText(/email/i);
            await userEvent.type(emailInput, 'test@example.com');
            const passwordInput = await canvas.findByPlaceholderText(/password/i);
            await userEvent.type(passwordInput, 'password');

            const submitButton = await canvas.findByRole('button', { name: /login/i });
            await userEvent.click(submitButton);
        });

        await waitFor(async () => {
            const successMessage = await canvas.findByText('Login successful');
            expect(successMessage).toBeInTheDocument();
        })

        await step('close forms', async () => {
            const closeButton1 = await canvas.findByRole('button', { name: '×' });
            await userEvent.click(closeButton1);
            const closeButton2 = await canvas.findByRole('button', { name: '×' });
            await userEvent.click(closeButton2);
        });

        //isLoggedIn 状態を管理するのは TopPage.tsx なので、このコンポーネントだけでは「Logout」に切り替わらない
        await waitFor(async () => {
            const logoutButton = await canvas.findByRole('button', { name: /sign up/i });
            expect(logoutButton).toBeInTheDocument();
            expect(localStorage.getItem('token')).toBe('mocked_token');
        });
    },
  };