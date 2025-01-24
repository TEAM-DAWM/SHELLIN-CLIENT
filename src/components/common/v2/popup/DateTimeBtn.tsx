import styled from '@emotion/styled';
import { useState } from 'react';

import DateBtn from '@/components/common/v2/popup/DateBtn';
import TimeBtn from '@/components/common/v2/popup/TimeBtn';

interface DateTimeBtnProps {
	date: Date;
	startTime?: string;
	endTime: string;
	isSetDate: boolean;
	isAllday?: boolean;
	onClick: () => void;
	handleDueDateModalDate?: (date: Date) => void;
	handleDueDateModalTime?: (time: string) => void;
	handleTimeBlockDate?: (date: Date) => void;
}

function DateTimeBtn({
	date: initDate,
	startTime: initStartTime,
	endTime: initEndTime,
	isSetDate,
	isAllday = false,
	onClick,
	handleDueDateModalDate = () => {},
	handleDueDateModalTime = () => {},
	handleTimeBlockDate = () => {},
}: DateTimeBtnProps) {
	// ~~여기에 상태 있어야하는지 의문~~
	const [startTime, setStartTime] = useState(initStartTime);
	const [endTime, setEndTime] = useState(initEndTime);
	const [date, setDate] = useState(initDate);
	// ~~~~

	const updateStartTime = (newTime: string) => {
		setStartTime(newTime);
	};

	const updateEndTime = (newTime: string) => {
		setEndTime(newTime);
		handleDueDateModalTime(newTime.slice(0, 5));
	};

	const updateDate = (newDate: Date) => {
		setDate(newDate);
		handleDueDateModalDate(newDate);
		handleTimeBlockDate(newDate);
	};

	return isSetDate ? (
		<DateTimeBtnContainer onClick={onClick}>
			<DateBtn
				isAllday={isAllday}
				isSetDate={isSetDate}
				startTime={startTime}
				endTime={endTime}
				date={date}
				handleDate={updateDate}
			/>
		</DateTimeBtnContainer>
	) : (
		<DateTimeBtnContainer isSingle={!startTime}>
			<DateBtn
				isAllday={isAllday}
				isSetDate={isSetDate}
				startTime={startTime}
				endTime={endTime}
				date={date}
				handleDate={updateDate}
			/>
			{!isAllday && (
				<TimeBtnContainer>
					{startTime && (
						<>
							<TimeBtn time={startTime} setTime={updateStartTime} />
							<GrayText>부터</GrayText>
						</>
					)}
					<TimeBtn time={endTime} setTime={updateEndTime} />
					<GrayText>까지</GrayText>
				</TimeBtnContainer>
			)}
		</DateTimeBtnContainer>
	);
}

const DateTimeBtnContainer = styled.div<{ isSingle?: boolean }>`
	display: flex;
	flex-direction: ${({ isSingle = true }) => (isSingle ? 'row' : 'column')};
	gap: 0.8rem;
	align-items: flex-start;
	margin: 0 0 0 0.8rem;
`;

const GrayText = styled.p`
	align-content: center;
	height: 3.2rem;

	color: ${({ theme }) => theme.colorToken.Text.disable};
	font-weight: 600;
	font-size: 1.4rem;

	${({ theme }) => theme.font.label05};
`;

const TimeBtnContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	align-content: center;
	height: 3.2rem;
`;
export default DateTimeBtn;
