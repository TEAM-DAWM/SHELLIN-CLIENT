import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Icons from '@/assets/svg/V1/index';

interface EnterBtnProps {
	isDisabled?: boolean;
	onClick?: () => void;
}

function EnterBtn({ isDisabled = false, onClick }: EnterBtnProps) {
	return (
		<EnterBtnLayout isDisabled={isDisabled} disabled={isDisabled} onClick={onClick}>
			<StyledIcon />
		</EnterBtnLayout>
	);
}

export default EnterBtn;

const EnterBtnCss = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 4rem;
	height: 2.2rem;

	border-radius: 8px;
`;

const EnterBtnLayout = styled.button<{ isDisabled: boolean }>`
	${EnterBtnCss}
	color: ${({ theme }) => theme.palette.Grey.White};

	background-color: ${({ theme, isDisabled }) => (isDisabled ? theme.palette.Blue.Blue3 : theme.palette.Primary)};
	${({ theme, isDisabled }) =>
		!isDisabled &&
		`
		&:hover {
			background-color: ${theme.palette.Blue.Blue8};
			path {
			stroke: ${theme.palette.Blue.Blue2};
		}
		}
		&:active {
			background-color: ${theme.palette.Blue.Blue9};
			path {
			stroke: ${theme.palette.Blue.Blue4};
		}
		}
	`}
`;

const StyledIcon = styled(Icons.Arrow_up)`
	width: 1.6rem;
	height: 1.6rem;
`;
