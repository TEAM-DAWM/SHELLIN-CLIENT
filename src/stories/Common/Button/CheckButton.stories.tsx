import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import CheckButton from '@/components/common/v2/control/CheckButton';

const meta = {
	title: 'Common/Button/CheckButton',
	component: CheckButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof CheckButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckedLargeButton: Story = {
	args: {
		label: '하루종일',
		size: 'large',
		checked: true,
		onClick: fn(),
	},
};
export const CheckedSmallButton: Story = {
	args: {
		label: '하루종일',
		size: 'small',
		checked: true,
		onClick: fn(),
	},
};
export const NotCheckedLargeButton: Story = {
	args: {
		label: '하루종일',
		size: 'large',
		checked: false,
		onClick: fn(),
	},
};
export const NotCheckedSmallButton: Story = {
	args: {
		label: '하루종일',
		size: 'small',
		checked: false,
		onClick: fn(),
	},
};
