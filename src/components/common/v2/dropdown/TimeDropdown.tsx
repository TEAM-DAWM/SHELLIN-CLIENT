import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import quarterTimes from '@/utils/generateQuarterTimes';

function TimeDropdown() {
	return (
		<TimeDropdownContainer>
			{quarterTimes.map((time) => (
				<Button key={time} label={time} onClick={() => {}} size="large" type="text-assistive" disabled={false} />
			))}
		</TimeDropdownContainer>
	);
}

const TimeDropdownContainer = styled.div`
	width: 16.8rem;
	height: 30rem;
	padding: 0.8rem;
	overflow-y: auto;

	border-radius: 12px;

	${({ theme }) => theme.shadow.FloatingAction3};

	/* 스크롤바 전체 */
	::-webkit-scrollbar {
		width: 1.6rem;
	}

	/* 스크롤 바의 막대 */
	::-webkit-scrollbar-thumb {
		height: 40%;

		background-color: ${({ theme }) => theme.colorToken.Neutral.strong};
		background-clip: padding-box;
		border: 4px solid transparent;
		border-radius: 10px;
	}
`;

export default TimeDropdown;
