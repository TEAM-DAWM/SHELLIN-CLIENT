import type { Meta, StoryObj } from '@storybook/react';

import SubDate from '@/components/common/v2/TextBox/SubDate';

const meta = {
	title: 'Common/TextBox/SubDate',
	component: SubDate,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'radio' },
			options: ['Teritary', 'Secondary', 'Primary'],
		},
		day: {
			control: { type: 'text' },
			description: '날짜(일)',
		},
		weekDay: {
			control: { type: 'text' },
			description: '날짜(요일). ex) 화',
		},
	},
} satisfies Meta<typeof SubDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		type: 'Teritary',
		day: '23',
		weekDay: '화',
	},
};
