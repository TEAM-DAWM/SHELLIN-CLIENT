import { isAxiosError } from 'axios';

import { GetTasksType } from './GetTasksType';

import { privateInstance } from '@/apis/instance';

const getTasks = async ({ sortOrder, targetDate }: GetTasksType) => {
	const getOrder = () => {
		switch (sortOrder) {
			case 'CUSTOM_ORDER':
				return 'user';
			case 'NEWEST':
				return 'recent';
			case 'OLDEST':
				return 'old';
			case 'CLOSEST':
				return 'near';
			case 'FARTHEST':
				return 'far';
			default:
				return 'user';
		}
	};
	try {
		const { data } = await privateInstance.get('/api/tasks', {
			params: {
				order: getOrder(),
				targetDate,
			},
		});
		return data.data.tasks;
	} catch (error) {
		if (isAxiosError(error)) {
			console.log('Axios error occurred:', error.message);
		} else {
			throw new Error('An unexpected error occurred');
		}
		return null;
	}
};

export default getTasks;
