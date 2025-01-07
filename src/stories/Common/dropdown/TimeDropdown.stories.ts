import type { Meta, StoryObj } from '@storybook/react';

import TimeDropdown from '@/components/common/v2/dropdown/TimeDropdown';

const meta = {
	title: 'Common/dropdown/TimeDropdown',
	component: TimeDropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TimeDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		handleSelectTime: () => {},
	},
};
