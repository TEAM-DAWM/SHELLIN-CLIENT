import styled from '@emotion/styled';

const ModalBackdropStyle = styled.div<{ isBackgroundColor: boolean }>`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 3;
	width: 100vw;
	height: 100vh;

	background-color: ${({ theme, isBackgroundColor }) => (isBackgroundColor ? theme.color.Grey.Grey8 : 'transparent')};
	opacity: ${({ isBackgroundColor }) => (isBackgroundColor ? 0.2 : 0)};
`;

interface ModalBackdropProps {
	isBackgroundColor?: boolean;
	onClick: React.MouseEventHandler<HTMLElement>;
	children?: React.ReactNode;
}

function ModalBackdrop({ isBackgroundColor = false, onClick, children }: ModalBackdropProps) {
	return (
		<ModalBackdropStyle isBackgroundColor={isBackgroundColor} onClick={onClick}>
			{children}
		</ModalBackdropStyle>
	);
}

export default ModalBackdrop;
