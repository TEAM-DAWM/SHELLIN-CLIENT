export const STATUSES = {
	INCOMPLETE: '미완료',
	IN_PROGRESS: '진행 중',
	COMPLETED: '완료',
} as const;

export const STATUS_OPTIONS = [
	{ label: STATUSES.INCOMPLETE, value: 'INCOMPLETE' },
	{ label: STATUSES.IN_PROGRESS, value: 'IN_PROGRESS' },
	{ label: STATUSES.COMPLETED, value: 'COMPLETED' },
];
