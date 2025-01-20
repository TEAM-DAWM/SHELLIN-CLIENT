import { useEffect, useRef } from 'react';

type OutsideClickHandler = {
	onClose: () => void;
};

const useOutsideClick = <T extends HTMLElement>({ onClose }: OutsideClickHandler) => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const overlay = document.createElement('div');
		overlay.style.position = 'fixed';
		overlay.style.top = '0';
		overlay.style.left = '0';
		overlay.style.width = '100%';
		overlay.style.height = '100%';
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
		overlay.style.zIndex = '3';
		document.body.appendChild(overlay);

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose(); // 외부 클릭 시 모달 닫기
				document.body.removeChild(overlay); // 배경 제거
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		// 컴포넌트 언마운트 시 배경 및 이벤트 제거
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return ref;
};

export default useOutsideClick;
