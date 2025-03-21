import type { Meta, StoryObj } from '@storybook/react';

import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';

const meta = {
	title: 'Common/Popup/DeadlineBox',
	component: DeadlineBox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'interactive'],
	argTypes: {
		date: { control: 'text' },
		startTime: { control: 'text' },
		endTime: { control: 'text' },
		label: { control: 'text' },
	},
} satisfies Meta<typeof DeadlineBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		date: new Date(),
		endTime: '05:00pm',
		label: '마감 기한',
	},
};
export const ProgressPeriodBox: Story = {
	args: {
		date: new Date(),
		startTime: '11:00am',
		endTime: '06:00pm',
		label: '진행 기간',
	},
};
