import Button from './Button';

import Icons from '@/assets/svg/index';

type CheckButtonProps = {
	label: string;
	size: 'small' | 'large';
	checked: boolean;
	onClick: () => void;
};

function CheckButton({ label, size, checked, onClick }: CheckButtonProps) {
	return (
		<Button
			type={checked ? 'text-primary' : 'text-assistive'}
			size={size}
			// TODO: 체크 아이콘으로 바꾸기
			leftIcon={checked ? <Icons.Navbar.IcnNavDashboard /> : <Icons.Navbar.IcnNavSetting />}
			disabled={false}
			label={label}
			onClick={onClick}
		/>
	);
}

export default CheckButton;
