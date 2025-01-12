/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { DayHeaderContentArg } from '@fullcalendar/core';

import SubDate from '../v2/TextBox/SubDate';

interface DayHeaderContentProps {
	arg: DayHeaderContentArg;
	currentView: string;
	today: string;
	selectDate?: string;
	size: string;
}

function DayHeaderContent({ arg, currentView, today, selectDate, size }: DayHeaderContentProps) {
	let adjustDay = size === 'big' ? 3 : 2;
	if (currentView === 'dayGridMonth') {
		adjustDay = 0;
	}
	const adjustedDate = new Date(arg.date);
	adjustedDate.setDate(adjustedDate.getDate() - adjustDay);

	const isTimeGridDay = currentView === 'timeGridDay';
	const day = new Intl.DateTimeFormat('ko', { weekday: isTimeGridDay ? 'long' : 'short' }).format(adjustedDate);
	const date = adjustedDate.getDate();
	const isSelectedDate = adjustedDate.toDateString() === selectDate;
	const isToday = adjustedDate.toDateString() === today;
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
