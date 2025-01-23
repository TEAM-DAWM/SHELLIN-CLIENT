import { SortOrderType } from '@/constants/sortType';

export interface StagingAreaSettingProps {
	handleTextBtnClick: (button: '전체' | '지연') => void;
	activeButton: '전체' | '지연';
	sortOrder: SortOrderType;
	handleSortOrder: (order: SortOrderType) => void;
}
