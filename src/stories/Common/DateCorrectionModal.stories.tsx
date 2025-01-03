import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import DateCorrectionModal from '@/components/common/datePicker/DateCorrectionModal';

const meta: Meta<typeof DateCorrectionModal> = {
	title: 'Common/DateCorrectionModal',
	component: DateCorrectionModal,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		top: { control: { type: 'number', min: 0, max: 20, step: 1 } },
		left: { control: { type: 'number', min: 0, max: 20, step: 1 } },
		date: { control: 'date' },
	},
	args: {
		top: 5,
		left: 5,
		date: null,
		onClick: fn(),
		handleCurrentDate: fn(),
	},
} satisfies Meta<typeof DateCorrectionModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Date: Story = {
	args: {
		date: '2024-12-18',
	},
};
