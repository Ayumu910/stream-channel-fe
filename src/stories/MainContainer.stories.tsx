import type { Meta, StoryObj } from '@storybook/react';
import MainContainer from '../components/layout/MainContainer';
import { AuthProvider } from '../contexts/AuthContext';

const meta: Meta<typeof MainContainer> = {
    title: 'Layout/MainContainer',
    component: MainContainer,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
          <AuthProvider>
            <Story />
          </AuthProvider>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof MainContainer>;

const Template: Story = {
    render: (args) => <MainContainer {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};