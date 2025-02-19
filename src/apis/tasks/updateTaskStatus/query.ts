import { useMutation, useQueryClient } from '@tanstack/react-query';

import updateTaskStatus from './axios';
import { UpdateTaskStatusType } from './UpdateTaskStatusType';

import QUERY_KEYS from '@/apis/queryKeys';
import { useToast } from '@/components/toast/ToastContext';

const useUpdateTaskStatus = (handleIconMouseLeave: (() => void) | null) => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: (updateData: UpdateTaskStatusType) => updateTaskStatus(updateData),
		onSuccess: async (_, updateData) => {
			addToast('변경사항이 적용되었어요', 'success');

			// staging과 today중 해당 task가 속한 영역만 쿼리키 무효화
			const cachedTask = queryClient.getQueryData(QUERY_KEYS.taskDescription(updateData.taskId));
			const listQueryKey = cachedTask ? QUERY_KEYS.staging() : QUERY_KEYS.today();

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: listQueryKey }),

				updateData.status === '미완료' ? queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard() }) : null,
				updateData.status === '진행중' || updateData.status === '완료'
					? queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboardInProgress() })
					: null,
			]);

			if (handleIconMouseLeave) handleIconMouseLeave();
		},
	});

	return { mutate: mutation.mutate, queryClient };
};

export default useUpdateTaskStatus;
