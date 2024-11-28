import styled from '@emotion/styled';

import Icn from '@/assets/svg/V2';

type IconProps = {
	name: keyof typeof Icn;
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
};

function Icon({ name, size = 'medium' }: IconProps) {
	const SelectedIcon = Icn[name];
	return (
		<StyledIconWrapper size={size}>
			<SelectedIcon />
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
const StyledIconWrapper = styled.div<{ size: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge' }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ size }) => sizeMap[size]};
	height: ${({ size }) => sizeMap[size]};

	svg {
		width: 100%;
		height: 100%;
	}
`;
