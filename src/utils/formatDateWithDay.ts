/** Date 형식을 0000/00/00 (요일)형식 string 으로 반환합니다
 */

const formatDateWithDay = (date: Date): string => {
	const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const dayOfWeek = daysOfWeek[date.getDay()];

	return `${year}/${month}/${day} (${dayOfWeek})`;
};

export default formatDateWithDay;
