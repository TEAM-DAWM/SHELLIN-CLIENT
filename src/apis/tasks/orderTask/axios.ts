import { OrderTaskType } from './OrderTaskType';

import { privateInstance } from '@/apis/instance';

// type: true=dumping area, false=todo list
const orderTask = async ({ type, targetDate, taskList }: OrderTaskType) => {
	const { data } = await privateInstance.post('/api/tasks/orders', {
		type,
		targetDate: type === true ? null : targetDate,
		taskList,
	});
	return data;
};

export default orderTask;
