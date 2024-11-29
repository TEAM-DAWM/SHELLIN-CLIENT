import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

const meta: Meta<typeof Button> = {
	title: 'Example/Button', // 스토리북에 올릴 component폴더 계층 구조,
	component: Button, // 스토리를 만들 컴포넌트 이름
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		primary: true,
		label: 'Button',
	},
};

export const Secondary: Story = {
	args: {
		label: 'Button',
	},
};

export const Large: Story = {
	args: {
		size: 'large',
		label: 'Button',
	},
};

export const Small: Story = {
	args: {
		size: 'small',
		label: 'Button',
	},
};
