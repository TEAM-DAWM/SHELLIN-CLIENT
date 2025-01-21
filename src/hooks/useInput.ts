import { useState } from 'react';

const useInput = (defaultValue?: string) => {
	const [content, setContent] = useState<string>(defaultValue || '');
	const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			setContent(e.target.value);
		}
	};
	return { content, onChange };
};
export default useInput;
