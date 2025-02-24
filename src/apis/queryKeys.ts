export const QUERY_KEYS = {
	allTasks: ['tasks'] as const,

	today: (sortOrder?: string, targetDate?: string) => {
		const key = ['today'];
		if (sortOrder) key.push(sortOrder);
		if (targetDate) key.push(targetDate);
		return [...QUERY_KEYS.allTasks, ...key] as const;
	},

	staging: (sortOrder?: string) => {
		const key = ['staging'];
		if (sortOrder) key.push(sortOrder);
		return [...QUERY_KEYS.allTasks, ...key] as const;
	},

	taskDescription: (taskId: string | number, targetDate?: string | null) => {
		const key = ['taskDesc', taskId];
		if (targetDate) key.push(targetDate);
		return [...QUERY_KEYS.allTasks, ...key] as const;
	},

	order: () => [...QUERY_KEYS.allTasks, 'order'] as const,

	timeblock: () => [...QUERY_KEYS.allTasks, 'timeblock'] as const,

	dashboard: () => [...QUERY_KEYS.allTasks, 'dashboard'] as const,
	dashboardInProgress: () => [...QUERY_KEYS.dashboard(), 'inprogress'] as const,
};

export default QUERY_KEYS;
