import styled from '@emotion/styled';

const CalendarStyle = styled.div`
	z-index: 5;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	align-items: center;
	box-sizing: border-box;
	width: 41.2rem;
	height: fit-content;
	padding: 2.4rem 2.4rem 3.2rem;
	overflow: auto;

	${({ theme }) => theme.shadow.FloatingAction1};
	border: 0;
	border-radius: 12px;
	/* stylelint-disable selector-class-pattern */

	.react-datepicker__month-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.react-datepicker__month {
		display: flex;
		flex-wrap: wrap;
		place-content: center center;
		gap: 0.6rem;
		margin: 0;
		margin-bottom: 1.9rem;
		${({ theme }) => theme.fontTheme.CAPTION_02};
	}

	/* 현재 달 안 보이게 */
	.react-datepicker__current-month {
		display: none;
	}

	.react-datepicker__header {
		width: 100%;
		padding: 0;

		background-color: transparent;
		border: 0;
	}

	.react-datepicker__day-names {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding-top: 1.6rem;
	}

	.react-datepicker__day-name {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5.2rem;
		height: 4rem;
		margin: 0;

		color: ${({ theme }) => theme.palette.Grey.Grey5};
		${({ theme }) => theme.font.label03};

		:first-of-type {
			color: ${({ theme }) => theme.palette.Orange.Orange6};
		}

		:last-of-type {
			color: ${({ theme }) => theme.colorToken.Text.primary};
		}
	}

	/** 주 날짜 */
	.react-datepicker__week {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	/* 선택된 날짜 */
	.react-datepicker__day {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5.2rem;
		height: 4rem;
		margin: 0;

		border-radius: 6px;

		${({ theme }) => theme.font.label03};
		:hover {
			background-color: ${({ theme }) => theme.colorToken.Primary.strongVariant};
		}
	}

	.react-datepicker__day--keyboard-selected {
		background-color: transparent;
	}

	.react-datepicker__day--today {
		color: ${({ theme }) => theme.colorToken.Primary.normal};
		text-decoration: underline;
	}

	.react-datepicker__day--selected {
		color: ${({ theme }) => theme.color.Grey.White};
		text-decoration: none;

		background-color: ${({ theme }) => theme.colorToken.Primary.normal};
		border-radius: 6px;

		:hover {
			background-color: ${({ theme }) => theme.colorToken.Primary.strong};
		}
	}

	.react-datepicker__day--in-selecting-range {
		color: ${({ theme }) => theme.palette.Grey.Grey7};

		background-color: ${({ theme }) => theme.palette.Blue.Blue2};
	}

	.react-datepicker__day--in-range {
		color: ${({ theme }) => theme.palette.Grey.Grey7};

		background-color: ${({ theme }) => theme.palette.Blue.Blue2};
	}

	.react-datepicker__day--range-start,
	.react-datepicker__day--selecting-range-start,
	.react-datepicker__day--range-end {
		color: ${({ theme }) => theme.palette.Grey.White};

		background-color: ${({ theme }) => theme.palette.Primary};
		border-radius: 6px;
	}

	/* 이번 월에 포함되지 않는 날짜 */
	.react-datepicker__day--outside-month {
		color: ${({ theme }) => theme.colorToken.Text.disable};
	}

	.react-datepicker__children-container {
		display: flex;
		justify-content: end;
		width: 100%;
		margin: 0;
		padding: 0;
	}

	/* stylelint-enable selector-class-pattern */

	::-webkit-scrollbar {
		width: 0.6rem;
	}

	::-webkit-scrollbar-thumb {
		width: 0.6rem;

		background-color: ${({ theme }) => theme.palette.Grey.Grey6};
		visibility: hidden;
		border-radius: 3px;
	}

	&:hover::-webkit-scrollbar-thumb {
		visibility: visible;
	}
`;

export default CalendarStyle;
