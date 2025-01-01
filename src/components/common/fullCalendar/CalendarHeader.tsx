import styled from '@emotion/styled';

import IconButton from '../v2/IconButton';
import MainDate from '../v2/TextBox/MainDate';

type Props = {
	size: 'small' | 'big';
	date: { year: number; month: number };
};

function CalendarHeader({ size, date }: Props) {
	return (
		<CalendarHeaderContainer size={size}>
			<MainDate year={date.year} month={date.month} />
			<CalendarHeaderWrapper>
				<IconButton type="normal" size="small" iconName="IcnCalendar" />
				<IconButton type="normal" size="small" iconName="IcnFilter" />
			</CalendarHeaderWrapper>
		</CalendarHeaderContainer>
	);
}

export default CalendarHeader;

const CalendarHeaderContainer = styled.div<{ size: string }>`
	position: absolute;
	top: 56px;
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

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;
