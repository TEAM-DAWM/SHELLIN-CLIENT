/* eslint-disable no-nested-ternary */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DayCellContentArg } from '@fullcalendar/core';
import { useState } from 'react';

import { theme } from '@/styles/theme';

const TYPE = {
	TERITARY: 'Teritary',
	SECONDARY: 'Secondary',
	PRIMARY: 'Primary',
} as const;

const STATE = {
	DEFAULT: 'Default',
	HOVER: 'Hover',
	PRESSED: 'Pressed',
} as const;

type StateType = (typeof STATE)[keyof typeof STATE];

interface CustomDayCellContentProps {
	arg: DayCellContentArg;
	today: string;
	selectDate?: string;
}

// 월간 달력에서 날짜 '일' 제거 및 스타일링 적용
function CustomDayCellContent({ arg, today, selectDate }: CustomDayCellContentProps) {
	const date = new Date(arg.date);
	const day = arg.dayNumberText.replace('일', '');
	const isSelectedDate = selectDate ? new Date(selectDate).toDateString() === new Date(arg.date).toDateString() : false;

	const isToday = date.toDateString() === today;
	const [state, setState] = useState<StateType>(STATE.DEFAULT);

	const type = isToday ? TYPE.PRIMARY : isSelectedDate ? TYPE.SECONDARY : TYPE.TERITARY;

	const handleStateChange = (newState: StateType) => () => {
		setState(newState);
	};

	if (arg.view.type === 'dayGridMonth') {
		return (
			<MonthViewDate
				type={type}
				state={state}
				onMouseEnter={handleStateChange(STATE.HOVER)}
				onMouseLeave={handleStateChange(STATE.DEFAULT)}
				onMouseDown={handleStateChange(STATE.PRESSED)}
				onMouseUp={handleStateChange(STATE.DEFAULT)}
				isSelectedDate={isSelectedDate}
				isToday={isToday}
			>
				{arg.view.type === 'dayGridMonth' ? day : ''}
			</MonthViewDate>
		);
	}
}

export default CustomDayCellContent;

const backgroundStyles = {
	Teritary: {
		Default: 'transparent',
		Hover: theme.colorToken.Primary.strongVariant,
		Pressed: theme.colorToken.Primary.heavyVariant,
	},
	Secondary: {
		Default: 'transparent',
		Hover: theme.colorToken.Primary.strongVariant,
		Pressed: theme.colorToken.Component.heavy,
	},
	Primary: {
		Default: theme.colorToken.Primary.normal,
		Hover: theme.colorToken.Primary.strong,
		Pressed: theme.colorToken.Primary.heavy,
	},
};

const textStyles = {
	Teritary: theme.colorToken.Text.neutralLight,
	Secondary: theme.colorToken.Text.primary,
	Primary: theme.colorToken.Text.neutralDark,
};

const MonthViewDate = styled.div<{
	type: keyof typeof backgroundStyles;
	state: keyof (typeof backgroundStyles)['Teritary'];
	isSelectedDate: boolean;
	isToday: boolean;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.4rem;
	height: 2.4rem;

	border-radius: 6px;

	${({ theme }) => theme.font.label03};

	${({ type, state }) => css`
		color: ${textStyles[type]};

		background-color: ${backgroundStyles[type][state]};

		${type === TYPE.SECONDARY && underlineStyle}
	`}
`;

const underlineStyle = css`
	position: relative;

	&::after {
		position: absolute;
		bottom: 2px;
		left: 50%;
		width: 2rem;
		height: 0.1rem;

		background-color: ${theme.colorToken.Text.primary};
		transform: translateX(-50%);

		content: '';
	}
`;
