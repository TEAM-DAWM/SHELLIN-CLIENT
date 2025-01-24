import { useMutation, useQueryClient } from '@tanstack/react-query';

import deleteTask from './axios';

import { useToast } from '@/components/toast/ToastContext';

/** Task 삭제 */
const useDeleteTask = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: (taskId: number) => deleteTask(taskId),
		onSuccess: () => {
			addToast('할 일이 삭제되었어요', 'error');
			queryClient.invalidateQueries({ queryKey: ['today'] });
			queryClient.invalidateQueries({ queryKey: ['timeblock'] });
		},
	});

	return { mutate: mutation.mutate };
};

export default useDeleteTask;
