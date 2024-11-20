import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useIconHoverUtil from './useIconHoverUtil';

import Icons from '@/assets/svg/V1/index';
import StatusStagingBtn from '@/components/common/button/statusBtn/StatusStagingBtn';

type Props = {
	status?: string;
	taskId: number;
	targetDate: string | null;
};

function StagingIconHoverContainer({ status, taskId, targetDate }: Props) {
	const { iconHovered, iconClicked, handleIconClick, handleIconMouseEnter, handleIconMouseLeave } = useIconHoverUtil();

	const renderStatusButton = () => {
		if (status === '지연') {
			// 여기서 리턴하면 안됨. 이 경우엔 무조건 iconType === 'stagingOrDelayed' 이므로 호버 시 StatusStagingBtn가 떠야함
			if (iconHovered) {
				return <StatusStagingBtn taskId={taskId} targetDate={targetDate} />;
			}
			return <StagingIconHoverIndicator />;
		}

		if (!iconHovered && !iconClicked) {
			return <IconHoverIndicator />;
		}

		return <StatusStagingBtn taskId={taskId} targetDate={targetDate} />;
	};

	return (
		<IconHoverLayout onClick={handleIconClick} onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
			{renderStatusButton()}
		</IconHoverLayout>
	);
}

const IconHoverLayout = styled('div', { target: 'IconHoverContainer' })`
	display: flex;
	gap: 0.4rem;
	align-items: center;
	padding: 0 1.2rem 0 0.8rem;
`;

const IconHoverCss = css`
	display: flex;
	gap: 0.6rem;
	align-items: center;
	justify-content: center;
	width: 1.4rem;
	height: 1.4rem;
`;

const IconHoverIndicator = styled(Icons.Icn_hover_indicator, { target: 'IconHoverIndicator' })`
	${IconHoverCss}
`;

const StagingIconHoverIndicator = styled(Icons.Icn_hover_indicator)`
	${IconHoverCss}

	circle {
		stroke: ${({ theme }) => theme.palette.Orange.Orange8};
	}
`;
export default StagingIconHoverContainer;
