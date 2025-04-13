import styled from '@emotion/styled';

import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import CheckButton from '@/components/common/v2/control/CheckButton';
import { STATUS_OPTIONS, STATUSES } from '@/constants/statuses';

type CalendarSettingDropdownProps = {
	top?: number;
	right?: number;
	selectedStatuses: (typeof STATUSES)[keyof typeof STATUSES][];
	handleStatusChange: (status: (typeof STATUSES)[keyof typeof STATUSES]) => void;
	handleFilterPopup: () => void;
};

function CalendarSettingDropdown({
	top = 0,
	right = 0,
	selectedStatuses,
	handleStatusChange,
	handleFilterPopup,
}: CalendarSettingDropdownProps) {
	return (
		<>
			<CalendarSettingDropdownContainer top={top} right={right}>
				{STATUS_OPTIONS.map((option) => (
					<CheckButton
						key={option.value}
						label={option.label}
						onClick={() => handleStatusChange(option.label as (typeof STATUSES)[keyof typeof STATUSES])}
						size="large"
						checked={selectedStatuses.includes(option.label as (typeof STATUSES)[keyof typeof STATUSES])}
					/>
				))}
			</CalendarSettingDropdownContainer>
			<ModalBackdrop onClick={handleFilterPopup} />
		</>
	);
}

const CalendarSettingDropdownContainer = styled.div<{ top: number; right: number }>`
	position: absolute;
	top: ${({ top }) => top}rem;
	right: ${({ right }) => right}rem;
	z-index: 4;

	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	box-sizing: border-box;
	width: 16.8rem;
	height: auto;
	padding: 1.6rem 0.8rem;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

export default CalendarSettingDropdown;
