import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '../button/Button';

type ToggleLabelButtonProps = {
	active: boolean;
	firstLabel: string;
	secondLabel: string;
	onClick: () => void;
};

function ToggleLabelButton({ active, firstLabel, secondLabel, onClick }: ToggleLabelButtonProps) {
	const { color } = useTheme();
	const toggleBtnCss = css`
		justify-content: center;
		width: 100%;
	`;
	const disabledButtonCss = css`
		${toggleBtnCss}
		background-color: ${color.Grey.Grey3};
	`;
	return (
		<ToggleLabelButtonContainer onClick={onClick}>
			<Button
				disabled={false}
				label={firstLabel}
				size="medium"
				type="text-assistive"
				additionalCss={active ? toggleBtnCss : disabledButtonCss}
			/>
			<Button
				disabled={false}
				label={secondLabel}
				size="medium"
				type="text-assistive"
				additionalCss={!active ? toggleBtnCss : disabledButtonCss}
			/>
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

export default ToggleLabelButton;
