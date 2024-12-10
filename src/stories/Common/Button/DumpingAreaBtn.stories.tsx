import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';

import DumpingAreaBtn from '@/components/common/v2/TextBox/DumpingAreaBtn';

const meta: Meta<typeof DumpingAreaBtn> = {
	title: 'Common/TextBox/DumpingAreaBtn',
	component: DumpingAreaBtn,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof DumpingAreaBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Placeholder: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('해야 할 일을 여기에 쏟아내세요');
		await userEvent.click(input);
	},
};

export const Typing: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('해야 할 일을 여기에 쏟아내세요');
		await userEvent.type(input, 'Task input in progress');
	},
};

export const Field: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('해야 할 일을 여기에 쏟아내세요');
		await userEvent.type(input, 'Task complete');
		await userEvent.tab();
	},
};
