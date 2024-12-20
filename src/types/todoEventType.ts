const TODO_EVENT_STATE = {
	DEFAULT: 'default',
	HOVER: 'hover',
	PRESSED: 'pressed',
	FLOATED: 'floated',
} as const;

export type TodoEventState = (typeof TODO_EVENT_STATE)[keyof typeof TODO_EVENT_STATE];
export { TODO_EVENT_STATE };
