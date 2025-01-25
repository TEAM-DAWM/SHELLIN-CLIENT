import styled from '@emotion/styled';

import ArrangeBtn from '../arrangeBtn/ArrangeBtn';
import TextboxInput from '../textbox/TextboxInput';

import DayDiffText from './DayDiffText';

import { formatDatetoString } from '@/utils/formatDateTime';
import { warnRef } from '@/utils/refStatus';

interface CustonHeaderProps {
	startDate: Date | null;
	endDate: Date | null;
	decreaseMonth: () => void;
	increaseMonth: () => void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
	onChange: (date: Date, mode: 'start' | 'end') => void;
	startDateTextRef: React.RefObject<HTMLInputElement>;
	endDateTextRef: React.RefObject<HTMLInputElement>;
}

function CustomHeader({
	startDate,
	endDate,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
	onChange,
	startDateTextRef,
	endDateTextRef,
}: CustonHeaderProps) {
	/** 일 차이 계산 */
	let diff = 0;
	if (endDate && startDate) {
		diff = Math.abs(endDate.getTime() - startDate.getTime());
		diff = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
	}
	const stripTime = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
	const onStartChange = (date: Date | null) => {
		if (date) {
			const strippedEndDate = endDate ? stripTime(endDate) : null;
			const strippedDate = stripTime(date);

			if (strippedEndDate && strippedEndDate < strippedDate) {
				warnRef(startDateTextRef);
				if (startDateTextRef.current) {
					Object.assign(startDateTextRef.current, { value: '' });
				}
			} else {
				onChange(date, 'start');
			}
		}
	};
	const onEndChange = (date: Date | null) => {
		if (date) {
			const strippedStartDate = startDate ? stripTime(startDate) : null;
			const strippedDate = stripTime(date);

			if (strippedStartDate && strippedDate < strippedStartDate) {
				warnRef(endDateTextRef);
				if (endDateTextRef.current) {
					Object.assign(endDateTextRef.current, { value: '' });
				}
			} else {
				onChange(date, 'end');
			}
		}
	};
	return (
		<div className="react-datepicker__header-custom">
			<InfoBox>
				<InfoWrapper>
					<TextboxInput
						variant="smallDate"
						placeholder={formatDatetoString(startDate)}
						onDateChange={onStartChange}
						dateTextRef={startDateTextRef}
					/>
					<TextboxInput
						variant="smallDate"
						placeholder={formatDatetoString(new Date())}
						onDateChange={onEndChange}
						dateTextRef={endDateTextRef}
					/>
				</InfoWrapper>
				<DayDiffText diff={diff} />
			</InfoBox>
			<div className="react-datepicker__navigation-wrapper">
				<BtnWrapper className="react-datepicker__navigation-container">
					<ArrangeBtn
						color="WHITE"
						mode="DEFAULT"
						size="small"
						type="left"
						className="react-datepicker__navigation react-datepicker__navigation--previous"
						onClick={decreaseMonth}
						disabled={prevMonthButtonDisabled}
						aria-label="Previous Month"
					/>
					<ArrangeBtn
						color="WHITE"
						mode="DEFAULT"
						size="small"
						type="right"
						className="react-datepicker__navigation react-datepicker__navigation--next"
						onClick={increaseMonth}
						disabled={nextMonthButtonDisabled}
						aria-label="Next Month"
					/>
				</BtnWrapper>
			</div>
		</div>
	);
}
const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const InfoWrapper = styled.div`
	display: flex;
	gap: 0.4rem;
`;
const InfoBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 20.4rem;
	padding-bottom: 0.6rem;
`;
export default CustomHeader;
