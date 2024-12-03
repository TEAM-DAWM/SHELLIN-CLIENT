import styled from '@emotion/styled';

import Icn from '@/assets/svg/V2';
import TimeBtn from '@/components/common/v2/category/TimeBtn';

interface DateTimeBtnProps {
	date: string;
	startTime?: string;
	endTime: string;
	isSetDate: boolean;
	isAllday?: boolean;
}

function DateTimeBtn({ date, startTime, endTime, isSetDate = false, isAllday = false }: DateTimeBtnProps) {
	const renderTimeText = () => {
		if (isAllday) return null;
		if (startTime && endTime) {
			return `${startTime}-${endTime}`;
		}
		if (endTime) {
			return `${endTime} 까지`;
		}
		return null;
	};

	return isSetDate ? (
		<DateTimeBtnContainer>
			<DateTimeBtnLayout>
				<ModifyIcn />
				<TextBox>
					{date} {renderTimeText()}
				</TextBox>
			</DateTimeBtnLayout>
		</DateTimeBtnContainer>
	) : (
		<DateTimeBtnContainer isSingle={!startTime}>
			<DateTimeBtnLayout>
				<CalendarIcn />
				<TextBox>{date}</TextBox>
			</DateTimeBtnLayout>
			{!isAllday && (
				<TimeBtnContainer>
					{startTime && (
						<>
							<TimeBtn time={startTime} />
							<GrayText>부터</GrayText>
						</>
					)}
					<TimeBtn time={endTime} />
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

const DateTimeBtnLayout = styled.button`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	width: auto;
	height: 3.2rem;
	padding: 0 1.6rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	border-radius: 8px;
`;

const ModifyIcn = styled(Icn.IcnModify)`
	width: 1.6rem;
	height: 1.6rem;

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;

const CalendarIcn = styled(Icn.IcnCalendar)`
	width: 1.6rem;
	height: 1.6rem;

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;

const TextBox = styled.p`
	width: auto;
	height: 1.4rem;

	color: ${({ theme }) => theme.colorToken.Text.assistive};
	${({ theme }) => theme.font.label05};
	font-weight: 500;
`;

const GrayText = styled.p`
	align-content: center;
	height: 3.2rem;

	color: ${({ theme }) => theme.colorToken.Text.disable};
	font-weight: 600;
	font-size: 1.4rem;
`;

const TimeBtnContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	align-content: center;
	height: 3.2rem;
`;
export default DateTimeBtn;
