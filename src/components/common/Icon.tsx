import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import Icn from '@/assets/svg/V2';

type IconProps = {
	name: keyof typeof Icn;
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
	color?: 'nomal' | 'strong' | 'heavy' | 'primary' | 'inverse';
	onClick?: () => void;
	isCursor?: boolean;
	stroke?: string;
};

function Icon({ name, size = 'medium', color, onClick, isCursor, stroke }: IconProps) {
	const SelectedIcon = Icn[name];
	return (
		<StyledIconWrapper size={size} color={color} onClick={onClick} isCursor={isCursor} stroke={stroke}>
			<SelectedIcon stroke={stroke} />
		</StyledIconWrapper>
	);
}

export default Icon;

const sizeMap = {
	tiny: '1.6rem',
	small: '2rem',
	medium: '2.4rem',
	large: '3.2rem',
	xlarge: '4rem',
};

const getColorMap = (theme: Theme) => ({
	nomal: theme.colorToken.Icon.normal,
	strong: theme.colorToken.Icon.strong,
	heavy: theme.colorToken.Icon.heavy,
	primary: theme.colorToken.Icon.heavy,
	inverse: theme.colorToken.Icon.inverse,
});

const StyledIconWrapper = styled.div<{
	size: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
	color?: 'nomal' | 'strong' | 'heavy' | 'primary' | 'inverse';
	isCursor?: boolean;
	stroke?: string;
	fill?: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ size }) => sizeMap[size]};
	height: ${({ size }) => sizeMap[size]};

	${({ isCursor }) => isCursor && `cursor: pointer;`}

	svg {
		width: 100%;
		height: 100%;

		${({ theme, color }) => color && `color: ${getColorMap(theme)[color]};`}
		${({ stroke }) => stroke && `stroke: ${stroke};`}
	}
`;
