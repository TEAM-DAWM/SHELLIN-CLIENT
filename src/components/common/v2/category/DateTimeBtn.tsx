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
			return `${startTime} - ${endTime}`;
		}
		if (endTime) {
			return `${endTime} 까지`;
		}
		return null;
	};

	return isSetDate ? (
		<DateTimeBtnLayout>
			<ModifyIcn />
			<TextBox>
				{date} {renderTimeText()}
			</TextBox>
		</DateTimeBtnLayout>
	) : (
		<DateTimeBtnContainer>
			<DateTimeBtnLayout>
				<CalendarIcn />
				<TextBox>{date}</TextBox>
			</DateTimeBtnLayout>
			{!isAllday && <TimeBtn time={endTime} />}
			까지
		</DateTimeBtnContainer>
	);
}

const DateTimeBtnContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;

	color: ${({ theme }) => theme.colorToken.Text.disable};
	font-weight: 600;
	font-size: 1.4rem;
`;

const DateTimeBtnLayout = styled.button`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	width: auto;
	height: 3.2rem;
	margin: 0 0 0 0.8rem;
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
export default DateTimeBtn;
