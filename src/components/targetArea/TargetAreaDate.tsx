import styled from '@emotion/styled';

/** nn월 nn일 */
interface TargetAreaDateProps {
	targetDate: string;
}

function TargetAreaDate({ targetDate }: TargetAreaDateProps) {
	const dateTypeDate = new Date(targetDate);
	const month = '0'.concat((dateTypeDate.getMonth() + 1).toString()).slice(-2);
	const day = '0'.concat(dateTypeDate.getDate().toString()).slice(-2);
	return (
		<TargetAreaDateBox>
			<DateNumText>{month}</DateNumText>
			<DateText>월</DateText>
			<DateNumText>{day}</DateNumText>
			<DateText>일</DateText>
		</TargetAreaDateBox>
	);
}

const TargetAreaDateBox = styled.div`
	display: flex;
	align-items: baseline;
`;

const DateNumText = styled.h1`
	margin-right: 0.1rem;

	color: ${({ theme }) => theme.colorToken.Text.neutralLight};
	${({ theme }) => theme.font.title01};
`;

const DateText = styled.h3`
	margin-right: 0.6rem;

	color: ${({ theme }) => theme.color.Grey.Grey5};
	${({ theme }) => theme.font.label03};
`;

export default TargetAreaDate;
