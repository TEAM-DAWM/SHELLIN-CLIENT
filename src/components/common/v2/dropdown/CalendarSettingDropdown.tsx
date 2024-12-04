import styled from '@emotion/styled';
import { useState } from 'react';

import CheckButton from '@/components/common/v2/control/CheckButton';
import { STATUS_OPTIONS } from '@/constants/statuses';

function CalendarSettingDropdown() {
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

	const handleStatusChange = (status: string) => {
		setSelectedStatus(status === selectedStatus ? null : status);
	};

	return (
		<CalendarSettingDropdownContainer>
			{STATUS_OPTIONS.map((option) => (
				<CheckButton
					key={option.value}
					label={option.label}
					onClick={() => handleStatusChange(option.value)}
					size="large"
					checked={selectedStatus === option.value}
				/>
			))}
		</CalendarSettingDropdownContainer>
	);
}

const CalendarSettingDropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	box-sizing: border-box;
	width: 16.8rem;
	height: 16rem;
	padding: 1.6rem 0.8rem;

	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

export default CalendarSettingDropdown;
