import styled from '@emotion/styled';
import { useState } from 'react';

import DateCorrectionModal from '@/components/common/datePicker/DateCorrectionModal';
import Icon from '@/components/common/Icon';
import { formatDateWithDay } from '@/utils/formatDateTime';

interface DateBtnProps {
	isAllday: boolean;
	isEditMode: boolean;
	startTime?: string;
	endTime: string;
	date: Date;
	handleDate: (newDate: Date) => void;
}

function DateBtn({ isAllday, isEditMode, startTime, endTime, date, handleDate }: DateBtnProps) {
	const [isOpen, setIsOpen] = useState(false);

	const renderTimeText = () => {
		if (isAllday) return null;
		if (startTime && endTime) {
			return `${startTime}-${endTime}`;
		}
		if (endTime) {
			return `${endTime} 까지`;
		}
		return null;
	};

	const onClickDateBtn = () => {
		if (isEditMode) setIsOpen((prev) => !prev);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};

	const handleCurrentDate = (newDate: Date) => {
		handleDate(newDate);
		setIsOpen(false);
	};

	const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsOpen(false);
		}
	};

	return (
		<DateWrapper onBlur={handleBlur} tabIndex={-1}>
			<DateBtnLayout onClick={onClickDateBtn} isActive={isOpen}>
				<Icon name={isEditMode ? 'IcnCalendar' : 'IcnModify'} size="tiny" color="nomal" />
				<TextBox>
					{formatDateWithDay(date)} {!isEditMode && renderTimeText()}
				</TextBox>
			</DateBtnLayout>
			{isOpen && (
				<DropdownStyle tabIndex={-1}>
					<DateCorrectionModal
						date={formatDateWithDay(date)}
						onClick={handleModalClose}
						handleCurrentDate={handleCurrentDate}
						top={0.8}
					/>
				</DropdownStyle>
			)}
		</DateWrapper>
	);
}

const DateWrapper = styled.div`
	position: relative;
`;

const DateBtnLayout = styled.button<{ isActive: boolean }>`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	justify-content: center;
	width: auto;
	height: 3.2rem;
	padding: 0 1.6rem;

	background-color: ${({ theme, isActive }) => (isActive ? theme.color.Grey.Grey3 : theme.colorToken.Neutral.normal)};
	border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	border-radius: 8px;

	:hover {
		background-color: ${({ theme, isActive }) => (isActive ? theme.color.Grey.Grey3 : theme.color.Grey.Grey2)};
	}
`;

const TextBox = styled.p`
	width: auto;
	height: 1.4rem;

	color: ${({ theme }) => theme.colorToken.Text.assistive};
	${({ theme }) => theme.font.label05};
	font-weight: 500;
`;

const DropdownStyle = styled.div`
	position: absolute;
	z-index: 3;
`;

export default DateBtn;
