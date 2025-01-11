import { useQuery } from '@tanstack/react-query';

import getTasks from './axios';
import { GetTasksType } from './GetTasksType';

/** Task 리스트 조회 */
const useGetTasks = ({ sortOrder, targetDate }: GetTasksType) =>
	useQuery({
		queryKey: ['today', sortOrder, targetDate],
		queryFn: () => getTasks({ sortOrder, targetDate }),
		placeholderData: [],
	});

export default useGetTasks;
