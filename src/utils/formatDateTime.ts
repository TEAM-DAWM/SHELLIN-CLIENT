/** Date 형식을 0000-00-00 형식 string 으로 반환합니다 */
export const formatDatetoLocalDate = (date: Date | null | string) => {
	if (date) {
		const dateTypeDate = new Date(date);
		const year = dateTypeDate.getFullYear();
		const month = '0'.concat((dateTypeDate.getMonth() + 1).toString()).slice(-2);
		const day = '0'.concat(dateTypeDate.getDate().toString()).slice(-2);
		return `${year}-${month}-${day}`;
	}
	return '';
};

/** Date 형식을 0000.00.00 형식 string 으로 반환합니다
 * undefined, null 의 경우 '시간' 텍스트를 반환합니다
 */
export const formatDatetoString = (date: Date | undefined | null | string) => {
	if (date) {
		const dateTypeDate = new Date(date);
		const year = dateTypeDate.getFullYear();
		const month = '0'.concat((dateTypeDate.getMonth() + 1).toString()).slice(-2);
		const day = '0'.concat(dateTypeDate.getDate().toString()).slice(-2);
		return `${year}.${month}.${day}`;
	}
	return '';
};

/** Date 형식을 0000년 00월 00일 형식 string 으로 반환합니다
 * undefined, null 의 경우 '시간' 텍스트를 반환합니다
 */
export const formatDatetoStringKor = (date: Date | undefined | null | string) => {
	if (date) {
		const dateTypeDate = new Date(date);
		const year = dateTypeDate.getFullYear();
		const month = '0'.concat((dateTypeDate.getMonth() + 1).toString()).slice(-2);
		const day = '0'.concat(dateTypeDate.getDate().toString()).slice(-2);
		return `${year}년 ${month}월 ${day}일`;
	}
	return '';
};

/** Date 형식을 0000/00/00 (요일)형식 string 으로 반환합니다
 */

export const formatDateWithDay = (date: Date): string => {
	const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const dayOfWeek = daysOfWeek[date.getDay()];

	return `${year}/${month}/${day} (${dayOfWeek})`;
};

/** 입력 중인 날짜 string에 0000.00.00 형태로 '.' 을 추가한 string 을 반환합니다 */
export const dotFormatDate = (text: string) => {
	let value = text.replace(/\D/g, '');
	value = value.slice(0, 8);
	if (value.length > 4) {
		value = value.replace(/(\d{4})(\d{1,2})/, '$1.$2');
	}
	if (value.length > 7) {
		value = value.replace(/(\d{4}\.\d{2})(\d{1,2})/, '$1.$2');
	}
	return value;
};

/** 입력 중인 시간 string에 HH:MM 형태로 ':' 을 추가한 string 을 반환합니다 */
export const dotFormatTime = (text: string) => {
	let value = text.replace(/\D/g, '');
	value = value.slice(0, 4);
	if (value.length > 2) {
		value = value.replace(/(\d{2})(\d{1,2})/, '$1:$2');
	}
	return value;
};

/**
 * ISO 8601 형식의 날짜 문자열에서 YYYY-MM-DD 형식으로 변환합니다.
 * @param {string} isoDateString - 변환할 ISO 8601 형식의 날짜 문자열.
 * @returns {string} - 변환된 날짜 문자열.
 */
export const parseDate = (isoDateString: string): string => {
	const date = new Date(isoDateString);
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2); // 월을 두 자리로 포맷팅
	const day = `0${date.getDate()}`.slice(-2); // 일을 두 자리로 포맷팅
	return `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 반환
};
