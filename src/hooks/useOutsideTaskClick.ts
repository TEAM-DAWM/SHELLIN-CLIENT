import { useEffect, RefObject } from 'react';

import useTaskSelectionStore from '@/store/useTaskSelectionStore';

const useOutsideTaskClick = (calendarRef: RefObject<HTMLElement>) => {
	const { clearSelectedTask, selectedTask } = useTaskSelectionStore();

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (calendarRef.current && calendarRef.current.contains(event.target as Node)) {
				return;
			}
			if (selectedTask) {
				clearSelectedTask();
			}
		};

		document.addEventListener('mousedown', handleMouseDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [calendarRef, clearSelectedTask, selectedTask]);
};

export default useOutsideTaskClick;
