import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import SortingDropdown from '@/components/common/v2/dropdown/SortingDropdown';

const meta = {
	title: 'Common/dropdown/SortingDropdown',
	component: SortingDropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof SortingDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		handleSortOrder: action('handleSortOrder'), // 버튼 클릭 시 액션 로그 출력
	},
};
