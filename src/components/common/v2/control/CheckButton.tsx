import Icon from '../../Icon';
import Button from '../button/Button';

type CheckButtonProps = {
	label: string;
	size: 'small' | 'large';
	checked: boolean;
	onClick: () => void;
};

function CheckButton({ label, size = 'small', checked = false, onClick }: CheckButtonProps) {
	const iconSize = size === 'small' ? 'tiny' : 'medium';
	const iconType = checked ? 'IcnCheck' : 'IcnSquare';
	return (
		<Button
			type={checked ? 'text-primary' : 'text-assistive'}
			size={size}
			leftIcon={<Icon name={iconType} size={iconSize} />}
			disabled={false}
			label={label}
			onClick={onClick}
		/>
	);
}

export default CheckButton;
