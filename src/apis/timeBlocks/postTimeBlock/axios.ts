import { isAxiosError } from 'axios';

import { PostTimeBlokType } from './PostTimeBlockType';

import { privateInstance } from '@/apis/instance';
import MESSAGES from '@/apis/messages';
import { TimeBlockResponse } from '@/apis/timeBlocks/postTimeBlock/timeblockType';

const CreateTimeBlock = async ({
	taskId,
	startTime,
	endTime,
	isAllTime,
}: PostTimeBlokType): Promise<TimeBlockResponse | undefined> => {
	try {
		const response = await privateInstance.post(`/api/tasks/${taskId}/time-blocks`, {
			startTime,
			endTime,
			isAllTime,
		});
		return {
			code: response.data.code,
			data: response.data.data,
			message: response.data.message,
		};
	} catch (error) {
		if (isAxiosError(error)) throw error;
		else throw new Error(MESSAGES.UNKNOWN_ERROR);
	}
};

export default CreateTimeBlock;
