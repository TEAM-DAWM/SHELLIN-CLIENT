import { STATUSES } from '@/constants/statuses';

interface TimeBlock {
	id: number;
	startTime: string;
	endTime: string;
}

interface Schedule {
	name: string;
	startTime: string;
	endTime: string;
	allDay: boolean;
}

interface Task {
	id: number;
	name: string;
	status: (typeof STATUSES)[keyof typeof STATUSES];
	timeBlocks: TimeBlock[];
}

interface Google {
	id: string;
	name: string;
	color: string;
	schedules: Schedule[];
}

export interface TimeBlockData {
	googles: Google[];
	tasks: Task[];
}
