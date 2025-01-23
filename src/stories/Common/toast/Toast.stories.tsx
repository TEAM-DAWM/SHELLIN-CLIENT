import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Toast from '@/components/toast/Toast';

const meta = {
	title: 'Common/Toast',
	component: Toast,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: { onClose: fn() },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SuccessToast: Story = {
	args: {
		message: '할 일을 완료했어요',
		onClose: fn(),
		code: 'success',
	},
};

export const ErrorToast: Story = {
	args: {
		message: '할 일을 완료했어요',
		onClose: fn(),
		code: 'error',
	},
};

export const InfoToast: Story = {
	args: {
		message: '할 일을 완료했어요',
		onClose: fn(),
		code: 'success',
	},
};
