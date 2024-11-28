import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

import Icons from '@/assets/svg/V1/index';

interface TextInputTimeProps {
	time: 'start' | 'end' | 'total';
	userInput?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TextInputTime({ time, userInput, onChange }: TextInputTimeProps) {
	const isTotalTime = time === 'total';
	return (
		<InputTimeLayout time={time}>
			{time === 'end' && <ArrowIcon />}
			<InputTimeStyle
				type="text"
				time={time}
				maxLength={isTotalTime ? 2 : 10}
				placeholder="00:00"
				value={userInput}
				onChange={onChange}
				readOnly={isTotalTime}
			/>
			{isTotalTime && <MinuteTxt>분</MinuteTxt>}
		</InputTimeLayout>
	);
}
const InputTimeLayout = styled.div<{ time: string }>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	width: ${({ time }) => (time === 'total' ? '6rem' : '11.5rem')};
	height: 3.2rem;
	padding: 0.4rem 1rem;

	${({ theme }) => theme.fontTheme.BODY_02};
	background-color: ${({ theme, time }) => (time !== 'total' ? theme.palette.Grey.Grey1 : theme.palette.Grey.White)};
	border-radius: 8px;
`;
const ArrowIcon = styled(Icons.Icn_arrow_narrow_right)`
	width: 1.4rem;
	height: 1.4rem;
`;
const MinuteTxt = styled.p`
	${({ theme }) => theme.fontTheme.BODY_02};
	padding-left: 0.4rem;
`;
const InputTimeStyle = styled.input<{ time: string }>`
	${({ theme }) => theme.fontTheme.BODY_02};
	box-sizing: border-box;
	width: ${({ time }) => (time === 'total' ? '3.6rem' : '100%')};
	padding: 0.4rem 0.8rem;

	background-color: ${({ theme, time }) => (time === 'total' ? theme.palette.Grey.Grey1 : 'transparent')};
	border: none;
	border-radius: 8px;

	&:focus {
		outline: none;
	}
`;
export default TextInputTime;
