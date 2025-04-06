import { useEffect, useRef } from 'react';

import useTaskSelectionStore from '@/store/useTaskSelectionStore';

const useOutsideTaskClick = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { clearSelectedTask, selectedTask, isDragging } = useTaskSelectionStore();

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent): void => {
			if (selectedTask && !isDragging && ref.current && !ref.current.contains(event.target as Node)) {
				clearSelectedTask();
			}
		};

		document.addEventListener('mousedown', handleMouseDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [clearSelectedTask, selectedTask, isDragging]);

	return ref;
};

export default useOutsideTaskClick;
