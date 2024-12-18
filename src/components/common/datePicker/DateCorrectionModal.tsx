import styled from '@emotion/styled';
import { ko } from 'date-fns/locale';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Button from '../v2/button/Button';

import CorrectionCustomHeader from './CorrectionCustomHeader';
import CalendarStyle from './DatePickerStyle';

import formatDatetoString from '@/utils/formatDatetoString';
import { blurRef } from '@/utils/refStatus';

interface DateCorrectionModalProps {
	top?: number;
	left?: number;
	date: string | null;
	onClick: () => void;
	handleCurrentDate?: (newDate: Date) => void;
}

function DateCorrectionModal({ top = 0, left = 0, date, onClick, handleCurrentDate }: DateCorrectionModalProps) {
	const prevDate = date ? new Date(date) : null;
	const [currentDate, setCurrentDate] = useState<Date | null>(prevDate);
	const dateTextRef = useRef<HTMLInputElement>(null);

	const onChange = (newDate: Date | null) => {
		setCurrentDate(newDate);
		if (dateTextRef.current) {
			const inputElement = dateTextRef.current.querySelector('input');
			if (inputElement) inputElement.value = formatDatetoString(newDate);
			blurRef(dateTextRef);
		}
	};
	/** 모달 확인, 닫기버튼 */
	const onSave = () => {
		if (handleCurrentDate && currentDate) handleCurrentDate(currentDate);
		onClick();
	};
	return (
		<DateCorrectionModalLayout top={top} left={left} onClick={(e) => e.stopPropagation()}>
			<DatePicker
				locale={ko}
				selected={currentDate}
				onChange={onChange}
				inline
				calendarContainer={CalendarStyle}
				renderCustomHeader={(props) => (
					<CorrectionCustomHeader {...props} selected={currentDate} dateTextRef={dateTextRef} onChange={onChange} />
				)}
			>
				<BottomBtnWrapper>
					<Button label="확인" disabled={false} size="medium" type="solid" onClick={onSave} />
				</BottomBtnWrapper>
			</DatePicker>
		</DateCorrectionModalLayout>
	);
}

const DateCorrectionModalLayout = styled.div<{ top: number; left: number }>`
	position: absolute;
	top: ${({ top }) => top}rem;
	left: ${({ left }) => left}rem;
	z-index: 4;
`;

const BottomBtnWrapper = styled.div`
	padding-top: 3.2rem;
`;
export default DateCorrectionModal;
