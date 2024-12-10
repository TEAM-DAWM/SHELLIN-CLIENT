const INPUT_STATE = {
	PLACEHOLDER: 'placeholder',
	DEFAULT: 'default',
	HOVER: 'hover',
	TYPING: 'typing',
	FIELD: 'field',
} as const;

export type InputState = (typeof INPUT_STATE)[keyof typeof INPUT_STATE];
export { INPUT_STATE };
