import styled from '@emotion/styled';
import { useState } from 'react';

import useDeleteTask from '@/apis/tasks/deleteTask/query';
import useUpdateTaskStatus from '@/apis/tasks/updateTaskStatus/query';
import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import Button from '@/components/common/v2/button/Button';
import DropdownButton from '@/components/common/v2/control/DropdownButton';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';
import PopUp from '@/components/common/v2/TextBox/PopUp';
import { StatusType } from '@/types/tasks/taskType';

interface MainSettingModalProps {
	isOpen: boolean;
	top: number;
	left: number;
	taskId: number;
	onClose: () => void;
	targetDate: string;
	status: StatusType;
}

function MainSettingModal({
	isOpen,
	top,
	left,
	taskId,
	onClose,
	targetDate,
	status: initStatus,
}: MainSettingModalProps) {
	const [status, setStatus] = useState<StatusType>(initStatus);
	const { mutate: deleteMutate } = useDeleteTask();
	const { mutate: updateStateMutate } = useUpdateTaskStatus(null);

	const handleStatusChange = (newStatus: StatusType) => {
		setStatus(newStatus);
	};

	const handleDelete = () => {
		if (taskId) {
			deleteMutate(taskId);
		}
		onClose();
	};

	const handleStatusEdit = () => {
		updateStateMutate({ taskId, targetDate, status });

		onClose();
	};

	if (!isOpen) return null;

	return (
		<ModalBackdrop onClick={onClose}>
			<MainSettingModalLayout top={top} left={left} onClick={(e) => e.stopPropagation()}>
				<MainSettingModalHeadLayout>
					<ModalTopButtonBox>
						<DropdownButton status={status} handleStatusChange={handleStatusChange} />
						<ButtonBox>
							<IconButton iconName="IcnDelete" type="normal" size="small" onClick={handleDelete} />
							<IconButton iconName="IcnX" type="normal" size="small" onClick={onClose} />
						</ButtonBox>
					</ModalTopButtonBox>
					<PopUp type="title" />
				</MainSettingModalHeadLayout>
				<MainSettingModalBodyLayout>
					<DeadlineBox date={new Date()} endTime="06:00pm" label="마감 기간" />
					<PopUpTitleBox>
						<PopUp type="description" />
					</PopUpTitleBox>
					<DeadlineBox date={new Date()} startTime="11:00am" endTime="06:00pm" label="진행 기간" />
				</MainSettingModalBodyLayout>
				<MainSettingModalButtonLayout>
					<Button type="solid" size="medium" label="확인" onClick={handleStatusEdit} />
				</MainSettingModalButtonLayout>
			</MainSettingModalLayout>
		</ModalBackdrop>
	);
}

const MainSettingModalLayout = styled.article<{ top: number; left: number }>`
	position: fixed;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
	z-index: 3;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
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

const MainSettingModalHeadLayout = styled.section`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	width: 100%;
	height: 9.2rem;
`;

const MainSettingModalBodyLayout = styled.section`
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
`;

const PopUpTitleBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 5.9rem;
`;

const MainSettingModalButtonLayout = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 3.2rem;
`;

export default MainSettingModal;
