import { css, SerializedStyles, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Icon from '../../Icon';

import Icn from '@/assets/svg/V2';

// 이후 타입 여러군데에서 필요하면 빼서 export
type SizeType = 'small' | 'medium' | 'large';
type ButtonType = 'solid' | 'outlined-primary' | 'outlined-assistive' | 'text-primary' | 'text-assistive';

type ButtonProps = {
	type: ButtonType;
	size: SizeType;
	disabled?: boolean;
	leftIcon?: keyof typeof Icn;
	rightIcon?: keyof typeof Icn;
	label: string;
	additionalCss?: SerializedStyles;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
	type,
	size = 'medium',
	disabled = false,
	leftIcon,
	rightIcon,
	label,
	additionalCss,
	onClick,
}: ButtonProps) {
	const { font, color } = useTheme();
	// 크기별 사이즈
	const buttonSizes: Record<SizeType, SerializedStyles> = {
		small: css`
			height: 2.4rem;
			${font.label05}
		`,
		medium: css`
			height: 3.2rem;
			${font.label04}
		`,
		large: css`
			height: 4rem;
			${font.label03}
		`,
	};

	// 버튼 type 별 스타일
	const getButtonStateStyles = (
		baseColor: string,
		bgColor: string,
		hoverColor: string,
		activeColor: string,
		border: boolean = true,
		borderColor?: string
	) => {
		if (disabled) {
			return css`
				color: ${color.Grey.Grey4};

				background-color: transparent;
				${border &&
				css`
					border: solid 1px ${color.Grey.Grey4};
				`}
			`;
		}
		return css`
			color: ${baseColor};

			background-color: ${bgColor};
			${border &&
			css`
				border: solid 1px ${borderColor || baseColor};
			`}

			:hover {
				background-color: ${hoverColor};
			}

			:active {
				background-color: ${activeColor};
			}
		`;
	};

	const buttonTypeStyle: Record<ButtonType, SerializedStyles> = {
		solid: css`
			color: ${disabled ? color.Grey.Grey4 : color.Grey.White};

			background-color: ${disabled ? color.Grey.Grey3 : color.Blue.Blue6};

			${!disabled &&
			css`
				:hover {
					background-color: ${color.Blue.Blue7};
				}

				:active {
					background-color: ${color.Blue.Blue8};
				}
			`}
		`,
		'outlined-primary': getButtonStateStyles(color.Blue.Blue7, color.Grey.White, color.Blue.Blue2, color.Blue.Blue3),
		'outlined-assistive': getButtonStateStyles(
			color.Grey.Grey6,
			color.Grey.White,
			color.Grey.Grey2,
			color.Grey.Grey3,
			true,
			color.Grey.Grey3
		),
		'text-primary': getButtonStateStyles(color.Blue.Blue7, 'transparent', color.Blue.Blue2, color.Blue.Blue3, false),
		'text-assistive': getButtonStateStyles(color.Grey.Grey6, 'transparent', color.Grey.Grey2, color.Grey.Grey3, false),
	};

	const ButtonLayout = styled.button`
		display: flex;
		gap: 0.8rem;
		align-items: center;
		box-sizing: border-box;
		${buttonSizes[size]};
		padding-right: 1.6rem;
		padding-left: 1.6rem;

		${buttonTypeStyle[type]}
		border-radius: 8px;

		${additionalCss}
	`;

	/** Button 사이즈에 따라 아이콘 사이즈 결정 */
	const iconSize: Record<SizeType, 'tiny' | 'small' | 'medium'> = {
		small: 'tiny',
		medium: 'small',
		large: 'medium',
	};

	return (
		<ButtonLayout onClick={disabled ? () => {} : onClick}>
			{leftIcon && <Icon name={leftIcon} size={iconSize[size]} />}
			{label}
			{rightIcon && <Icon name={rightIcon} size={iconSize[size]} />}
		</ButtonLayout>
	);
}

export default Button;
