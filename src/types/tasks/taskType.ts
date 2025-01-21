export const STATUS = {
	NOT_DONE: '미완료',
	IN_PROGRESS: '진행 중',
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
