import { useQuery } from '@tanstack/react-query';

import getTimeBlock from './axios';
import { GetTimeBlokType } from './GetTimeBlockType';

/** TimeBlock 리스트 조회 */
const useGetTimeBlock = ({ startDate, range }: GetTimeBlokType) =>
	useQuery({
		queryKey: ['timeblock', startDate, range],
		queryFn: () => getTimeBlock({ startDate, range }),
	});

export default useGetTimeBlock;
