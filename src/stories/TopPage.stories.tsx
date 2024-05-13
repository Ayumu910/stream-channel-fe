import type { Meta, StoryObj } from '@storybook/react';
import TopPage from '../pages/TopPage';

const meta: Meta<typeof TopPage> = {
    title: 'Page/TopPage',
    component: TopPage,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TopPage>;

const Template: Story = {
    render: (args) => <TopPage {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};
