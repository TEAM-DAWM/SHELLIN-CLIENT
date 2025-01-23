import { OrderTaskType } from './OrderTaskType';

import { privateInstance } from '@/apis/instance';

// type: false=dumping area, true=todo list
const orderTask = async ({ type, targetDate, taskList }: OrderTaskType) => {
	const { data } = await privateInstance.post('/api/tasks/orders', {
		type,
		targetDate: type === false ? null : targetDate,
		taskList,
	});
	return data;
};

export default orderTask;
