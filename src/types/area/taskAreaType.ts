import { SortOrderType } from '@/constants/sortType';
import { TaskType } from '@/types/tasks/taskType';

// 공통
export interface BaseTaskAreaProps {
	tasks: TaskType[];
	sortOrder: SortOrderType;
	handleSortOrder: (order: SortOrderType) => void;
	targetDate: string;
}

// StagingArea 관련 속성
export interface StagingAreaSettingProps {
	isStagingOpen: boolean;
}

// TargetArea 관련 속성
export interface TargetControlProps {
	onClickPrevDate: () => void;
	onClickNextDate: () => void;
	onClickTodayDate: () => void;
	onClickDatePicker: (target: Date) => void;
}

export interface StagingAreaProps extends BaseTaskAreaProps, StagingAreaSettingProps {}

export interface TargetAreaProps extends BaseTaskAreaProps, TargetControlProps {}
