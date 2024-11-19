import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ToggleSwitchButton from '@/components/common/v2/ToggleSwitchButton';

const meta = {
	title: 'Common/Button/ToggleSwitchButton',
	component: ToggleSwitchButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof ToggleSwitchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleSwitchOnButton: Story = {
	args: {
		active: true,
		onClick: fn(),
	},
};
