import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import TextBtn from '../button/textBtn/TextBtn';
import ModalBackdrop from '../modal/ModalBackdrop';

import CustomHeader from './CustomHeader';
import CalendarStyle from './DatePickerStyle';

import { formatDatetoString } from '@/utils/formatDateTime';
import { blurRef } from '@/utils/refStatus';

interface DatePickerCustomProps {
	isOpen: boolean;
	onClose: () => void;
	startDate: Date | null;
	endDate: Date | null;
	handleConfirmDates: (startDate: Date | null, endDate: Date | null) => void; // 확정된 날짜를 전달하는 함수
}

function DatePickerCustom({
	isOpen,
	onClose,
	startDate: initialStartDate,
	endDate: initialEndDate,
	handleConfirmDates,
}: DatePickerCustomProps) {
	// 내부 상태로 선택 중인 날짜를 관리
	const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
	const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
	const startDateTextRef = useRef<HTMLInputElement>(null);
	const endDateTextRef = useRef<HTMLInputElement>(null);

	const inputElementOfRef = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) {
			const inputElement = ref.current.querySelector('input');
			if (inputElement) {
				return inputElement;
			}
		}
		return false;
	};

	useEffect(() => {
		setStartDate(initialStartDate);
		setEndDate(initialEndDate);
	}, [initialStartDate, initialEndDate]);

	const onChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start); // 내부 상태 업데이트
		setEndDate(end); // 내부 상태 업데이트
		blurRef(startDateTextRef);

		const startInputEle = inputElementOfRef(startDateTextRef);
		if (startInputEle) {
			startInputEle.value = formatDatetoString(start);
		}

		const endInputEle = inputElementOfRef(endDateTextRef);
		if (start && end === null) {
			if (endInputEle) {
				endInputEle.value = '';
				endInputEle.placeholder = '마감 날짜';
			}
		}

		if (endInputEle) endInputEle.value = formatDatetoString(end);
		blurRef(endDateTextRef);
	};

	const onDateChange = (date: Date, mode: 'start' | 'end') => {
		if (mode === 'start') {
			blurRef(startDateTextRef);
			setStartDate(date); // 내부 상태 업데이트
		} else {
			blurRef(endDateTextRef);
			setEndDate(date); // 내부 상태 업데이트
		}
	};

	const handleConfirm = () => {
		handleConfirmDates(startDate, endDate); // 부모 컴포넌트에 확정된 날짜 전달
		onClose();
	};
	return (
		isOpen && (
			<>
				<DatePicker
					locale={ko}
					selected={startDate}
					onChange={onChange}
					startDate={startDate as Date | undefined}
					endDate={endDate as Date | undefined}
					selectsRange
					inline
					calendarContainer={CalendarStyle}
					renderCustomHeader={(props) => (
						<CustomHeader
							{...props}
							startDate={startDate}
							endDate={endDate}
							onChange={onDateChange}
							startDateTextRef={startDateTextRef}
							endDateTextRef={endDateTextRef}
						/>
					)}
				>
					<TextBtn text="확인" color="BLACK" size="small" mode="DEFAULT" isHover isPressed onClick={handleConfirm} />
				</DatePicker>
				<ModalBackdrop onClick={onClose} />
			</>
		)
	);
}
export default DatePickerCustom;
