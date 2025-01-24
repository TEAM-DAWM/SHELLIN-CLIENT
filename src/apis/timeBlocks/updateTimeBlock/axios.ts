import { isAxiosError } from 'axios';

import { PatchTimeBlokType } from './PatchTimeBlockType';

import { privateInstance } from '@/apis/instance';
import MESSAGES from '@/apis/messages';
import { TimeBlockResponse } from '@/apis/timeBlocks/postTimeBlock/timeblockType';

const PatchTimeBlock = async ({
	taskId,
	timeBlockId,
	startTime,
	endTime,
	isAllTime,
}: PatchTimeBlokType): Promise<TimeBlockResponse | undefined> => {
	try {
		const response = await privateInstance.patch(`/api/tasks/${taskId}/time-blocks/${timeBlockId}`, {
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

export default PatchTimeBlock;
