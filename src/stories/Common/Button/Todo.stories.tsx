import type { Meta, StoryObj } from '@storybook/react';

import Todo from '@/components/common/v2/taskBox/Todo';

const meta = {
	title: 'Common/TaskBox/Todo',
	component: Todo,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text', description: '할 일 제목' },
		deadline: { control: 'text', description: '할 일의 마감기한' },
		status: {
			control: 'radio',
			options: ['미완료', '진행중', '완료'],
			description: '할 일 상태 (미완료, 진행중, 완료)',
		},
	},
} satisfies Meta<typeof Todo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: '할 일 제목',
		deadline: '2024-12-31',
		status: '미완료',
	},
};
