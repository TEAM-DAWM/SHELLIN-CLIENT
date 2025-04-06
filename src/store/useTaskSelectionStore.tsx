import { create } from 'zustand';

import { TaskType } from '@/types/tasks/taskType';

interface TaskSelectionState {
	selectedTask: TaskType | null;
	setSelectedTask: (task: TaskType) => void;
	clearSelectedTask: () => void;
	isDragging: boolean;
	setIsDragging: (dragging: boolean) => void;
}

const useTaskSelectionStore = create<TaskSelectionState>((set) => ({
	selectedTask: null,
	isDragging: false,
	setSelectedTask: (task: TaskType) => set({ selectedTask: task }),
	clearSelectedTask: () => set({ selectedTask: null }),
	setIsDragging: (dragging: boolean) => set({ isDragging: dragging }),
}));

export default useTaskSelectionStore;
