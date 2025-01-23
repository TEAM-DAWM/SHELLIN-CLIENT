import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Icon from '../Icon';

import Icn from '@/assets/svg/V2';

type SizeType = 'small' | 'big';
type IconBtnType = 'solid' | 'normal' | 'outlined';
type IconButtonProps = {
	type: IconBtnType;
	size?: SizeType;
	disabled?: boolean;
	iconName: keyof typeof Icn;
	onClick?: () => void;
	additionalCss?: SerializedStyles;
	dot?: boolean;
};

function IconButton({
	type,
	size = 'small',
	disabled = false,
	iconName,
	onClick,
	additionalCss,
	dot,
}: IconButtonProps) {
	const { color, colorToken } = useTheme();
	// 사이즈별 분기
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
	const buttonStyles: Record<IconBtnType, SerializedStyles> = {
		solid: getIconBtnStyles(color.Grey.White, color.Blue.Blue6, color.Blue.Blue7, color.Blue.Blue8, false),
		normal: getIconBtnStyles(color.Grey.Grey5, color.Grey.White, color.Grey.Grey2, color.Grey.Grey3, false),
		outlined: getIconBtnStyles(color.Grey.Grey5, color.Grey.White, color.Grey.Grey2, color.Grey.Grey3, true),
	};

	const IconBtnContainer = styled.div`
		position: relative;
		display: flex;
		${buttonSizes[size]}
		align-items: center;
		justify-content: center;

		border-radius: 8px;
		${buttonStyles[type]}
		${additionalCss}
	`;

	const iconSize = size === 'big' ? 'large' : 'medium';
	return (
		<IconBtnContainer onClick={disabled ? () => {} : onClick}>
			{dot && <Dot />}
			<Icon name={iconName} size={iconSize} />
		</IconBtnContainer>
	);
}

const Dot = styled.div`
	position: absolute;
	top: 0.2rem;
	right: 0.2rem;
	width: 0.4rem;
	height: 0.4rem;

	background-color: ${({ theme }) => theme.colorToken.Primary.normal};
	border-radius: 4px;
`;
export default IconButton;
