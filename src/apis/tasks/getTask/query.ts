import { useQuery } from '@tanstack/react-query';

import getTasks from './axios';
import { GetTasksType } from './GetTasksType';

import QUERY_KEYS from '@/apis/queryKeys';

/** Task 리스트 조회 */
const useGetTasks = ({ sortOrder, targetDate }: GetTasksType) =>
	useQuery({
		// taskgetDate가 유무로 today, staging 쿼리키 설정
		queryKey: [...(targetDate ? QUERY_KEYS.today() : QUERY_KEYS.staging()), sortOrder, targetDate],
		queryFn: () => getTasks({ sortOrder, targetDate }),
	});

export default useGetTasks;
