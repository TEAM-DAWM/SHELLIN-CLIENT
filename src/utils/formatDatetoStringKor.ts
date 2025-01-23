/** Date 형식을 0000년 00월 00일 형식 string 으로 반환합니다
 * undefined, null 의 경우 '시간' 텍스트를 반환합니다
 */
const formatDatetoStringKor = (date: Date | undefined | null | string) => {
	if (date) {
		const dateTypeDate = new Date(date);
		const year = dateTypeDate.getFullYear();
		const month = '0'.concat((dateTypeDate.getMonth() + 1).toString()).slice(-2);
		const day = '0'.concat(dateTypeDate.getDate().toString()).slice(-2);
		return `${year}년 ${month}월 ${day}일`;
	}
	return '';
};

export default formatDatetoStringKor;
