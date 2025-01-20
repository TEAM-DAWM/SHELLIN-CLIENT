import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import useDeleteTask from '@/apis/tasks/deleteTask/query';
import useTaskDescription from '@/apis/tasks/taskDescription/query';
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
	status: StatusType;
	handleStatusEdit: (newStatus: StatusType) => void;
	targetDate: string;
}

function MainSettingModal({
	isOpen,
	top,
	left,
	taskId,
	onClose,
	status,
	handleStatusEdit,
	targetDate,
}: MainSettingModalProps) {
	const { mutate: deleteMutate } = useDeleteTask();
	const [taskStatus, setTaskStatus] = useState(status);
	const { data: taskDetailData } = useTaskDescription({ taskId, targetDate });
	useEffect(() => {
		setTaskStatus(status);
	}, [status]);

	const handleConfirm = () => {
		handleStatusEdit(taskStatus);
		onClose();
	};

	const handleDelete = () => {
		if (taskId) {
			deleteMutate(taskId);
		}
		onClose();
	};

	const handleTaskStatusChange = (newStatus: StatusType) => {
		setTaskStatus(newStatus);
	};

	if (!isOpen) return null;

	return (
		<ModalBackdrop onClick={onClose}>
			<MainSettingModalLayout top={top} left={left} onClick={(e) => e.stopPropagation()}>
				<MainSettingModalHeadLayout>
					<ModalTopButtonBox>
						<DropdownButton
							status={taskStatus}
							handleStatusChange={handleTaskStatusChange}
							handleStatusEdit={handleStatusEdit}
							isModalOpen={isOpen}
						/>
						<ButtonBox>
							<IconButton iconName="IcnDelete" type="normal" size="small" onClick={handleDelete} />
							<IconButton iconName="IcnX" type="normal" size="small" onClick={onClose} />
						</ButtonBox>
					</ModalTopButtonBox>
					<PopUp type="title" defaultValue={taskDetailData.data.name} />
				</MainSettingModalHeadLayout>
				<MainSettingModalBodyLayout>
					<DeadlineBox
						date={taskDetailData.data.deadline ? new Date(taskDetailData.data.deadline.date) : new Date()}
						endTime={taskDetailData.data.deadline ? taskDetailData.data.deadline.time : '06:00pm'}
						label="마감 기간"
					/>
					<PopUpTitleBox>
						<PopUp type="description" defaultValue={taskDetailData.data.description} />
					</PopUpTitleBox>
					<DeadlineBox date={new Date()} startTime="11:00am" endTime="06:00pm" label="진행 기간" />
				</MainSettingModalBodyLayout>
				<MainSettingModalButtonLayout>
					<Button type="solid" size="medium" label="확인" onClick={handleConfirm} />
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
