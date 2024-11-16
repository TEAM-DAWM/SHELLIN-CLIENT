import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { cloneElement, ReactElement } from 'react';

import color from '@/styles/color';
import { theme } from '@/styles/theme';

type SizeType = 'small' | 'big';
type IconBtnType = 'solid' | 'normal' | 'outlined';
type IconButtonProps = {
	type: IconBtnType;
	size: SizeType;
	disabled: boolean;
	Icon: ReactElement;
	onClick: () => void;
};

function IconButton({ type, size, disabled, Icon, onClick }: IconButtonProps) {
	const buttonSizes: Record<SizeType, SerializedStyles> = {
		big: css`
			width: 4rem;
			height: 4rem;
		`,
		small: css`
			width: 3.2rem;
			height: 3.2rem;
		`,
	};

	const getIconBtnStyles = (
		strokeColor: string,
		defaultBG: string,
		hoverBG: string,
		pressedBG: string,
		border: boolean
	) => {
		if (disabled) {
			return css`
				color: ${color.Grey.Grey4};
				${border &&
				css`
					border: solid 1px ${color.Grey.Grey4};
				`}
			`;
		}
		return css`
			background-color: ${defaultBG};

			${border &&
			css`
				border: solid 1px ${strokeColor};
			`}
			:hover {
				background-color: ${hoverBG};
			}

			:active {
				background-color: ${pressedBG};
			}
		`;
	};
	const buttonStyles: Record<IconBtnType, SerializedStyles> = {
		solid: getIconBtnStyles(color.Grey.White, color.Blue.Blue6, color.Blue.Blue7, color.Blue.Blue8, false),
		normal: getIconBtnStyles(color.Grey.Grey5, color.Grey.White, color.Grey.Grey2, color.Grey.Grey3, false),
		outlined: getIconBtnStyles(color.Grey.White, color.Grey.White, color.Grey.Grey2, color.Grey.Grey3, true),
	};

	const IconBtnContainer = styled.div`
		display: flex;
		${buttonSizes[size]}
		align-items: center;
		justify-content: center;

		border-radius: 8px;
		${buttonStyles[type]}
	`;

	const getIconColor = () => {
		switch (type) {
			case 'solid':
				return theme.color.Grey.White;

			case 'normal':
			case 'outlined':
				if (disabled) {
					return theme.color.Grey.Grey4;
				}
				return theme.color.Grey.Grey5;

			default:
				return theme.color.Grey.Grey4;
		}
	};

	return (
		<IconBtnContainer onClick={disabled ? () => {} : onClick}>
			{cloneElement(Icon, { color: getIconColor() })}
		</IconBtnContainer>
	);
}

export default IconButton;
