import { create } from 'zustand';

import { TaskType } from '@/types/tasks/taskType';

interface TaskSelectionState {
	selectedTask: TaskType | null;
	setSelectedTask: (task: TaskType) => void;
	clearSelectedTask: () => void;
}

const useTaskSelectionStore = create<TaskSelectionState>((set) => ({
	selectedTask: null,
	setSelectedTask: (task: TaskType) => set({ selectedTask: task }),
	clearSelectedTask: () => set({ selectedTask: null }),
}));

export default useTaskSelectionStore;
