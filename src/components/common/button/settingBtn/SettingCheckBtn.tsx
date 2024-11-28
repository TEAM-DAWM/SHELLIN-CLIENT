import styled from '@emotion/styled';
import { FunctionComponent, SVGProps } from 'react';

import useUpdateTaskStatus from '@/apis/tasks/updateTaskStatus/query';
import Icons from '@/assets/svg/V1/index';
import { SettingLayout, smallIcon, bigIcon } from '@/components/common/button/settingBtn/settingBtnStyle';

const settingIconMap: Record<string, FunctionComponent<SVGProps<SVGSVGElement>>> = {
	complete: Icons.SettingIcons.SettingCheck1,
	check: Icons.SettingIcons.SettingCheck2,
	done: Icons.SettingIcons.SettingCheck3,
	progress: Icons.SettingIcons.SettingCheck4,
	close: Icons.SettingX,
};
interface SettingCheckBtnProps {
	size: 'small' | 'big';
	type: 'complete' | 'check' | 'done' | 'progress' | 'close';
	onClick?: () => void;
	isHover: boolean;
	isPressed: boolean;
	isActive: boolean;
	taskId?: number;
	targetDate?: string | null;
	handleIconMouseLeave?: () => void;
}

function SettingCheckBtn({
	size,
	type,
	onClick,
	isHover,
	isPressed,
	isActive,
	taskId,
	targetDate,
	handleIconMouseLeave,
}: SettingCheckBtnProps) {
	const IconComponent = settingIconMap[type];
	const { mutate: updateStatusMutate } = useUpdateTaskStatus(handleIconMouseLeave || null);
	const StyledSettingCheckIcon = styled(IconComponent)<{ size: string }>`
		${({ size }) => (size === 'small' ? smallIcon : bigIcon)};
	`;
	const handleClick = () => {
		if (onClick) onClick();

		// 태스크 상태변경 하는 경우
		if (taskId) {
			let statusType;
			switch (type) {
				case 'complete':
					statusType = '완료';
					break;
				case 'progress':
					statusType = '진행 중';
					break;
				default:
					statusType = '완료';
			}
			updateStatusMutate({ taskId, targetDate, status: statusType });
		}
	};
	return (
		<SettingLayout
			size={size}
			isFill={false}
			onClick={handleClick}
			isHover={isHover}
			isPressed={isPressed}
			isActive={isActive}
		>
			<StyledSettingCheckIcon size={size} />
		</SettingLayout>
	);
}

export default SettingCheckBtn;
