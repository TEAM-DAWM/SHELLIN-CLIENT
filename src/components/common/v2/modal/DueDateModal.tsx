import styled from '@emotion/styled';
import { useState } from 'react';

import Button from '@/components/common/v2/button/Button';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';
import { getDisplayCurrTime, getFormattedCurrTime } from '@/utils/time';

interface DueDateModalType {
	todoTime: string;
	todoDate?: Date;
	handleTodoTime: (selectedTodoTime: string) => void;
	handleTodoDate: (selectedTodoDate: Date) => void;
	handleSettingModal: () => void;
}
function DueDateModal({ todoTime, todoDate, handleTodoDate, handleTodoTime, handleSettingModal }: DueDateModalType) {
	// 모달 내부 state들, Button 누를시 상위 컴포넌트 state로 들어감
	const defaultDate = new Date();

	const dateAfter14Days = defaultDate;
	dateAfter14Days.setDate(defaultDate.getDate() + 14);

	const [dueDateTime, setDueDateTime] = useState(todoTime || getFormattedCurrTime(defaultDate));
	const [dueDateDate, setDueDateDate] = useState(todoDate || dateAfter14Days);

	const onDueDateSubmit = () => {
		handleTodoDate(dueDateDate);
		handleTodoTime(dueDateTime);
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
					endTime={getDisplayCurrTime(defaultDate)}
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
	position: absolute;
	top: 8.8rem;
	left: 0.8rem;
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
