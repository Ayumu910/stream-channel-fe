import type { Meta, StoryObj } from '@storybook/react';
import Task  from '../components/Task';

//Task から Meta 型のメタデータを生成
const meta: Meta<typeof Task> = {
    component: Task,
};
export default meta;

//Task から Story型を生成
type Story = StoryObj<typeof Task>;

//Story 型の Default ストーリーを記述
export const Default: Story = {
    args: {
        task: {
            id: "1",
            title: "鉛筆を買う",
            state: 'TASK_INBOX',
        },
    },
};

//Pinned ストーリーを記述
export const Pinned: Story = {
    args: {
        task: {
            id: "1",
            title: "鉛筆を買う",
            state: 'TASK_PINNED',
        },
    },
};


export const Archived: Story = {
    args: {
        task: {
            id: "1",
            title: "鉛筆を買う",
            state: 'TASK_ARCHIVED',
        },
    },
};



