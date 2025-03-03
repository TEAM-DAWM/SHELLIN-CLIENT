import { useMutation, useQueryClient } from '@tanstack/react-query';

import orderTask from './axios';
import { OrderTaskType } from './OrderTaskType';

import QUERY_KEYS from '@/apis/queryKeys';

/** Task 유저 순서 지정 */
const useOrderTask = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ type, targetDate, taskList }: OrderTaskType) => orderTask({ type, targetDate, taskList }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.today() }),
	});

	return { mutate: mutation.mutate };
};

export default useOrderTask;
