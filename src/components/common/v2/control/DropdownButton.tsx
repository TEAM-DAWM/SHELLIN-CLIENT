import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '../button/Button';

import StatusDropdown from '@/components/common/v2/dropdown/StatusDropdown';

// 추후 type 로 빼기
type TaskStatus = '미완료' | '진행중' | '완료';
type DropdownButtonProps = {
	status: TaskStatus;
	handleStatusChange: (newStatus: TaskStatus) => void;
	handleStatusEdit: (newStatus: TaskStatus) => void;
	isModalOpen: boolean;
};

function DropdownButton({ status, handleStatusChange, handleStatusEdit, isModalOpen }: DropdownButtonProps) {
	const { shadow } = useTheme();

	/** 임시 state */
	// open 은 이 컴포넌트 내부에서 다루어질 state 같아서 우선 props로 받지 않았습니다.
	// 필요하면 위치 변경 등 추가 작업 자유롭게 하세요
	const [isOpen, setOpen] = useState(false);

	const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
	};
	const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		setOpen((prev) => !prev);
	};

	const handleStatus = (newStatus: TaskStatus) => {
		handleStatusChange(newStatus);
		if (!isModalOpen) handleStatusEdit(newStatus);
		setOpen(false);
	};

	/** status에 따른 버튼 스타일 타입 설정 */
	const getDropdownBtnType = () => {
		switch (status) {
			case '미완료':
				return 'outlined-assistive';
			case '진행중':
				return 'solid';
			case '완료':
				return 'outlined-primary';

			default:
				return 'outlined-assistive';
		}
	};

	const customStyle = css`
		gap: 0;
		justify-content: space-between;
		width: 9.6rem;
		${isOpen && shadow.FloatingAction1}
	`;

	const iconType = isOpen ? 'IcnUp' : 'IcnDown';
	return (
		<DropdownWrapper>
			<button type="button" onMouseDown={handleMouseDown}>
				<Button
					type={getDropdownBtnType()}
					label={status}
					size="medium"
					disabled={false}
					rightIcon={iconType}
					additionalCss={customStyle}
					onClick={handleOpen}
				/>
				{isOpen && <StatusDropdown currentStatus={status} handleStatusChange={handleStatus} />}
			</button>
		</DropdownWrapper>
	);
}

const DropdownWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

export default DropdownButton;
