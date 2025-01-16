import type { Meta, StoryObj } from '@storybook/react';

import DropdownButton from '@/components/common/v2/control/DropdownButton';

const noop = () => {};

const meta = {
	title: 'Common/Control/DropdownButton',
	component: DropdownButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DropdownButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Incomplete: Story = {
	args: {
		status: '미완료',
		handleStatusChange: noop,
	},
};

export const Inprogress: Story = {
	args: {
		status: '진행 중',
		handleStatusChange: noop,
	},
};
export const Complete: Story = {
	args: {
		status: '완료',
		handleStatusChange: noop,
	},
};
