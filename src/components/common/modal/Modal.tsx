import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';

import ModalBackdrop from './ModalBackdrop';

import useDeleteTask from '@/apis/tasks/deleteTask/query';
import usePatchTaskDescription from '@/apis/tasks/editTask/query';
import useTaskDescription from '@/apis/tasks/taskDescription/query';
import usePostTimeBlock from '@/apis/timeBlocks/postTimeBlock/query';
import BtnDate from '@/components/common/BtnDate/BtnDate';
import OkayCancelBtn from '@/components/common/button/OkayCancelBtn';
import ModalHeaderBtn from '@/components/common/modal/ModalHeaderBtn';
import ModalTextInputTime from '@/components/common/modal/ModalTextInputTime';
import TextInputBox from '@/components/common/modal/TextInputBox';
import { SizeType } from '@/types/textInputType';
import { BtnTaskLocationType } from '@/types/today/BtnTaskLocationType';
import { dotFormatTime } from '@/utils/formatDateTime';

interface ModalProps {
	isOpen: boolean;
	sizeType: SizeType;
	top: number;
	left: number;
	onClose: () => void;
	taskId: number;
	targetDate: string;
	location: BtnTaskLocationType;
}
function Modal({ isOpen, sizeType, top, left, onClose, taskId, targetDate, location }: ModalProps) {
	const [taskName, setTaskName] = useState('');
	const [desc, setDesc] = useState('');
	const [deadLineDate, setDeadLineDate] = useState('');
	const [deadLineTime, setDeadLineTime] = useState('');

	const { data, isFetched } = useTaskDescription({
		taskId,
		targetDate: location !== 'staging' ? targetDate : null,
		isOpen,
	});

	useEffect(() => {
		if (isFetched && data) {
			setTaskName(data.name);
			setDesc(data.description);
			setDeadLineDate(data.deadLine.date || '');
			setDeadLineTime(data.deadLine.time || '');

			setStartTime('');
			setEndTime('');
		}
	}, [isFetched, data]);

	const handleTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskName(event.target.value);
	};

	const handleDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setDesc(event.target.value);
	};

	const handleTaskDateChange = (newDate: string) => {
		setDeadLineDate(newDate);
	};

	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const formattedTime = dotFormatTime(event.target.value);
		setStartTime(formattedTime);
	};

	const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const formattedTime = dotFormatTime(event.target.value);
		setEndTime(formattedTime);
	};

	const { mutate: deleteMutate } = useDeleteTask();
	const { mutate: editMutate } = usePatchTaskDescription();
	const { mutate: createMutate } = usePostTimeBlock();

	// editMutate({ name, description, deadLine: { date, time } });

	const handleDelete = () => {
		console.log('taskId', taskId);

		if (taskId) {
			deleteMutate(taskId);
		} else {
			console.error('taskId가 존재하지 않습니다.');
		}

		onClose();

		setStartTime('');
		setEndTime('');
	};

	const handleAddTimeBlock = () => {
		if (taskId && startTime && endTime) {
			const formattedStartTime = `${targetDate}T${startTime}`;
			const formattedEndTime = `${targetDate}T${endTime}`;
			createMutate({ taskId, startTime: formattedStartTime, endTime: formattedEndTime });
		} else {
			console.log('taskId, startTime, endTime가 모두 존재하지 않습니다.');
		}

		onEdit();

		onClose();
	};

	const onEdit = () => {
		editMutate({
			taskId,
			name: taskName,
			description: desc,
			deadLine: { date: deadLineDate, time: deadLineTime },
		});

		onClose();
	};

	if (!isOpen || !isFetched) return null;
	return (
		<ModalBackdrop onClick={onClose}>
			<ModalLayout type={sizeType.type} top={top} left={left} onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<BtnDate date={deadLineDate} time={deadLineTime} handleDate={handleTaskDateChange} />
					<ModalHeaderBtn type={sizeType.type} onDelete={handleDelete} taskId={taskId} targetDate={targetDate} />
				</ModalHeader>
				<ModalBody>
					<TextInputBox
						type={sizeType.type}
						name={taskName}
						desc={desc}
						onTitleChange={handleTaskNameChange}
						onDescChange={handleDescChange}
					/>
					{sizeType.type === 'long' && (
						<ModalTextInputTime
							startTime={startTime}
							endTime={endTime}
							handleStartTimeChange={handleStartTimeChange}
							handleEndTimeChange={handleEndTimeChange}
						/>
					)}
				</ModalBody>
				<ModalFooter>
					<OkayCancelBtn type="cancel" onClick={onClose} />
					<OkayCancelBtn type="okay" onClick={sizeType.type === 'long' ? handleAddTimeBlock : onEdit} />
				</ModalFooter>
			</ModalLayout>
		</ModalBackdrop>
	);
}

const ModalLayout = styled.div<{ type: string; top: number; left: number }>`
	position: fixed;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
	z-index: 3;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	box-sizing: border-box;
	width: ${({ type }) => (type === 'long' ? '37.2rem' : '32.8rem')};
	padding: 1rem 1.2rem;
	overflow: hidden;

	background-color: ${({ theme }) => theme.palette.Grey.White};
	box-shadow: 0 1.2rem 3rem 0 rgb(0 0 0 / 30%);
	border-radius: 12px;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ModalBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const ModalFooter = styled.div`
	display: flex;
	gap: 0.4rem;
	justify-content: flex-end;
`;

export default Modal;
