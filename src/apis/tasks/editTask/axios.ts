import { EditTaskDescriptionType } from './EditTaskDescriptionType';

import { privateInstance } from '@/apis/instance';

const editTaskDescription = async ({ taskId, name, description, deadLine }: EditTaskDescriptionType) => {
	const request = {
		name,
		description,
		deadLine: deadLine ?? null,
	};

	const { data } = await privateInstance.patch(`/api/tasks/${taskId}`, request);
	return data;
};

export default editTaskDescription;
