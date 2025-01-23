/** 현재 시각: hours, hh, mm return */
export const getCurrTime = (date: Date) => {
	const hours24format = date.getHours();
	const minutes = date.getMinutes();

	const hours12format = hours24format % 12 || 12;
	const formattedHours = hours12format.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	return { hours24format, formattedHours, formattedMinutes };
};

/** hh:mm a.m, hh:mm p.m 형식 */
export const getDisplayCurrTime = (date: Date) => {
	const { hours24format, formattedHours, formattedMinutes } = getCurrTime(date);
	const period = hours24format >= 12 ? 'pm' : 'am';
	return `${formattedHours}:${formattedMinutes}${period}`;
};

/** hh:mm 형식 */
export const getFormattedCurrTime = (date: Date) => {
	const { formattedHours, formattedMinutes } = getCurrTime(date);
	return `${formattedHours}:${formattedMinutes}`;
};
