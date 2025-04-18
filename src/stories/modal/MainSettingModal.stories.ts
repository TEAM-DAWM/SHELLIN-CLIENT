import type { Meta, StoryObj } from '@storybook/react';

import MainSettingModal from '@/components/common/v2/modal/MainSettingModal';

const meta = {
	title: 'modal/MainSettingModal',
	component: MainSettingModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof MainSettingModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		taskId: 1,
		onClose: () => {},
		status: '진행중',
		targetDate: '2025-01-22',
	},
};
