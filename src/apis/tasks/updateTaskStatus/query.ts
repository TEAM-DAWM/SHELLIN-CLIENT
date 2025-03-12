import { useMutation, useQueryClient } from '@tanstack/react-query';

import updateTaskStatus from './axios';
import { UpdateTaskStatusType } from './UpdateTaskStatusType';

import QUERY_KEYS from '@/apis/queryKeys';
import { useToast } from '@/components/toast/ToastContext';

const useUpdateTaskStatus = (handleIconMouseLeave: (() => void) | null) => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		onMutate: async (updateData: UpdateTaskStatusType) => {
			const originalData = {
				taskId: updateData.taskId,
				status: null,
				targetDate: updateData.targetDate,
			};
			const todayQueries = queryClient.getQueriesData({ queryKey: QUERY_KEYS.allTasks });
			todayQueries.forEach(([queryKey, data]) => {
				if (Array.isArray(data) && (queryKey.includes('staging') || queryKey.includes('today'))) {
					const targetTask = data.find((task) => task.id === updateData.taskId);
					if (targetTask) {
						originalData.status = targetTask.status;
					}
				}
			});

			return { todayQueries, originalData };
		},
		mutationFn: (updateData: UpdateTaskStatusType) => updateTaskStatus(updateData),
		onSuccess: async (_, updateData, context) => {
			const revert = () => {
				if (context?.todayQueries) {
					context.todayQueries.forEach(([queryKey, data]) => {
						if (Array.isArray(data) && (queryKey.includes('staging') || queryKey.includes('today'))) {
							const currentData = queryClient.getQueryData(queryKey);

							if (Array.isArray(currentData)) {
								const updatedData = currentData.map((task) =>
									task.id === updateData.taskId && context.originalData?.status !== null
										? { ...task, status: context.originalData.status }
										: task
								);
								queryClient.setQueryData(queryKey, updatedData);
							}
						}
					});
				}

				if (context?.originalData && context.originalData.status !== null) {
					updateTaskStatus(context.originalData);
				}
			};

			addToast('변경사항이 적용되었어요', 'success', revert);

			// staging과 today중 해당 task가 속한 영역만 쿼리키 무효화
			const cachedTask = queryClient.getQueryData(QUERY_KEYS.taskDescription(updateData.taskId));
			const shouldInvalidateTask = cachedTask ? QUERY_KEYS.staging() : QUERY_KEYS.today();

			// 무효화할 쿼리키 변수 정의
			const shouldInvalidateDashboard = updateData.status === '미완료' ? QUERY_KEYS.dashboard() : null;
			const shouldInvalidateDashboardInProgress =
				updateData.status === '진행중' || updateData.status === '완료' ? QUERY_KEYS.dashboardInProgress() : null;

			await Promise.all([
				queryClient.invalidateQueries({ queryKey: shouldInvalidateTask }),
				shouldInvalidateDashboard && queryClient.invalidateQueries({ queryKey: shouldInvalidateDashboard }),
				shouldInvalidateDashboardInProgress &&
					queryClient.invalidateQueries({ queryKey: shouldInvalidateDashboardInProgress }),
				queryClient.invalidateQueries({ queryKey: ['timeblock'] }),
			]);

			if (handleIconMouseLeave) handleIconMouseLeave();
		},
	});

	return { mutate: mutation.mutate, queryClient };
};

export default useUpdateTaskStatus;
