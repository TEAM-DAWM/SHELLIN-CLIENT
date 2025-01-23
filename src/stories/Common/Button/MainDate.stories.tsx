import type { Meta, StoryObj } from '@storybook/react';

import MainDate from '@/components/common/v2/TextBox/MainDate';

const meta = {
	title: 'Common/TextBox/MainDate',
	component: MainDate,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		year: { control: { type: 'number' }, description: '년도 (선택)' },
		month: { control: { type: 'number', min: 1, max: 12 }, description: '월 (필수)' },
		day: { control: { type: 'number', min: 1, max: 31 }, description: '일 (선택)' },
	},
} satisfies Meta<typeof MainDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		month: 11,
		day: 30,
	},
};

export const DateWithYear: Story = {
	args: {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		day: new Date().getDate(),
	},
};

export const DateWithNonDay: Story = {
	args: {
		year: 2023,
		month: 11,
	},
};
