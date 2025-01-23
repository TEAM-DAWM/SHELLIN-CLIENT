import { css } from '@emotion/react';
import styled from '@emotion/styled';

import StatusInProgressBtn from '../button/statusBtn/StatusInProgressBtn';
import TodayPlusBtn from '../button/TodayPlusBtn';

import useIconHoverUtil from './useIconHoverUtil';

import Icons from '@/assets/svg/V1/index';

type Props = {
	dashBoardInprogress: boolean;
	taskId: number;
	targetDate: string | null;
};

function DashboardIconHoverContainer({ dashBoardInprogress, taskId, targetDate }: Props) {
	const { iconHovered, iconClicked, handleIconClick, handleIconMouseEnter, handleIconMouseLeave } = useIconHoverUtil();
	const renderStatusButton = () => {
		if (!iconHovered && !iconClicked) {
			return <IconHoverIndicator />;
		}

		if (dashBoardInprogress) {
			return <StatusInProgressBtn taskId={taskId} targetDate={targetDate} />;
		}

		return <TodayPlusBtn targetDate={targetDate} taskId={taskId} />;
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

export default DashboardIconHoverContainer;
