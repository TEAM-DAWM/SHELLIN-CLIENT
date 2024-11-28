import { css, useTheme } from '@emotion/react';
import { useState } from 'react';

import Icon from '../../Icon';
import Button from '../button/Button';

// 추후 type 로 빼기
type TaskStatus = '미완료' | '진행중' | '완료';
type DropdownButtonProps = {
	status: TaskStatus;
};

function DropdownButton({ status }: DropdownButtonProps) {
	const { shadow } = useTheme();

	/** 임시 state */
	// open 은 이 컴포넌트 내부에서 다루어질 state 같아서 우선 props로 받지 않았습니다.
	// 필요하면 위치 변경 등 추가 작업 자유롭게 하세요
	const [isOpen, setOpen] = useState(false);
	const handleOpen = () => setOpen((prev) => !prev);
	/** 임시 state */

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
		justify-content: space-between;
		width: 9.6rem;
		${isOpen && shadow.FloatingAction1}
	`;

	const iconType = isOpen ? 'IcnUp' : 'IcnDown';
	return (
		<Button
			type={getDropdownBtnType()}
			label={status}
			size="medium"
			disabled={false}
			rightIcon={<Icon name={iconType} size="small" />}
			additionalCss={customStyle}
			onClick={handleOpen}
		/>
	);
}

export default DropdownButton;
