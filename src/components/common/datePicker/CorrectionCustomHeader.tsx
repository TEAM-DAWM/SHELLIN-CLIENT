import styled from '@emotion/styled';

import Button from '../v2/button/Button';
import IconButton from '../v2/IconButton';
import MainDate from '../v2/TextBox/MainDate';

interface CustomHeaderProps {
	selected: Date | null;
	decreaseMonth: () => void;
	increaseMonth: () => void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
	onChange: (date: Date | null) => void;
}

function CorrectionCustomHeader({
	selected,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
	onChange,
}: CustomHeaderProps) {
	const selectedDate = selected || new Date();
	const today = new Date();
	return (
		<HeaderLayout className="react-datepicker__header-custom">
			<IconButton iconName="IcnX" size="small" type="normal" disabled={false} onClick={() => {}} />
			<DateWrapper>
				<MainDate
					month={selectedDate.getUTCMonth() + 1}
					day={selectedDate.getUTCDate()}
					year={selectedDate.getUTCFullYear()}
				/>
			</DateWrapper>
			<div className="react-datepicker__navigation-wrapper">
				<BtnWrapper className="react-datepicker__navigation-container">
					<Button
						leftIcon="IcnCalendar"
						disabled={false}
						label="오늘"
						size="medium"
						type="outlined-assistive"
						onClick={() => onChange(today)}
					/>
					<IconButton
						iconName="IcnLeft"
						size="small"
						type="outlined"
						onClick={decreaseMonth}
						disabled={prevMonthButtonDisabled}
						aria-label="Previous Month"
						// className="react-datepicker__navigation react-datepicker__navigation--previous"
					/>
					<IconButton
						iconName="IcnRight"
						size="small"
						type="outlined"
						onClick={increaseMonth}
						disabled={nextMonthButtonDisabled}
						aria-label="Next Month"
						// className="react-datepicker__navigation react-datepicker__navigation--next"
					/>
				</BtnWrapper>
			</div>
		</HeaderLayout>
	);
}
const HeaderLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
`;
const DateWrapper = styled.div`
	align-self: flex-start;
	padding: 1.6rem 0 0.8rem;
`;
const BtnWrapper = styled.div`
	display: flex;
	gap: 0.8rem;
	justify-content: flex-end;
`;

export default CorrectionCustomHeader;
