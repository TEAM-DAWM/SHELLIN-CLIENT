import styled from '@emotion/styled';

import CheckButton from '@/components/common/v2/control/CheckButton';

function CalendarSettingDropdown() {
	return (
		<CalendarSettingDropdownContainer>
			<CheckButton label="미완료 일정" onClick={() => {}} size="large" checked={false} />
			<CheckButton label="진행중 일정" onClick={() => {}} size="large" checked={false} />
			<CheckButton label="완료 일정" onClick={() => {}} size="large" checked={false} />
		</CalendarSettingDropdownContainer>
	);
}

const CalendarSettingDropdownContainer = styled.div`
	box-sizing: border-box;
	width: 16.8rem;
	height: 16rem;
	padding: 1.6rem 0.8rem;

	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

export default CalendarSettingDropdown;
