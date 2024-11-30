import { css } from '@emotion/react';
import styled from '@emotion/styled';
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

interface SubDateProps {
	day: string;
	weekDay: string;
	type: (typeof TYPE)[keyof typeof TYPE];
}

function SubDate({ day, weekDay, type }: SubDateProps) {
	const [state, setState] = useState<StateType>(STATE.DEFAULT);

	const handleStateChange = (newState: StateType) => () => {
		setState(newState);
	};

	return (
		<SubDateContainer
			type={type}
			state={state}
			onMouseEnter={handleStateChange(STATE.HOVER)}
			onMouseLeave={handleStateChange(STATE.DEFAULT)}
			onMouseDown={handleStateChange(STATE.PRESSED)}
			onMouseUp={handleStateChange(STATE.DEFAULT)}
		>
			<span className="day">{day}</span>
			<span className="week-day">{weekDay}</span>
		</SubDateContainer>
	);
}

export default SubDate;

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
	Teritary: {
		day: theme.colorToken.Text.assistive,
		weekDay: theme.colorToken.Text.assistiveLight,
	},
	Secondary: {
		day: theme.colorToken.Text.primary,
		weekDay: theme.colorToken.Text.primary,
	},
	Primary: {
		day: theme.colorToken.Text.neutralDark,
		weekDay: theme.colorToken.Text.neutralDark,
	},
};

const SubDateContainer = styled.div<{
	type: keyof typeof backgroundStyles;
	state: keyof (typeof backgroundStyles)['Teritary'];
}>`
	display: inline-flex;
	gap: 4px;
	align-items: center;
	justify-content: center;
	padding: 0 3px;

	border-radius: 4px;

	${({ type, state }) => css`
		background-color: ${backgroundStyles[type][state]};

		.day {
			color: ${textStyles[type].day};
			${theme.font.body01};
		}

		.week-day {
			color: ${textStyles[type].weekDay};
			${theme.font.body04};
		}

		${type === TYPE.SECONDARY &&
		css`
			${underlineStyle}
		`}
	`}
`;

const underlineStyle = css`
	position: relative;

	&::after {
		position: absolute;
		bottom: 2px;
		left: 50%;
		width: 3.2rem;
		height: 0.1rem;

		background-color: ${theme.colorToken.Text.primary};
		transform: translateX(-50%);

		content: '';
	}
`;
