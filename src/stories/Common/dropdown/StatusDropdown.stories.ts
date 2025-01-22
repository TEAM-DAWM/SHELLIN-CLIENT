import type { Meta, StoryObj } from '@storybook/react';

import StatusDropdown from '@/components/common/v2/dropdown/StatusDropdown';

const noop = () => {};

const meta = {
	title: 'Common/dropdown/StatusDropdown',
	component: StatusDropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof StatusDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Incomplete: Story = {
	args: {
		currentStatus: '미완료',
		handleStatusChange: noop,
	},
};

export const InProgress: Story = {
	args: {
		currentStatus: '진행중',
		handleStatusChange: noop,
	},
};

export const Completed: Story = {
	args: {
		currentStatus: '완료',
		handleStatusChange: noop,
	},
};
