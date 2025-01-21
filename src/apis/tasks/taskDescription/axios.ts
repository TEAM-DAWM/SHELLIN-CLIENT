import { TaskDescriptionType } from './TaskDescriptionType';

import { privateInstance } from '@/apis/instance';
import { DetailedTaskType } from '@/types/tasks/taskType';

const taskDescription = async ({ taskId, targetDate }: TaskDescriptionType): Promise<DetailedTaskType> => {
	const { data } = await privateInstance.get(`/api/tasks/${taskId}`, {
		params: {
			targetDate,
		},
	});
	return data.data;
};

export default taskDescription;
