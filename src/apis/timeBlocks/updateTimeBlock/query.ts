import { useMutation, useQueryClient } from '@tanstack/react-query';

import PatchTimeBlock from './axios';
import { PatchTimeBlokType } from './PatchTimeBlockType';

import { useToast } from '@/components/toast/ToastContext';

const usePatchTimeBlock = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();

	const mutation = useMutation({
		mutationFn: async ({ taskId, timeBlockId, startTime, endTime }: PatchTimeBlokType) => {
			const response = await PatchTimeBlock({ taskId, timeBlockId, startTime, endTime });
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
