import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SettingCheckBtn from '../button/settingBtn/SettingCheckBtn';
import TodayPlusBtn from '../button/TodayPlusBtn';

import useIconHoverUtil from './useIconHoverUtil';

import Icons from '@/assets/svg/V1/index';
import StatusDoneBtn from '@/components/common/button/statusBtn/StatusDoneBtn';
import StatusInProgressBtn from '@/components/common/button/statusBtn/StatusInProgressBtn';
import StatusTodoBtn from '@/components/common/button/statusBtn/StatusTodoBtn';

type Props = {
	btnStatus?: string;
	taskId: number;
	targetDate: string | null;
};

function TargetIconHoverContainer({ btnStatus, taskId, targetDate }: Props) {
	const { iconHovered, iconClicked, handleIconClick, handleIconMouseEnter, handleIconMouseLeave } = useIconHoverUtil();

	const renderStatusButton = () => {
		switch (btnStatus) {
			case '완료':
				if (!iconHovered) {
					return (
						<SettingCheckBtn
							size="small"
							type="complete"
							isHover={iconHovered}
							isPressed
							isActive={iconClicked}
							taskId={taskId}
							targetDate={targetDate}
						/>
					);
				}
				return <StatusDoneBtn taskId={taskId} targetDate={targetDate} handleIconMouseLeave={handleIconMouseLeave} />;

			case '진행 중':
				if (!iconHovered) {
					return (
						<SettingCheckBtn
							size="small"
							type="progress"
							isHover={iconHovered}
							isPressed
							isActive={iconClicked}
							taskId={taskId}
							targetDate={targetDate}
						/>
					);
				}
				return (
					<StatusInProgressBtn targetDate={targetDate} taskId={taskId} handleIconMouseLeave={handleIconMouseLeave} />
				);

			case '미완료':
				if (!iconHovered) {
					return <IconHoverIndicator />;
				}
				return <StatusTodoBtn taskId={taskId} targetDate={targetDate} handleIconMouseLeave={handleIconMouseLeave} />;

			default:
				return <TodayPlusBtn taskId={taskId} targetDate={targetDate} />;
		}
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
export default TargetIconHoverContainer;
