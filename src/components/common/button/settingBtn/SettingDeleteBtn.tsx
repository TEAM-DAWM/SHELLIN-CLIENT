import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { smallIcon, bigIcon, SettingCss, smallSize, bigSize } from './settingBtnStyle';

import Icons from '@/assets/svg/V1/index';

interface SettingDeleteBtnProps {
	size: 'small' | 'big';
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	isHover: boolean;
	isPressed: boolean;
	isActive: boolean;
}

function SettingDeleteBtn({ size, onClick, isHover, isPressed, isActive }: SettingDeleteBtnProps) {
	const StyledSettingDeleteIcon = styled(Icons.DeleteIcon)<{ size: string }>`
		${({ size }) => (size === 'small' ? smallIcon : bigIcon)}
	`;
	return (
		<SettingDeleteBtnLayout size={size} onClick={onClick} isHover={isHover} isPressed={isPressed} isActive={isActive}>
			<StyledSettingDeleteIcon size={size} />
		</SettingDeleteBtnLayout>
	);
}

export default SettingDeleteBtn;

const SettingDeleteBtnLayout = styled.button<{
	size: string;
	isHover: boolean;
	isPressed: boolean;
	isActive: boolean;
}>`
	flex-shrink: 0;

	${SettingCss}
	${({ size }) => (size === 'small' ? smallSize : bigSize)};
	background-color: ${({ theme }) => theme.palette.Orange.Orange2};

	${({ isHover, theme }) =>
		isHover &&
		css`
			&:hover {
				background-color: ${theme.palette.Orange.Orange4};
			}
		`}

	${({ isActive, theme }) =>
		isActive &&
		css`
			&:active {
				background-color: ${theme.palette.Secondary};

				path {
					stroke: ${theme.palette.Grey.White};
				}
			}
		`}

	${({ isPressed, theme }) =>
		isPressed &&
		css`
			background-color: ${theme.palette.Secondary};

			path {
				stroke: ${theme.palette.Grey.White};
			}
		`}
`;
