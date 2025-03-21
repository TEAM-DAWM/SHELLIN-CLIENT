import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import IconButton from '../v2/IconButton';
import MainDate from '../v2/TextBox/MainDate';

type CalendarHeaderProps = {
	size: 'small' | 'big';
	date: { year: number; month: number };
	isCalendarPopupActive: boolean;
	isFilterPopupActive: boolean;
	handleCalendarPopup: () => void;
	handleFilterPopup: () => void;
	isFilterPopupDot: boolean;
};

function CalendarHeader({
	size,
	date,
	isCalendarPopupActive,
	isFilterPopupActive,
	handleCalendarPopup,
	handleFilterPopup,
	isFilterPopupDot,
}: CalendarHeaderProps) {
	const { color } = useTheme();

	const activeButtonStyle = css`
		color: ${color.Grey.Grey5};

		background-color: ${color.Grey.Grey3};

		${(isCalendarPopupActive || isFilterPopupActive) &&
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
					additionalCss={isCalendarPopupActive ? activeButtonStyle : undefined}
				/>
				<IconButton
					type="normal"
					size="small"
					iconName="IcnFilter"
					onClick={handleFilterPopup}
					additionalCss={isFilterPopupActive ? activeButtonStyle : undefined}
					dot={isFilterPopupDot}
				/>
			</CalendarHeaderWrapper>
		</CalendarHeaderContainer>
	);
}

export default CalendarHeader;

const CalendarHeaderContainer = styled.div<{ size: string }>`
	position: absolute;
	top: 5.6rem;
	z-index: 1;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	min-height: 3.2rem;
	padding: 0 2.4rem;
`;

const CalendarHeaderWrapper = styled.div`
	display: flex;
	gap: 17.8rem;
	margin-top: 0.2rem;

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;
