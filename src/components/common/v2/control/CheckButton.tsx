import Button from '../button/Button';

type CheckButtonProps = {
	label: string;
	size: 'small' | 'large';
	checked: boolean;
	onClick: () => void;
};

function CheckButton({ label, size = 'small', checked = false, onClick }: CheckButtonProps) {
	const iconType = checked ? 'IcnCheck' : 'IcnSquare';
	return (
		<Button
			type={checked ? 'text-primary' : 'text-assistive'}
			size={size}
			leftIcon={iconType}
			disabled={false}
			label={label}
			onClick={onClick}
		/>
	);
}

export default CheckButton;
