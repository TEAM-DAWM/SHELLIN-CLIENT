/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { DayHeaderContentArg } from '@fullcalendar/core';

import SubDate from '../v2/TextBox/SubDate';

interface DayHeaderContentProps {
	arg: DayHeaderContentArg;
	currentView: string;
	today: string;
	selectDate?: string;
}

function DayHeaderContent({ arg, currentView, today, selectDate }: DayHeaderContentProps) {
	const day = new Intl.DateTimeFormat('ko', { weekday: 'short' }).format(arg.date);
	const date = arg.date.getDate();

	const isSelectedDate = arg.date.toDateString() === selectDate;
	const isToday = arg.date.toDateString() === today;
	const isSatday = day === '토';
	const isSunday = day === '일';

	return (
		<div>
			{currentView === 'dayGridMonth' ? (
				<WeekDay isSatday={isSatday} isSunday={isSunday}>
					{day}
				</WeekDay>
			) : (
				<SubDate
					day={date.toString()}
					weekDay={day.toString()}
					type={isToday ? 'Primary' : isSelectedDate ? 'Secondary' : 'Teritary'}
				/>
			)}
		</div>
	);
}

const WeekDay = styled.div<{ isSatday: boolean; isSunday: boolean }>`
	${({ theme }) => theme.font.label04};
	color: ${({ isSatday, isSunday, theme }) =>
		isSatday ? theme.color.Blue.Blue7 : isSunday ? theme.color.Orange.Orange5 : theme.color.Grey.Grey5};
	text-transform: uppercase;
`;

export default DayHeaderContent;
