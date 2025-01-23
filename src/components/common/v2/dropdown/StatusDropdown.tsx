import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import { STATUSES } from '@/constants/statuses';

type Status = (typeof STATUSES)[keyof typeof STATUSES];

interface StatusDropdownProps {
	currentStatus: Status;
	handleStatusChange: (newStatus: Status) => void;
}

function StatusDropdown({ currentStatus, handleStatusChange }: StatusDropdownProps) {
	// 현재 상태를 제외한 나머지 상태 필터링
	const visibleStatuses = Object.values(STATUSES).filter((status) => status !== currentStatus);

	return (
		<StatusDropdownContainer>
			{visibleStatuses.map((status) => (
				<Button
					key={status}
					label={status}
					onClick={() => handleStatusChange(status)}
					size="large"
					type={status === STATUSES.COMPLETED ? 'text-primary' : 'text-assistive'}
				/>
			))}
		</StatusDropdownContainer>
	);
}

const StatusDropdownContainer = styled.div`
	position: absolute;
	top: calc(100% + 4px);
	left: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	box-sizing: border-box;
	width: 10.4rem;
	height: 11rem;
	padding: 0.8rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

export default StatusDropdown;
