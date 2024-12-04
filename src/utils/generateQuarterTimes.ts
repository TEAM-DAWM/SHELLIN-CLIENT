/**  15분 간격으로 시간을 생성하는 함수 */
const generateQuarterTimes = () => {
	const times = [];
	for (let hour = 0; hour < 24; hour += 1) {
		for (let minute = 0; minute < 60; minute += 15) {
			const period = hour < 12 ? 'am' : 'pm';
			const formattedHour = hour.toString().padStart(2, '0');
			const formattedMinute = minute.toString().padStart(2, '0');
			times.push(`${formattedHour}:${formattedMinute} ${period}`);
		}
	}
	return times;
};

const quarterTimes = generateQuarterTimes();

export default quarterTimes;
