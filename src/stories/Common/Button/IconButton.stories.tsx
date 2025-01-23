import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Icn from '@/assets/svg/V2';
import IconButton from '@/components/common/v2/IconButton';

const meta: Meta<typeof IconButton> = {
	title: 'Common/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
	argTypes: {
		iconName: {
			control: { type: 'select' },
			options: Object.keys(Icn),
		},
	},
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
	args: {
		type: 'solid',
		size: 'big',
		disabled: false,
		iconName: 'IcnAlert',
		onClick: fn(),
	},
};
export const Normal: Story = {
	args: {
		type: 'normal',
		size: 'big',
		disabled: false,
		iconName: 'IcnAlert',
		onClick: fn(),
	},
};
export const Outlined: Story = {
	args: {
		type: 'outlined',
		size: 'big',
		disabled: false,
		iconName: 'IcnAlert',
		onClick: fn(),
	},
};
export const Dotted: Story = {
	args: {
		type: 'normal',
		size: 'big',
		disabled: false,
		iconName: 'IcnAlert',
		onClick: fn(),
		dot: true,
	},
};
