import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/common/Icon';

const meta = {
	title: 'Common/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TinyIcon: Story = {
	args: {
		name: 'IcnAlert',
		size: 'tiny',
	},
};
export const SmallIcon: Story = {
	args: {
		name: 'IcnAlert',
		size: 'small',
	},
};
export const MediumIcon: Story = {
	args: {
		name: 'IcnAlert',
		size: 'medium',
	},
};
export const LargeIcon: Story = {
	args: {
		name: 'IcnAlert',
		size: 'large',
	},
};
export const XLargeIcon: Story = {
	args: {
		name: 'IcnAlert',
		size: 'xlarge',
	},
};
