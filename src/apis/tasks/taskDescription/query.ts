import { useQuery } from '@tanstack/react-query';

import taskDescription from './axios';
import { TaskDescriptionType } from './TaskDescriptionType';

import QUERY_KEYS from '@/apis/queryKeys';

// Task 상세 설명 조회
const useTaskDescription = ({ taskId, targetDate, isOpen }: TaskDescriptionType) => {
	const data = useQuery({
		queryKey: QUERY_KEYS.taskDescription(taskId, targetDate),
		queryFn: () => taskDescription({ taskId, targetDate }),
		enabled: isOpen,
		staleTime: 0,
	});

	return data;
};
export default useTaskDescription;
