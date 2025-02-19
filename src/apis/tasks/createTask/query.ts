import { useMutation, useQueryClient } from '@tanstack/react-query';

import createTask from './axios';
import { CreateTaskType } from './CreateTaskType';

import QUERY_KEYS from '@/apis/queryKeys';
/** Task 추가 */
const useCreateTask = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ name, deadLine }: CreateTaskType) => createTask({ name, deadLine }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staging() }),
	});

	return { mutate: mutation.mutate };
};

export default useCreateTask;
