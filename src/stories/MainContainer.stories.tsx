import type { Meta, StoryObj } from '@storybook/react';
import MainContainer from '../components/layout/MainContainer';

const meta: Meta<typeof MainContainer> = {
    title: 'Layout/MainContainer',
    component: MainContainer,
    tags: ['autodocs'],
    argTypes: {
        isLoggedIn :{ control: 'boolean' },
    },
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
