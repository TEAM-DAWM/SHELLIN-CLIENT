import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import useDeleteTask from '@/apis/tasks/deleteTask/query';
import usePatchTaskDescription from '@/apis/tasks/editTask/query';
import useTaskDescription from '@/apis/tasks/taskDescription/query';
import useUpdateTaskStatus from '@/apis/tasks/updateTaskStatus/query';
import useUpdateTimeBlock from '@/apis/timeBlocks/updateTimeBlock/query';
import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import Button from '@/components/common/v2/button/Button';
import DropdownButton from '@/components/common/v2/control/DropdownButton';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';
import PopUp from '@/components/common/v2/TextBox/PopUp';
import { useToast } from '@/components/toast/ToastContext';
import useInput from '@/hooks/useInput';
import useOutsideClick from '@/hooks/useOutsideClick';
import { StatusType } from '@/types/tasks/taskType';
import { formatDatetoLocalDate, formatTimeByAllDay } from '@/utils/formatDateTime';
import formatTimeWithAmPm from '@/utils/formatTimeWithAmPm';
import { getRoundedFormattedCurrTime } from '@/utils/time';

interface MainSettingModalProps {
	isOpen: boolean;
	taskId: number;
	onClose: () => void;
	status: StatusType;
	targetDate: string;
	timeBlockId?: number;
	isAllTime?: boolean;
	isTimeblock?: boolean;
}

