import { useMutation, useQueryClient } from '@tanstack/react-query';

import PatchTimeBlock from './axios';
import { PatchTimeBlokType } from './PatchTimeBlockType';

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
				throw new Error('error');
			}
			return response;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['timeblock'] }),
	});

	return { mutate: mutation.mutate };
};

export default usePatchTimeBlock;
