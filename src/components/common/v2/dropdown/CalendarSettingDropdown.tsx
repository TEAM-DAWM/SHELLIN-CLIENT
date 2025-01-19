import styled from '@emotion/styled';
import { useState } from 'react';

import CheckButton from '@/components/common/v2/control/CheckButton';
import { STATUS_OPTIONS, STATUSES } from '@/constants/statuses';

type CalendarSettingDropdownProps = {
	top?: number;
	right?: number;
};

function CalendarSettingDropdown({ top = 0, right = 0 }: CalendarSettingDropdownProps) {
	const [selectedStatuses, setSelectedStatuses] = useState<(keyof typeof STATUSES)[]>([]);

	/** TODO: get api 연결하면 됨. */
	// const { mutate: getMutate } = useGetTimeBlock();
	//
	// useEffect(() => {
	// 	** get api 요청 **
	// 	useGetTimeBlock()
	// 	if (selectedStatuses.length > 0) {
	// 		fetchData();
	// 	}
	// }, [selectedStatuses]);

	const handleStatusChange = (status: keyof typeof STATUSES) => {
		setSelectedStatuses((prevStatuses) =>
			prevStatuses.includes(status) ? prevStatuses.filter((s) => s !== status) : [...prevStatuses, status]
		);
	};

	return (
		<CalendarSettingDropdownContainer top={top} right={right}>
			{STATUS_OPTIONS.map((option) => (
				<CheckButton
					key={option.value}
					label={option.label}
					onClick={() => handleStatusChange(option.value as keyof typeof STATUSES)}
					size="large"
					checked={selectedStatuses.includes(option.value as keyof typeof STATUSES)}
				/>
			))}
		</CalendarSettingDropdownContainer>
	);
}

const CalendarSettingDropdownContainer = styled.div<{ top: number; right: number }>`
	position: absolute;
	top: ${({ top }) => top}rem;
	right: ${({ right }) => right}rem;
	z-index: 2;

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
