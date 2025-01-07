import styled from '@emotion/styled';

import Icon from '@/components/common/Icon';
import TimeBtn from '@/components/common/v2/popup/TimeBtn';

interface DateTimeBtnProps {
	date: string;
	startTime?: string;
	endTime: string;
	isSetDate: boolean;
	isAllday?: boolean;
	onClick: () => void;
}

function DateTimeBtn({ date, startTime, endTime, isSetDate = false, isAllday = false, onClick }: DateTimeBtnProps) {
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
		<DateTimeBtnContainer onClick={onClick}>
			<DateTimeBtnLayout>
				<Icon name="IcnModify" size="tiny" color="nomal" />
				<TextBox>
					{date} {renderTimeText()}
				</TextBox>
			</DateTimeBtnLayout>
		</DateTimeBtnContainer>
	) : (
		<DateTimeBtnContainer isSingle={!startTime}>
			<DateTimeBtnLayout>
				<Icon name="IcnCalendar" size="tiny" color="nomal" />
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
	justify-content: center;
	width: auto;
	height: 3.2rem;
	padding: 0 1.6rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	border-radius: 8px;
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

	${({ theme }) => theme.font.label05};
`;

const TimeBtnContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	align-content: center;
	height: 3.2rem;
`;
export default DateTimeBtn;
