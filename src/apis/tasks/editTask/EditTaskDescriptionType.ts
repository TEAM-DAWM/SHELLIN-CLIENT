export interface EditTaskDescriptionType {
	taskId: number;
	name?: string;
	description?: string;
	deadLine?: {
		date: string | null;
		time: string | null;
	};
}
