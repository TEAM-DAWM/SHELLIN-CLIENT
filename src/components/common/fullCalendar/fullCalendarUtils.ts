import { SlotLabelContentArg } from '@fullcalendar/core';

// 일간, 주간에서 왼쪽 시간형식 '12 AM' 으로 만들기
const customSlotLabelContent = (arg: SlotLabelContentArg) => {
	const formattedTime = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		hour12: true,
	}).format(arg.date);

	const span = document.createElement('span');
	span.innerText = formattedTime;

	return {
		html: span.outerHTML,
	};
};

export default customSlotLabelContent;
