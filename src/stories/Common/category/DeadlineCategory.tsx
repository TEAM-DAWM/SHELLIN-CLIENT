import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Icons from '@/assets/svg/index';
import DeadlineCategory from '@/components/common/category/DeadlineCategory';

const meta = {
	title: 'Common/category',
	component: DeadlineCategory,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof DeadlineCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
	args: {
		type: 'solid',
		size: 'medium',
		disabled: false,
		label: 'Label',
		onClick: fn(),
	},
};
export const OutlinedPrimary: Story = {
	args: {
		type: 'outlined-primary',
		size: 'medium',
		disabled: false,
		label: 'Label',
		onClick: fn(),
	},
};
export const OutlinedAssistive: Story = {
	args: {
		type: 'outlined-assistive',
		size: 'medium',
		disabled: false,
		label: 'Label',
		onClick: fn(),
	},
};
export const TextPrimary: Story = {
	args: {
		type: 'text-primary',
		size: 'medium',
		disabled: false,
		label: 'Label',
		onClick: fn(),
	},
};
export const TextAssistive: Story = {
	args: {
		type: 'text-assistive',
		size: 'medium',
		disabled: false,
		label: 'Label',
		onClick: fn(),
	},
};
export const SolidWithRightIcon: Story = {
	args: {
		type: 'solid',
		size: 'medium',
		disabled: false,
		rightIcon: <Icons.Navbar.IcnNavDashboard />,
		label: 'Label',
		onClick: fn(),
	},
};
export const SolidWithLeftIcon: Story = {
	args: {
		type: 'solid',
		size: 'medium',
		disabled: false,
		leftIcon: <Icons.Navbar.IcnNavDashboard />,
		label: 'Label',
		onClick: fn(),
	},
};
export const SolidWithBothIcon: Story = {
	args: {
		type: 'solid',
		size: 'medium',
		disabled: false,
		leftIcon: <Icons.Navbar.IcnNavDashboard />,
		rightIcon: <Icons.Navbar.IcnNavDashboard />,
		label: 'Label',
		onClick: fn(),
	},
};