function MainSettingModal({
	isOpen,
	taskId,
	onClose,
	status,
	targetDate,
	timeBlockId,
	isAllTime = false,
	isTimeblock = false,
}: MainSettingModalProps) {
	const { mutate: deleteMutate } = useDeleteTask();
	const { mutateAsync: editMutate } = usePatchTaskDescription();
	const { mutateAsync: updateTimeBlockMutate } = useUpdateTimeBlock();
	const {
		data: taskDetailData,
		isFetched: isTaskDetailFetched,
		refetch,
	} = useTaskDescription({ taskId, targetDate, isOpen });
	const { mutate: updateStateMutate } = useUpdateTaskStatus(null);

	const [taskStatus, setTaskStatus] = useState(status);
	const [isAllDay, setIsAllDay] = useState(isAllTime);
	const [shouldOpenModal, setShouldOpenModal] = useState(false);

	// === useInput ===
	const {
		content: titleContent,
		onChange: onTitleChange,
		handleContent: handleTitle,
	} = useInput(taskDetailData?.name || '');
	const {
		content: descriptionContent,
		onChange: onDescriptionChange,
		handleContent: handleDesc,
	} = useInput(taskDetailData?.description || '');
	const { content: deadlineTime, handleContent: handleDeadlineTime } = useInput('');
	const { content: startTime, handleContent: handleStartTime } = useInput('');
	const { content: endTime, handleContent: handleEndTime } = useInput('');

	const [deadlineDate, setDeadlineDate] = useState<Date | null>(
		taskDetailData?.deadLine?.date ? new Date(taskDetailData.deadLine.date) : null
	);
	const [timeBlockDate, setTimeBlockDate] = useState<Date | null>(new Date(targetDate));
	const [isTimeBlockSelected, setIsTimeBlockSelected] = useState(!!timeBlockId);

	useEffect(() => {
		if (isTaskDetailFetched && taskDetailData) {
			handleTitle(taskDetailData.name || '');
			handleDesc(taskDetailData.description || '');
			handleDeadlineTime(taskDetailData?.deadLine?.time || '');
			handleStartTime(taskDetailData?.timeBlock?.startTime || '');
			handleEndTime(taskDetailData?.timeBlock?.endTime || '');

			setDeadlineDate(taskDetailData?.deadLine?.date ? new Date(taskDetailData.deadLine.date) : null);
			setShouldOpenModal(true);
			setIsTimeBlockSelected(!!taskDetailData?.timeBlock);
		}
	}, [taskDetailData, isTaskDetailFetched, isOpen]);

	useEffect(() => {
		setTaskStatus(status);
	}, [status]);

	if (isTaskDetailFetched) {
		if (!timeBlockId) {
			// eslint-disable-next-line no-param-reassign
			timeBlockId = taskDetailData?.timeBlock?.id;
		}
	}

	const modalRef = useOutsideClick<HTMLDivElement>({ onClose });

	const handleDeadlineDate = (date: Date | null) => {
		setDeadlineDate(date);
	};

	const handleTimeBlockDate = (date: Date | null) => {
		setTimeBlockDate(date);

		if (isAllDay) {
			handleStartTime(`${formatDatetoLocalDate(timeBlockDate)}T00:00`);
			handleEndTime(`${formatDatetoLocalDate(timeBlockDate)}T00:00`);
		} else {
			handleStartTime(`${formatDatetoLocalDate(date)}T${startTime.split('T')[1]}`);
			handleEndTime(`${formatDatetoLocalDate(date)}T${endTime.split('T')[1]}`);
		}
	};

	const { addToast } = useToast();

	const isvalidTimeRange = (start: string, end: string) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		return startDate <= endDate;
	};

	const handleConfirm = async () => {
		if (isTimeBlockSelected && !isvalidTimeRange(startTime, endTime)) {
			addToast('시작 시간은 종료 시간 이전이어야 합니다.', 'error');
			onClose();
			return;
		}

		try {
			await handleTimeBlockUpdate();
			await handleEdit();
		} catch (error) {
			console.error('handleConfirm error:', error);

			if (error === 'info') {
				return; // handleTimeBlockUpdate conflict나면 종료
			}
		} finally {
			onClose();
		}
	};

	const handleDelete = () => {
		if (taskId) {
			deleteMutate(taskId);
		}
		onClose();
	};

	const handleStatusEdit = (newStatus: StatusType) => {
		updateStateMutate({ taskId, targetDate, status: newStatus });
	};

	const handleEdit = async () => {
		try {
			await editMutate({
				taskId,
				name: titleContent,
				description: descriptionContent,
				deadLine: {
					date: formatDatetoLocalDate(deadlineDate) || null,
					time: deadlineTime.slice(0, 5) || null,
				},
			});

			handleStatusEdit(taskStatus);
			refetch();
		} catch (error) {
			console.error(error);
		}
	};

	const handleTaskStatusChange = (newStatus: StatusType) => {
		setTaskStatus(newStatus);
	};

	// 수정 이벤트 핸들러
	const handleTimeBlockUpdate = async () => {
		if (!timeBlockId) {
			console.log('타임블록 아이디없어서 리턴');
			return;
		}

		try {
			const formattedStartTime = formatTimeByAllDay(startTime, isAllDay, timeBlockDate);
			const formattedEndTime = formatTimeByAllDay(endTime, isAllDay, timeBlockDate);

			await updateTimeBlockMutate({
				taskId,
				timeBlockId,
				startTime: formattedStartTime,
				endTime: formattedEndTime,
				isAllTime: isAllDay,
			});
		} catch (error) {
			console.error('handleTimeBlockUpdate error:', error);
			throw new Error('info');
		}
	};

	// 하루종일 버튼 상태 변경 핸들러
	const handleAllDayToggle = () => {
		setIsAllDay((prev) => !prev);
	};

	if (!shouldOpenModal) return null;
	if (!isOpen) return null;

	return (
		<>
			<MainSettingModalLayout ref={modalRef} onClick={(e) => e.stopPropagation()}>
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
					<PopUp type="title" defaultValue={titleContent} onChange={onTitleChange} />
				</MainSettingModalHeadLayout>
				<MainSettingModalBodyLayout>
					<DeadlineBox
						date={deadlineDate || new Date()}
						endTime={deadlineTime || getRoundedFormattedCurrTime(new Date())}
						handleDueDateModalDate={handleDeadlineDate}
						handleDueDateModalTime={handleDeadlineTime}
						label="마감 기간"
						isDueDate={!!deadlineDate}
						hasDivider
					/>
					<PopUpTitleBox>
						<PopUp type="description" defaultValue={descriptionContent} onChange={onDescriptionChange} />
					</PopUpTitleBox>
					{isTimeblock && (
						<DeadlineBox
							date={timeBlockDate || new Date(targetDate)}
							startTime={formatTimeWithAmPm(startTime) || '23:59'}
							endTime={formatTimeWithAmPm(endTime) || '23:59'}
							label="진행 기간"
							isDueDate={!!isTimeBlockSelected}
							isAllDay={isAllDay}
							onAllDayToggle={handleAllDayToggle}
							onStartTimeChange={handleStartTime}
							onEndTimeChange={handleEndTime}
							handleTimeBlockDate={handleTimeBlockDate}
							hasDivider
						/>
					)}
				</MainSettingModalBodyLayout>
				<MainSettingModalButtonLayout>
					<Button type="solid" size="medium" label="확인" onClick={handleConfirm} />
				</MainSettingModalButtonLayout>
			</MainSettingModalLayout>
			<ModalBackdrop isBackgroundColor onClick={onClose} />
		</>
	);
}

const MainSettingModalLayout = styled.article`
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 5;
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
	transform: translate(-50%, -50%);
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
