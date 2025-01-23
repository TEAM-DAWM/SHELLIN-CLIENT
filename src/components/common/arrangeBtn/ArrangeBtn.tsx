import styled from '@emotion/styled';
import { FunctionComponent, SVGProps } from 'react';

import { bigSize, smallSize } from './arrangeBtnStyle';

import Icons from '@/assets/svg/V1/index';
import { ArrangeBtnType } from '@/types/arrangeBtnType';

const iconMap: Record<string, FunctionComponent<SVGProps<SVGSVGElement>>> = {
	right: Icons.ArrangeBtn.IcnArrangeRight,
	left: Icons.ArrangeBtn.IcnArrangeLeft,
	set: Icons.ArrangeBtn.IcnArrangeSet,
	calendar: Icons.ArrangeBtn.IcnArrangeCalendar,
};
function ArrangeBtn({ type, mode, color, size, onClick }: ArrangeBtnType) {
	const IconComponent = iconMap[type];
	const StyledIcon = styled(IconComponent)<{ size: string; color: string; mode: string }>`
		${({ size }) => (size === 'small' ? smallSize : bigSize)};
		path {
			stroke: ${({ theme }) => theme.button[color][mode].ICON};
		}

		rect {
			fill: ${({ theme }) => theme.button[color][mode].BG};
		}

		&:hover {
			path {
				stroke: ${({ theme }) => theme.button[color].HOVER.ICON};
			}

			rect {
				fill: ${({ theme }) => theme.button[color].HOVER.BG};
			}
		}

		&:active {
			path {
				stroke: ${({ theme }) => theme.button[color].PRESSED.ICON};
			}

			rect {
				fill: ${({ theme }) => theme.button[color].PRESSED.BG};
			}
		}
	`;

	return <StyledIcon size={size} color={color} mode={mode} onClick={onClick} />;
}

export default ArrangeBtn;
