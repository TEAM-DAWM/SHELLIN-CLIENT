import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteTask from './axios';

import QUERY_KEYS from '@/apis/queryKeys';
import { useToast } from '@/components/toast/ToastContext';

/** Task 삭제 */
const useDeleteTask = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: (taskId: number) => deleteTask(taskId),
		onSuccess: (_, taskId) => {
			addToast('할 일이 삭제되었어요', 'error');

			// staging과 today중 해당 task가 속한 영역만 쿼리키 무효화
			const cachedTask = queryClient.getQueryData(QUERY_KEYS.taskDescription(taskId));
			const listQueryKey = cachedTask ? QUERY_KEYS.staging() : QUERY_KEYS.today();

			queryClient.invalidateQueries({ queryKey: listQueryKey });
			queryClient.invalidateQueries({ queryKey: ['timeblock'] });
		},
	});

	return { mutate: mutation.mutate };
};

export default useDeleteTask;
