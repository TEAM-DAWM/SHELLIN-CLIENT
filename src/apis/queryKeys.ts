export const QUERY_KEYS = {
	allTasks: ['tasks'] as const,

	today: (sortOrder?: string | null, targetDate?: string | null) =>
		[...QUERY_KEYS.allTasks, 'today', sortOrder || '', targetDate || ''] as const,
	staging: (sortOrder?: string) => [...QUERY_KEYS.allTasks, 'staging', sortOrder || ''] as const,

	taskDescription: (taskId: string | number, targetDate?: string | null) =>
		[...QUERY_KEYS.allTasks, 'taskDesc', taskId, targetDate || ''] as const,

	order: () => [...QUERY_KEYS.allTasks, 'order'] as const,

	timeblock: () => [...QUERY_KEYS.allTasks, 'timeblock'] as const,

	dashboard: () => [...QUERY_KEYS.allTasks, 'dashboard'] as const,
	dashboardInProgress: () => [...QUERY_KEYS.dashboard(), 'inprogress'] as const,
};

export default QUERY_KEYS;
