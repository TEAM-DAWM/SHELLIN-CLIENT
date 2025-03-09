import { TimeBlockData } from '@/apis/timeBlocks/getTimeBlock/GetTimeBlock';
import { STATUSES } from '@/constants/statuses';

interface EventData {
	title: string;
	start: string;
	end: string;
	allDay?: boolean;
	classNames: string;
	extendedProps: {
		taskId: number;
		timeBlockId: number | null;
		isCompleted: boolean;
		status: (typeof STATUSES)[keyof typeof STATUSES];
	};
}

const processEvents = (timeBlockData: TimeBlockData, selectedStatuses: string[]): EventData[] => {
	const events: EventData[] = [];

	// tasks 데이터 처리 + 상태 필터링
	timeBlockData.tasks
		.filter((task) => selectedStatuses.includes(task.status))
		.forEach((task) => {
			task.timeBlocks.forEach((timeBlock) => {
				events.push({
					title: task.name,
					start: timeBlock.startTime,
					end: timeBlock.endTime,
					allDay: timeBlock.isAllTime,
					classNames: task.status === STATUSES.COMPLETED ? 'tasks completed' : 'tasks',
					extendedProps: {
						taskId: task.id,
						timeBlockId: timeBlock.id,
						isCompleted: task.status === STATUSES.COMPLETED,
						status: task.status,
					},
				});
			});
		});

	/**
	 * TODO: 구글 캘린더 추후 다시 추가 예정
	 */
	// // googles 데이터 처리
	// timeBlockData.googles.forEach((google) => {
	// 	google.schedules.forEach((schedule) => {
	// 		events.push({
	// 			title: google.name,
	// 			start: schedule.startTime,
	// 			end: schedule.endTime,
	// 			allDay: schedule.allDay,
	// 			classNames: 'schedule',
	// 			extendedProps: {
	// 				taskId: -1, // 구글 캘린더 이벤트에는 taskId가 없으므로 -1로 설정
	// 				timeBlockId: null,
	// 			},
	// 		});
	// 	});
	// });

	return events;
};

export default processEvents;
