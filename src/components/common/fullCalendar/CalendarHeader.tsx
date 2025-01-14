import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import IconButton from '../v2/IconButton';
import MainDate from '../v2/TextBox/MainDate';

type CalendarHeaderProps = {
	size: 'small' | 'big';
	date: { year: number; month: number };
	isActive: boolean;
	handleCalendarPopup: () => void;
	handleFilterPopup: () => void;
};

function CalendarHeader({ size, date, isActive, handleCalendarPopup, handleFilterPopup }: CalendarHeaderProps) {
	const { color } = useTheme();

	const activeButtonStyle = css`
		color: ${color.Grey.Grey5};

		background-color: ${color.Grey.Grey3};

		${isActive &&
		css`
			:hover {
				color: ${color.Grey.Grey5};

				background-color: ${color.Grey.Grey3};
			}
		`}
	`;

	return (
		<CalendarHeaderContainer size={size}>
			<MainDate year={date.year} month={date.month} />
			<CalendarHeaderWrapper>
				<IconButton
					type="normal"
					size="small"
					iconName="IcnCalendar"
					onClick={handleCalendarPopup}
					additionalCss={isActive ? activeButtonStyle : undefined}
				/>
				<IconButton
					type="normal"
					size="small"
					iconName="IcnFilter"
					onClick={handleFilterPopup}
					additionalCss={isActive ? activeButtonStyle : undefined}
				/>
			</CalendarHeaderWrapper>
		</CalendarHeaderContainer>
	);
}

export default CalendarHeader;

const CalendarHeaderContainer = styled.div<{ size: string }>`
	position: absolute;
	top: 56px;
	z-index: 1;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	height: auto;
	padding: ${({ size }) => (size === 'big' ? '0 2.4rem;' : '0 1.6rem 0 2.4rem;')};
`;

const CalendarHeaderWrapper = styled.div`
	display: flex;
	gap: 194px;
	margin-top: 0.2rem;

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;
