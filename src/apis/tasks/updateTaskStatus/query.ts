import { useMutation, useQueryClient } from '@tanstack/react-query';

import updateTaskStatus from './axios';
import { UpdateTaskStatusType } from './UpdateTaskStatusType';

import { useToast } from '@/components/toast/ToastContext';

const useUpdateTaskStatus = (handleIconMouseLeave: (() => void) | null) => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: (updateData: UpdateTaskStatusType) => updateTaskStatus(updateData),
		onMutate: async () => {
			const todayQueries = queryClient.getQueriesData({ queryKey: ['today'] });
			const filteredQueries = todayQueries.filter(([query]) => !query.includes(undefined));
			return { queryKey: filteredQueries[0][0], previousData: filteredQueries[0][1] };
		},
		onSuccess: (_, updateData, context) => {
			const revert = () => {
				queryClient.setQueryData(context.queryKey, context.previousData);
			};

			addToast('변경사항이 적용되었어요', 'success', revert);
			queryClient.invalidateQueries({ queryKey: ['today'] }).then(() => {
				if (handleIconMouseLeave) {
					handleIconMouseLeave();
				}
			});
			if (updateData.status === '미완료') {
				queryClient.invalidateQueries({ queryKey: ['dashboard'] });
			}
			if (updateData.status === '진행 중' || updateData.status === '완료') {
				queryClient.invalidateQueries({ queryKey: ['dashboard', 'inprogress'] });
			}
		},
	});

	return { mutate: mutation.mutate, queryClient };
};

export default useUpdateTaskStatus;
