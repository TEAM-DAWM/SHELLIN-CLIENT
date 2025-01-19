import { GetTimeBlokType } from './GetTimeBlockType';

import { privateInstance } from '@/apis/instance';

/**
 * TODO: 구글 캘린더 추후 다시 추가 예정
 */
const getTimeBlock = async ({ startDate, range }: GetTimeBlokType) => {
	const response = await privateInstance.get(`/api/tasks/time-blocks`, {
		params: {
			startDate,
			range,
		},
	});
	return response;
};

export default getTimeBlock;
