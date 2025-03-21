import { useMutation, useQueryClient } from '@tanstack/react-query';

import CreateTimeBlock from './axios';
import { PostTimeBlokType } from './PostTimeBlockType';

import { useToast } from '@/components/toast/ToastContext';

const usePostTimeBlock = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const { mutate, isError } = useMutation({
		mutationFn: async ({ taskId, startTime, endTime, isAllTime }: PostTimeBlokType) => {
			const response = await CreateTimeBlock({ taskId, startTime, endTime, isAllTime });
			/** response.code가 'conflict'일 때 타임블록 에러 토스트 출력 */
			if (response && response.code === 'conflict') {
				addToast(response.message, response.code);
				throw new Error('error');
			}
			return response;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timeblock'] }),
	});

	return { mutate, isError };
};

export default usePostTimeBlock;
