import { useMutation, useQueryClient } from '@tanstack/react-query';

import editTaskDescription from '@/apis/tasks/editTask/axios';
import { EditTaskDescriptionType } from '@/apis/tasks/editTask/EditTaskDescriptionType';

const usePatchTaskDescription = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ taskId, name, description, deadLine: { date, time } }: EditTaskDescriptionType) =>
			editTaskDescription({ taskId, name, description, deadLine: { date, time } }),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['today'] });
			queryClient.invalidateQueries({ queryKey: ['taskDesc', variables.taskId] });
		},
	});
	return { mutate: mutation.mutate };
};

export default usePatchTaskDescription;
