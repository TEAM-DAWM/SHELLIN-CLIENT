import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

const BtnTaskContainer = styled.div<{ type: string }>`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: ${({ type }) => (type === 'staging' ? '56rem' : '61rem')};
	overflow: auto;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 0.6rem;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${theme.palette.Grey.Grey6};
		visibility: hidden;
		border-radius: 3px;
	}

	&:hover::-webkit-scrollbar-thumb {
		visibility: visible;
	}
`;

export default BtnTaskContainer;
