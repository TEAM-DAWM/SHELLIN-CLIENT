import { useEffect, useRef } from 'react';

type OutsideClickHandler = {
	onClose: () => void;
};

const useOutsideClick = <T extends HTMLElement>({ onClose }: OutsideClickHandler) => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return ref;
};

export default useOutsideClick;
