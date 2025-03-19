import styled from '@emotion/styled';

const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 3;
	width: 100vw;
	height: 100vh;

	background-color: ${({ theme }) => theme.color.Grey.Grey8};
	opacity: 0.2;
`;

export default ModalBackdrop;
