import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

const BtnTaskContainer = styled.div<{ type: string }>`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 54rem;
	padding-left: 0.8rem;
	overflow: auto;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 0.6rem;
	}

	::-webkit-scrollbar-thumb {
		height: 45%;

		visibility: hidden;
		border-radius: 6px;
	}

	&:hover::-webkit-scrollbar-thumb {
		background-color: ${theme.colorToken.Neutral.accent};
		visibility: visible;
	}
`;

export default BtnTaskContainer;
