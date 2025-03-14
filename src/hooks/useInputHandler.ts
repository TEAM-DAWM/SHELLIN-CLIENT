import { useState } from 'react';

import { INPUT_STATE, InputState } from '@/types/inputStateType.ts';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

function useInputHandler() {
	const [state, setState] = useState<InputState>(INPUT_STATE.DEFAULT);

	const handleFocus = (e: React.FocusEvent<InputElement>) => {
		if (!e.target.value) {
			setState(INPUT_STATE.PLACEHOLDER);
		}
	};

	const handleBlur = (e: React.FocusEvent<InputElement>) => {
		if (e.target.value) {
			setState(INPUT_STATE.FIELD);
		} else {
			setState(INPUT_STATE.DEFAULT);
		}
	};

	const handleChange = (e: React.ChangeEvent<InputElement>) => {
		if (e.target.value) {
			setState(INPUT_STATE.TYPING);
		} else {
			setState(INPUT_STATE.PLACEHOLDER);
		}
	};

	const handleMouseEnter = () => {
		if (state === INPUT_STATE.DEFAULT) {
			setState(INPUT_STATE.HOVER);
		}
	};

	const handleMouseLeave = () => {
		if (state === INPUT_STATE.HOVER) {
			setState(INPUT_STATE.DEFAULT);
		}
	};

	const handleEventDefault = () => {
		setState(INPUT_STATE.DEFAULT);
	};

	return {
		state,
		handleFocus,
		handleBlur,
		handleChange,
		handleMouseEnter,
		handleMouseLeave,
		handleEventDefault,
	};
}

export default useInputHandler;
