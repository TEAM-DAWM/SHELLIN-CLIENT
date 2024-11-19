import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ToggleLabelButton from '@/components/common/v2/ToggleLabelButton';

const meta = {
	title: 'Common/Button/ToggleLabelButton',
	component: ToggleLabelButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof ToggleLabelButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleLabelOn: Story = {
	args: {
		active: true,
		firstLabel: '주',
		secondLabel: '일',
		onClick: fn(),
	},
};

export const ToggleLabelOff: Story = {
	args: {
		active: false,
		firstLabel: '주',
		secondLabel: '일',
		onClick: fn(),
	},
};
