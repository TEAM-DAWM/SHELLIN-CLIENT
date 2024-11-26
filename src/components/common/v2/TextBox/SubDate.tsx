import styled from 'styled-components';

import { theme } from '@/styles/theme';

type SubDateProps = {
	day: number;
	weekDay: string;
};

// Teritary, Secondary, Primary
//  Default, Hover, Pressed

const dateStyle = {
	style: {},
	Teritary: {
		Default: {},
		Hover: {},
		Pressed: {},
	},
	Secondary: {
		Default: {},
		Hover: {},
		Pressed: {},
	},
	Primary: {
		Default: {},
		Hover: {},
		Pressed: {},
	},
};

function SubDate({ day, weekDay }: SubDateProps) {
	return (
		<SubDateContainer>
			<span className="day">{day}</span>
			<span className="week-day">{weekDay}</span>
		</SubDateContainer>
	);
}

export default SubDate;

const SubDateContainer = styled.div`
	display: inline-flex;
	gap: 4px;
	align-items: center;
	justify-content: center;
	padding: 0 3px;

	.day {
		${theme.font.body01};
	}

	.week-day {
		${theme.font.body04};
	}
`;
