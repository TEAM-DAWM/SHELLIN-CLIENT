import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import useDeleteTask from '@/apis/tasks/deleteTask/query';
import usePatchTaskDescription from '@/apis/tasks/editTask/query';
import useTaskDescription from '@/apis/tasks/taskDescription/query';
import useUpdateTimeBlock from '@/apis/timeBlocks/updateTimeBlock/query';
import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import Button from '@/components/common/v2/button/Button';
import DropdownButton from '@/components/common/v2/control/DropdownButton';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';
import PopUp from '@/components/common/v2/TextBox/PopUp';
import useInput from '@/hooks/useInput';
import useOutsideClick from '@/hooks/useOutsideClick';
import { StatusType } from '@/types/tasks/taskType';
import { formatDatetoLocalDate } from '@/utils/formatDateTime';
import { getRoundedFormattedCurrTime } from '@/utils/time';

interface MainSettingModalProps {
	isOpen: boolean;
	top: number;
	left: number;
	taskId: number;
	onClose: () => void;
	status: StatusType;
	handleStatusEdit: (newStatus: StatusType) => void;
	targetDate: string;
	timeBlockId?: number;
	isAllTime?: boolean;
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
	timeBlockId,
	isAllTime = false,
}: MainSettingModalProps) {
	const { mutate: deleteMutate } = useDeleteTask();
	const { mutate: editMutate } = usePatchTaskDescription();
	const { mutate: updateTimeBlockMutate } = useUpdateTimeBlock();
	const [taskStatus, setTaskStatus] = useState(status);
	const [isAllDay, setIsAllDay] = useState(isAllTime);

	// === useInput ===
	const { content: titleContent, onChange: onTitleChange, handleContent: handleTitle } = useInput('');
	const { content: descriptionContent, onChange: onDescriptionChange, handleContent: handleDesc } = useInput('');
	const { content: deadlineTime, handleContent: handleDeadlineTime } = useInput('');
	const { content: startTime, handleContent: handleStartTime } = useInput('');
	const { content: endTime, handleContent: handleEndTime } = useInput('');
	const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
	const [timeBlockDate, setTimeBlockDate] = useState<Date | null>(new Date(targetDate));

	const {
		data: taskDetailData,
		isLoading: isTaskDetailLoading,
		isFetched: isTaskDetailFetched,
	} = useTaskDescription({ taskId, targetDate, isOpen });

	const [shouldOpenModal, setShouldOpenModal] = useState(false);

	useEffect(() => {
		// 데이터를 다 불러온 후에 모달을 띄움
		if (!isTaskDetailLoading && isTaskDetailFetched) {
			setShouldOpenModal(true);
		}
	}, [isTaskDetailLoading, isTaskDetailFetched]);

	if (isTaskDetailFetched) {
		if (!timeBlockId) {
			// eslint-disable-next-line no-param-reassign
			timeBlockId = taskDetailData?.timeBlock?.id;
		}
	}

	useEffect(() => {
		if (isTaskDetailFetched) {
			handleTitle(taskDetailData?.name || '');
			handleDesc(taskDetailData?.description || '');
			handleDeadlineDate(taskDetailData?.deadLine.date ? new Date(taskDetailData?.deadLine.date) : null);
			handleDeadlineTime(taskDetailData?.deadLine.time || '');
			handleStartTime(taskDetailData?.timeBlock?.startTime || '');
			handleEndTime(taskDetailData?.timeBlock?.endTime || '');
			setIsAllDay(isAllDay || false);
		}
	}, [isTaskDetailFetched, isOpen]);

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

	const handleConfirm = () => {
		handleEdit();
		handleTimeBlockUpdate();
		onClose();
	};

	const handleDelete = () => {
		if (taskId) {
			deleteMutate(taskId);
		}
		onClose();
	};

	const handleEdit = async () => {
		await new Promise((resolve) => {
			editMutate(
				{
					taskId,
					name: titleContent,
					description: descriptionContent,
					deadLine: {
						date: formatDatetoLocalDate(deadlineDate) || null,
						time: deadlineTime || null,
					},
				},
				{
					onSuccess: resolve,
				}
			);
		});
		handleStatusEdit(taskStatus); // task 상세 수정 완료 후 상태 변경 실행
	};

	const handleTaskStatusChange = (newStatus: StatusType) => {
		setTaskStatus(newStatus);
	};

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

	// 수정 이벤트 핸들러
	const handleTimeBlockUpdate = () => {
		if (!timeBlockId) {
			console.log('타임블록 아이디없어서 리턴');
			return;
		}

		const formattedStartTime = isAllDay
			? `${timeBlockDate ? new Date(timeBlockDate).toISOString().split('T')[0] : startTime.split('T')[0]}T00:00`
			: startTime;
		const formattedEndTime = isAllDay
			? `${timeBlockDate ? new Date(timeBlockDate).toISOString().split('T')[0] : endTime.split('T')[0]}T00:00`
			: endTime;

		updateTimeBlockMutate({
			taskId,
			timeBlockId,
			startTime: formattedStartTime,
			endTime: formattedEndTime,
			isAllTime: isAllDay,
		});
	};

	// 하루종일 버튼 상태 변경 핸들러
	const handleAllDayToggle = () => {
		setIsAllDay((prev) => !prev);
	};

	if (!shouldOpenModal) return null;
	if (!isOpen) return null;
	if (isTaskDetailLoading) return <div />;

	return (
		<>
			<MainSettingModalLayout ref={modalRef} top={top} left={left} onClick={(e) => e.stopPropagation()}>
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
					{timeBlockId && (
						<DeadlineBox
							date={timeBlockDate || new Date(targetDate)}
							startTime={formatTimeWithAmPm(startTime) || '23:59'}
							endTime={formatTimeWithAmPm(endTime) || '23:59'}
							label="진행 기간"
							isDueDate={!!timeBlockId}
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
			<ModalBackdrop onClick={onClose} />
		</>
	);
}

const MainSettingModalLayout = styled.article<{ top: number; left: number }>`
	position: fixed;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
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
