import type { Meta, StoryObj } from '@storybook/react';

import PopUp from '@/components/common/v2/TextBox/PopUp';

const meta: Meta<typeof PopUp> = {
	title: 'Common/TextBox/PopUp',
	component: PopUp,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'radio',
			options: ['title', 'description'],
			description: 'Type of input field',
			defaultValue: 'title',
		},
	},
} satisfies Meta<typeof PopUp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Title: Story = {
	args: {
		type: 'title',
	},
};

export const Description: Story = {
	args: {
		type: 'description',
	},
};
