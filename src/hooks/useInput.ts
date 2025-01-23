import { useState } from 'react';

const useInput = (defaultValue?: string) => {
	const [content, setContent] = useState<string>(defaultValue || '');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setContent(e.target.value);
		}
	};
	const handleContent = (data: string) => {
		setContent(data);
	};
	return { content, onChange, handleContent };
};
export default useInput;
