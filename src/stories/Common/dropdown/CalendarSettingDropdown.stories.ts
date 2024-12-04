import type { Meta, StoryObj } from '@storybook/react';

import CalendarSettingDropdown from '@/components/common/v2/dropdown/CalendarSettingDropdown';

const meta = {
	title: 'Common/dropdown/CalendarSettingDropdown',
	component: CalendarSettingDropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof CalendarSettingDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
