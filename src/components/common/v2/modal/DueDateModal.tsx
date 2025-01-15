import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/v2/button/Button';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';

interface DueDateModalType {
	todoTime: string;
	todoDate?: Date;
	handleTodoTime: (selectedTodoTime: string) => void;
	handleTodoDate: (selectedTodoDate: Date) => void;
	handleSettingModal: () => void;
}
function DueDateModal({ todoTime, todoDate, handleTodoDate, handleTodoTime, handleSettingModal }: DueDateModalType) {
	// 모달 안 임시 state들, Button 누를시 상위 컴포넌트 state로 들어감
	const defaultDate = new Date();

	const dateAfter14Days = defaultDate;
	dateAfter14Days.setDate(defaultDate.getDate() + 14);
	/** 현재 시각 */
	const getCurrTime = () => {
		let hours = defaultDate.getHours();
		const minutes = defaultDate.getMinutes();
		const period = hours >= 12 ? 'p.m' : 'a.m';
		hours = hours % 12 || 12;
		const formattedHours = hours.toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');

		return `${formattedHours}:${formattedMinutes} ${period}`;
	};

	const [dueDateTime, setDueDateTime] = useState(todoTime || getCurrTime());
	const [dueDateDate, setDueDateDate] = useState(todoDate || dateAfter14Days);

	const onDueDateSubmit = () => {
		handleTodoDate(dueDateDate);
		handleTodoTime(dueDateTime);
		console.log(dueDateDate, dueDateTime);
		handleSettingModal();
	};

	const handleDueDateModalTime = (time: string) => {
		setDueDateTime(time);
	};
	const handleDueDateModalDate = (date: Date) => {
		setDueDateDate(date);
	};

	return (
		<DueDateModalLayout>
			<DueDateModalHeadLayout>
				<ModalTopButtonBox>
					<ButtonBox>
						<IconButton iconName="IcnX" type="normal" size="small" disabled />
					</ButtonBox>
				</ModalTopButtonBox>
			</DueDateModalHeadLayout>

			<DueDateModalBodyLayout>
				<DeadlineBox
					date={dueDateDate}
					endTime={dueDateTime}
					label="마감 기간"
					isDueDate
					handleDueDateModalTime={handleDueDateModalTime}
					handleDueDateModalDate={handleDueDateModalDate}
				/>
			</DueDateModalBodyLayout>

			<DueDateModalButtonLayout>
				<Button type="solid" size="medium" label="확인" onClick={onDueDateSubmit} />
			</DueDateModalButtonLayout>
		</DueDateModalLayout>
	);
}

const DueDateModalLayout = styled.article`
	z-index: 5;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 41.6rem;
	height: auto;
	padding: 2.4rem 2.4rem 3.2rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	box-shadow:
		4px 4px 40px 20px #717e9833,
		-4px -4px 40px 0 #717e9833;
	border-radius: 20px;
`;

const DueDateModalHeadLayout = styled.section`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	width: 100%;
`;

const DueDateModalBodyLayout = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ModalTopButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ButtonBox = styled.div`
	display: flex;
	gap: 0.8rem;
	justify-content: flex-end;
	width: 100%;
`;

const DueDateModalButtonLayout = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 3.2rem;
`;

export default DueDateModal;
