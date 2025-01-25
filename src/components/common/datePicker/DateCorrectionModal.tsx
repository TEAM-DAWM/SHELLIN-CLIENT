import styled from '@emotion/styled';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Button from '../v2/button/Button';

import CorrectionCustomHeader from './CorrectionCustomHeader';
import CalendarStyle from './DatePickerStyle';

import useOutsideClick from '@/hooks/useOutsideClick';
import { formatDatetoString } from '@/utils/formatDateTime';
import { blurRef } from '@/utils/refStatus';

interface DateCorrectionModalProps {
	top?: number;
	left?: number;
	right?: number;
	date: string | null;
	onClick: () => void;
	handleCurrentDate?: (newDate: Date) => void;
}

function DateCorrectionModal({ top = 0, left, right, date, onClick, handleCurrentDate }: DateCorrectionModalProps) {
	const prevDate = date ? new Date(date) : null;
	const [currentDate, setCurrentDate] = useState<Date | null>(prevDate);
	const [isOutOfBounds, setIsOutOfBounds] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const dateTextRef = useRef<HTMLInputElement>(null);

	const onChange = (newDate: Date | null) => {
		setCurrentDate(newDate);
		if (dateTextRef.current) {
			const inputElement = dateTextRef.current.querySelector('input');
			if (inputElement) inputElement.value = formatDatetoString(newDate);
			blurRef(dateTextRef);
		}
	};
	/** 모달 확인버튼 */
	const onSave = () => {
		if (handleCurrentDate && currentDate) handleCurrentDate(currentDate);
		onClick();
	};
	/** 모달 닫기 */
	const onClose = () => {
		onClick();
	};

	useOutsideClick<HTMLDivElement>({ onClose });

	/** 화면 벗어나는 경우 bottom으로 고정 */
	useEffect(() => {
		const adjustPosition = () => {
			if (modalRef.current) {
				const rect = modalRef.current.getBoundingClientRect();
				if (rect.bottom > window.innerHeight) {
					setIsOutOfBounds(true);
				} else {
					setIsOutOfBounds(false);
				}
			}
		};

		adjustPosition();
		window.addEventListener('resize', adjustPosition);
		return () => window.removeEventListener('resize', adjustPosition);
	}, [top]);

	return (
		<DateCorrectionModalLayout
			ref={modalRef}
			top={top}
			left={left}
			right={right}
			isOutOfBounds={isOutOfBounds}
			onClick={(e) => e.stopPropagation()}
		>
			<DatePicker
				locale={ko}
				selected={currentDate}
				onChange={onChange}
				inline
				calendarContainer={CalendarStyle}
				renderCustomHeader={(props) => <CorrectionCustomHeader {...props} onChange={onChange} onClose={onClose} />}
			>
				<BottomBtnWrapper>
					<Button label="확인" disabled={false} size="medium" type="solid" onClick={onSave} />
				</BottomBtnWrapper>
			</DatePicker>
		</DateCorrectionModalLayout>
	);
}

const DateCorrectionModalLayout = styled.div<{
	top: number;
	left?: number;
	right?: number;
	isOutOfBounds: boolean;
}>`
	position: absolute;
	top: ${({ isOutOfBounds, top }) => (isOutOfBounds ? 'unset' : `${top}rem`)};
	bottom: ${({ isOutOfBounds }) => (isOutOfBounds ? '0rem' : 'unset')};
	z-index: 4;

	${({ left, right }) => {
		if (left !== undefined) {
			return `left: ${left}rem;`;
		}
		if (right !== undefined) {
			return `right: ${right}rem;`;
		}
		return `left: 0;`;
	}}
`;

const BottomBtnWrapper = styled.div`
	padding-top: 3.2rem;
`;
export default DateCorrectionModal;
