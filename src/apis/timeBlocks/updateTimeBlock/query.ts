import { useMutation, useQueryClient } from '@tanstack/react-query';

import PatchTimeBlock from './axios';
import { PatchTimeBlokType } from './PatchTimeBlockType';

import QUERY_KEYS from '@/apis/queryKeys';
import { useToast } from '@/components/toast/ToastContext';
import { formatDateToLocal } from '@/utils/formatDateTime';

const usePatchTimeBlock = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: async ({ taskId, timeBlockId, startTime, endTime, isAllTime }: PatchTimeBlokType) => {
			if (!endTime) {
				const startDate = new Date(startTime); // startTime을 Date 객체로 변환
				startDate.setHours(startDate.getHours() + 1); // 1시간 추가
				// eslint-disable-next-line no-param-reassign
				endTime = formatDateToLocal(startDate);
			}

			const response = await PatchTimeBlock({ taskId, timeBlockId, startTime, endTime, isAllTime });
			if (response && response.code === 'conflict') {
				addToast(response.message, response.code);
				throw new Error('conflict');
			}
			return response;
		},
		onSuccess: (_response, variables) => {
			const { taskId, startTime } = variables;
			const targetDate = formatDateToLocal(new Date(startTime)).split('T')[0];

			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.taskDescription(taskId, targetDate) });
		},
	});

	return { mutateAsync: mutation.mutateAsync };
};

export default usePatchTimeBlock;
