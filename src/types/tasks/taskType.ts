export const STATUS = {
	NOT_DONE: '미완료',
	IN_PROGRESS: '진행중',
	COMPLETE: '완료',
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
export interface TaskType {
	id: number;
	name: string;
	deadLine?: {
		date?: string | null;
		time?: string | null;
	};
	status: StatusType;
}
export interface DetailedTaskType {
	name: string;
	description: string;
	deadLine: {
		date: string | null;
		time: string | null;
	};
	status: StatusType;
	timeBlock: {
		id: number;
		startTime: string;
		endTime: string;
	};
}
