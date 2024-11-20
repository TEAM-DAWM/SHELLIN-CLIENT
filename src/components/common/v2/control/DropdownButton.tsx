import styled from '@emotion/styled';

import Button from './button/Button';

import Icons from '@/assets/svg/index';

// 추후 type 로 빼기
type TaskStatus = '미완료' | '진행중' | '완료';
type DropdownButtonProps = {
	status: TaskStatus;
};

function DropdownButton({ status }: DropdownButtonProps) {
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

	return (
		<SizedDropDownButton
			type={getDropdownBtnType()}
			label={status}
			size="medium"
			disabled={false}
			rightIcon={<Icons.Navbar.IcnNavDashboard />}
		/>
	);
}

// 적용안됨
const SizedDropDownButton = styled(Button)`
	width: 9.6rem;
	${({ theme }) => theme.shadow.FloatingAction1};
`;
export default DropdownButton;
