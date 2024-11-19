import styled from '@emotion/styled';

type ToggleLabelButtonProps = {
	active: boolean;
	firstLabel: string;
	secondLabel: string;
	onClick: () => void;
};

function ToggleLabelButton({ active, firstLabel, secondLabel, onClick }: ToggleLabelButtonProps) {
	return (
		<ToggleLabelButtonContainer onClick={onClick}>
			<ToggleBtn active={active}>{firstLabel}</ToggleBtn>
			<ToggleBtn active={!active}>{secondLabel}</ToggleBtn>
		</ToggleLabelButtonContainer>
	);
}
const ToggleLabelButtonContainer = styled.div`
	display: flex;
	width: 16rem;
	height: 3.2rem;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border: solid 1px ${({ theme }) => theme.color.Grey.Grey3};
	border-radius: 8px;
`;

const ToggleBtn = styled.div<{ active: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	color: ${({ theme }) => theme.color.Grey.Grey7};

	background-color: ${({ active, theme }) => (active ? theme.color.Grey.White : theme.color.Grey.Grey3)};
	border-radius: 8px;
	${({ theme }) => theme.font.label04};
`;
export default ToggleLabelButton;
