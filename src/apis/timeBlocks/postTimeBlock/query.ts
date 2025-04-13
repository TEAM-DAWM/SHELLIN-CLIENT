import { useMutation, useQueryClient } from '@tanstack/react-query';

import CreateTimeBlock from './axios';
import { PostTimeBlokType } from './PostTimeBlockType';

import { useToast } from '@/components/toast/ToastContext';

const usePostTimeBlock = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: async ({ taskId, startTime, endTime, isAllTime }: PostTimeBlokType) => {
			const response = await CreateTimeBlock({ taskId, startTime, endTime, isAllTime });
			/** response.code가 'info'일 때 타임블록 에러 토스트 출력 */
			if (response && response.code === 'info') {
				addToast(response.message, response.code);
				throw new Error('info');
			}
			return response;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timeblock'] }),
	});

	return { mutateAsync: mutation.mutateAsync };
};

export default usePostTimeBlock;
