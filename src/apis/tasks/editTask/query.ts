import { useMutation, useQueryClient } from '@tanstack/react-query';

import editTaskDescription from '@/apis/tasks/editTask/axios';
import { EditTaskDescriptionType } from '@/apis/tasks/editTask/EditTaskDescriptionType';

const usePatchTaskDescription = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ taskId, name, description, deadLine }: EditTaskDescriptionType) =>
			editTaskDescription({
				taskId,
				name,
				description,
				deadLine,
			}),
	});

	return { mutate: mutation.mutate, queryClient };
};

export default usePatchTaskDescription;
