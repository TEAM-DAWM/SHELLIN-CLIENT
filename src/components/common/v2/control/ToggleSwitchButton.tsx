import styled from '@emotion/styled';

type ToggleSwitchButtonProps = {
	active: boolean;
	onClick: () => void;
};

function ToggleSwitchButton({ active, onClick }: ToggleSwitchButtonProps) {
	return (
		<ToggleSlot active={active} onClick={onClick}>
			<ToggleCircle active={active} />
		</ToggleSlot>
	);
}
const ToggleCircle = styled.div<{ active: boolean }>`
	z-index: 1;
	width: 2rem;
	height: 2rem;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border: solid 2px ${({ theme, active }) => (active ? theme.color.Blue.Blue7 : theme.color.Grey.Grey4)};
	border-radius: 50%;
`;
const ToggleSlot = styled.div<{ active: boolean }>`
	display: flex;
	justify-content: ${(props) => (props.active ? 'flex-start' : 'flex-end')};
	width: 4.4rem;
	height: 2.4rem;

	background-color: ${({ theme, active }) => (active ? theme.color.Blue.Blue7 : theme.color.Grey.Grey4)};
	border-radius: 14px;
`;
export default ToggleSwitchButton;
