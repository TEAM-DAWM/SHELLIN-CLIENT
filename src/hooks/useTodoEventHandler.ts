import { useState } from 'react';

import { TODO_EVENT_STATE, TodoEventState } from '@/types/todoEventType';

function useTodoEventHandler() {
	const [state, setState] = useState<TodoEventState>(TODO_EVENT_STATE.DEFAULT);

	const handleMouseEnter = () => {
		if (state === TODO_EVENT_STATE.DEFAULT) {
			setState(TODO_EVENT_STATE.HOVER);
		}
	};

	const handleMouseLeave = () => {
		if (state === TODO_EVENT_STATE.HOVER) {
			setState(TODO_EVENT_STATE.DEFAULT);
		}
	};

	const handleMouseDown = () => {
		setState(TODO_EVENT_STATE.PRESSED);
	};

	const handleMouseUp = () => {
		setState(TODO_EVENT_STATE.DEFAULT);
	};

	const handleDragStart = () => {
		setState(TODO_EVENT_STATE.FLOATED);
	};

	const handleDragEnd = () => {
		setState(TODO_EVENT_STATE.DEFAULT);
	};

	return {
		state,
		handleMouseEnter,
		handleMouseLeave,
		handleMouseDown,
		handleMouseUp,
		handleDragStart,
		handleDragEnd,
	};
}

export default useTodoEventHandler;
