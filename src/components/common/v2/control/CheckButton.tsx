import Button from '../button/Button';

import Icn from '@/assets/svg/V2';

type CheckButtonProps = {
	label: string;
	size: 'small' | 'large';
	checked: boolean;
	onClick: () => void;
};

function CheckButton({ label, size = 'small', checked = false, onClick }: CheckButtonProps) {
	return (
		<Button
			type={checked ? 'text-primary' : 'text-assistive'}
			size={size}
			// TODO: 체크 아이콘으로 바꾸기
			leftIcon={checked ? <Icn.IcnAlert /> : <Icn.IcnAlert />}
			disabled={false}
			label={label}
			onClick={onClick}
		/>
	);
}

export default CheckButton;
