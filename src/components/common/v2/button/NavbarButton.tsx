import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Icn from '@/assets/svg/V2';
import Icon from '@/components/common/Icon';

type SizeType = 'small' | 'big';
type NavbarBtnType = 'solid' | 'normal' | 'outlined';
type NavbarButtonProps = {
	size?: SizeType;
	type: NavbarBtnType;
	disabled?: boolean;
	iconName: keyof typeof Icn;
	onClick?: () => void;
	additionalCss?: SerializedStyles;
	isActive?: boolean;
};

function NavbarButton({
	type,
	disabled = false,
	size = 'small',
	iconName,
	onClick,
	additionalCss,
	isActive,
}: NavbarButtonProps) {
	const { color, colorToken } = useTheme();

	// 아이콘 배경 색상 및 테두리
	const getIconBtnStyles = (
		strokeColor: string,
		defaultBG: string,
		hoverBG: string,
		pressedBG: string,
		border: boolean
	) => {
		if (disabled) {
			if (type === 'solid')
				return css`
					color: ${color.Grey.White};

					background-color: ${color.Blue.Blue2};
				`;
			return css`
				color: ${color.Grey.Grey4};
				${border &&
				css`
					box-sizing: border-box;

					border: solid 1px ${color.Grey.Grey3};
				`};
			`;
		}
		return css`
			color: ${strokeColor};

			background-color: ${defaultBG};
			cursor: pointer;

			${border &&
			css`
				box-sizing: border-box;

				border: solid 1px ${colorToken.Outline.neutralNormal};
			`}

			:hover {
				background-color: ${hoverBG};
			}

			:active {
				background-color: ${pressedBG};
			}
		`;
	};
	const buttonStyles: Record<NavbarBtnType, SerializedStyles> = {
		solid: getIconBtnStyles(color.Grey.White, color.Blue.Blue6, color.Blue.Blue7, color.Blue.Blue8, false),
		normal: getIconBtnStyles(color.Grey.Grey5, color.Grey.White, color.Grey.Grey2, color.Grey.Grey3, false),
		outlined: getIconBtnStyles(color.Grey.Grey5, color.Grey.White, color.Grey.Grey2, color.Grey.Grey3, true),
	};

	const NavbarBtnContainer = styled.div`
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 8px;
		${buttonStyles[type]}
		${additionalCss}
	`;
	const iconSize = size === 'big' ? 'large' : 'medium';

	return (
		<NavbarBtnContainer onClick={disabled ? () => {} : onClick}>
			<Icon name={iconName} stroke={isActive ? colorToken.Icon.primary : colorToken.Icon.normal} size={iconSize} />
		</NavbarBtnContainer>
	);
}

export default NavbarButton;
