import { css, useTheme, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import Button from '@/components/common/v2/button/Button';
import formatToHHMM from '@/utils/formatTime';
import quarterTimes from '@/utils/generateQuarterTimes';

interface TimeDropdownProps {
	handleSelectTime: (time: string) => void;
	selectedTime: string;
}

function TimeDropdown({ handleSelectTime, selectedTime }: TimeDropdownProps) {
	const theme = useTheme();
	const selectedTimeRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (selectedTimeRef.current) {
			selectedTimeRef.current.scrollIntoView({
				behavior: 'instant',
				block: 'start',
			});

			if (containerRef.current) {
				containerRef.current.scrollTop -= 10;
			}
		}
	}, []);

	const formattedSelectedTime = formatToHHMM(selectedTime);

	return (
		<TimeDropdownContainer ref={containerRef}>
			{quarterTimes.map((time) => {
				const isSelected = time.startsWith(formattedSelectedTime);

				return (
					<div key={time} ref={isSelected ? selectedTimeRef : null}>
						<Button
							label={time}
							onClick={() => handleSelectTime(time)}
							size="large"
							type="text-assistive"
							additionalCss={btnCustomWidth(isSelected, theme)}
						/>
					</div>
				);
			})}
		</TimeDropdownContainer>
	);
}

const btnCustomWidth = (isSelected: boolean, theme: Theme) => css`
	background-color: ${isSelected ? theme.color.Grey.Grey3 : 'transparent'};
`;

const TimeDropdownContainer = styled.div`
	box-sizing: border-box;
	width: 16.8rem;
	height: 30rem;
	padding: 0.8rem;
	overflow-y: auto;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border-radius: 12px;

	${({ theme }) => theme.shadow.FloatingAction3};
	${({ theme }) => theme.fontTheme.LABEL_03};

	/* 스크롤바 전체 */
	::-webkit-scrollbar {
		width: 1.6rem;
	}

	/* 스크롤 바의 막대 */
	::-webkit-scrollbar-thumb {
		height: 45%;

		background-color: ${({ theme }) => theme.colorToken.Neutral.strong};
		background-clip: padding-box;
		border: 4px solid transparent;
		border-radius: 10px;
	}
`;

export default TimeDropdown;
