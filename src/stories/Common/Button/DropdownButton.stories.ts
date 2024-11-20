import type { Meta, StoryObj } from '@storybook/react';

import DropdownButton from '@/components/common/v2/control/DropdownButton';

const meta = {
	title: 'Common/Button/DropdownButton',
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
	},
};

export const Inprogress: Story = {
	args: {
		status: '진행중',
	},
};
export const Complete: Story = {
	args: {
		status: '완료',
	},
};
