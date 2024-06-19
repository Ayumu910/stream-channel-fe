import type { Meta, StoryObj } from '@storybook/react';
import SortMenu from '../components/playlist/SortMenu';

const meta: Meta<typeof SortMenu> = {
    title: 'Playlist/SortMenu',
    component: SortMenu,
    tags: ['autodocs'],
    argTypes: {
        onSort: { action: 'order changed' },
    }
};

export default meta;

type Story = StoryObj<typeof SortMenu>;

const Template: Story = {
    render: (args) => <SortMenu {...args} />,
};

export const Default: Story = {
    ...Template,
    args: {},
};