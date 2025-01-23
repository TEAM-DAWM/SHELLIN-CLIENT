import styled from '@emotion/styled';
import { ChangeEvent, useState, useEffect } from 'react';

import Icons from '@/assets/svg/V1/index';
import TextInputTime from '@/components/common/textbox/TextInputTime';
import timeRange from '@/utils/timeRange';

interface ModalTextInputTimeProps {
	startTime: string;
	endTime: string;
	handleStartTimeChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleEndTimeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ModalTextInputTime({
	startTime,
	endTime,
	handleStartTimeChange,
	handleEndTimeChange,
}: ModalTextInputTimeProps) {
	const [totalTime, setTotalTime] = useState('');

	useEffect(() => {
		if (startTime && endTime) {
			setTotalTime(timeRange(startTime, endTime));
		} else {
			setTotalTime('');
		}
	}, [startTime, endTime]);

	return (
		<ModalTextInputTimeLayout>
			<TextInputTimeBox>
				<TmpIcon />
				<TextInputTime time="start" userInput={startTime} onChange={handleStartTimeChange} />
				<TextInputTime time="end" userInput={endTime} onChange={handleEndTimeChange} />
			</TextInputTimeBox>
			<TextInputTime time="total" userInput={totalTime} />
		</ModalTextInputTimeLayout>
	);
}

const ModalTextInputTimeLayout = styled.div`
	display: flex;
	gap: 2rem;
	width: 100%;
`;

const TextInputTimeBox = styled.div`
	display: flex;
	gap: 0.4rem;
	align-items: center;
`;

const TmpIcon = styled(Icons.ClockCheck)`
	width: 2.4rem;
	height: 2.4rem;
`;

export default ModalTextInputTime;
