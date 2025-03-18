// 주어진 시간 문자열("0:00")을 "00:00" 형식의 문자열로 변환합니다.
const formatToHHMM = (time: string): string => {
	const [hour, minute] = time.split(':');
	return `${hour.padStart(2, '0')}:${minute}`;
};

export default formatToHHMM;
