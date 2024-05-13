import type { Meta, StoryObj } from '@storybook/react';
import NavBar from '../components/layout/NavBar';

const meta: Meta<typeof NavBar> = {
    title: 'Layout/NavBar',
    component: NavBar,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavBar>;

const Template: Story = {
    render: (args) => <NavBar {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};
