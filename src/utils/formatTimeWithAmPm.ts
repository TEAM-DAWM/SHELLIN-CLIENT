/**
 *
 * @param time (yyyy-mm-ddThh:mm)
 * @returns (hh:mm am/pm)
 */
const formatTimeWithAmPm = (time: string) => {
	if (/^\d{1,2}:\d{2} (am|pm)$/i.test(time)) {
		return time; // 이미 포맷된 값이므로 바로 반환
	}

	if (time) {
		const onlyTime = time.split('T')[1];
		const [hour, minute] = onlyTime.split(':').map(Number);
		const period = hour >= 12 ? 'pm' : 'am';
		return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
	}
	// 임시 리턴
	return '06:00pm';
};

export default formatTimeWithAmPm;
