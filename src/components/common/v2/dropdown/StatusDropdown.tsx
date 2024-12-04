import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';

const STATUSES = {
	INCOMPLETE: '미완료',
	IN_PROGRESS: '진행중',
	COMPLETED: '완료',
};

interface StatusDropdownProps {
	currentStatus: string;
}

function StatusDropdown({ currentStatus }: StatusDropdownProps) {
	// 현재 상태를 제외한 나머지 상태 필터링
	const visibleStatuses = Object.values(STATUSES).filter((status) => status !== currentStatus);

	return (
		<StatusDropdownContainer>
			{visibleStatuses.map((status) => (
				<Button
					key={status}
					label={status}
					onClick={() => {}}
					size="large"
					type={status === STATUSES.COMPLETED ? 'text-primary' : 'text-assistive'}
					disabled={false}
				/>
			))}
		</StatusDropdownContainer>
	);
}

const StatusDropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	box-sizing: border-box;
	width: 10.4rem;
	height: 11rem;
	padding: 0.8rem;

	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

export default StatusDropdown;
