import styled from '@emotion/styled';

import Icn from '@/assets/svg/V2';
import TimeBtn from '@/components/common/v2/category/TimeBtn';

interface DateTimeBtnProps {
	date: string;
	startTime?: string;
	endTime: string;
	isSetDate: boolean;
}

function DateTimeBtn({ date, startTime, endTime, isSetDate = false }: DateTimeBtnProps) {
	return isSetDate ? (
		<DateTimeBtnLayout>
			<IconStyle />
			<TextBox>
				{date} {startTime}
				{endTime}
			</TextBox>
		</DateTimeBtnLayout>
	) : (
		<DateTimeBtnContainer>
			<DateTimeBtnLayout>
				<IconStyle />
				<TextBox>{date}</TextBox>
			</DateTimeBtnLayout>
			<TimeBtn time={endTime} /> 까지
		</DateTimeBtnContainer>
	);
}

const DateTimeBtnContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	margin: 0 0.8rem;

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
	padding: 0 1.6rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	border-radius: 8px;
`;

const IconStyle = styled(Icn.IcnModify)`
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
