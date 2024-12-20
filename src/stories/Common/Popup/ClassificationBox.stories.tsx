import type { Meta, StoryObj } from '@storybook/react';

import ClassificationBox from '@/components/common/v2/popup/ClassificationBox';

const meta = {
	title: 'Common/Popup/ClassificationBox',
	component: ClassificationBox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'interactive'],
	argTypes: {
		label: { control: 'text' },
		categoryName: { control: 'text' },
	},
} satisfies Meta<typeof ClassificationBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: '분류',
		categoryName: '카테고리 이름',
	},
};
