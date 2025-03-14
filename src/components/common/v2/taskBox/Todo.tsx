import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import DropdownButton from '../control/DropdownButton';

import useUpdateTaskStatus from '@/apis/tasks/updateTaskStatus/query';
import MainSettingModal from '@/components/common/v2/modal/MainSettingModal';
import MODAL from '@/constants/modalLocation';
import { STATUS } from '@/types/tasks/taskType';
import { formatTimeToDueTime } from '@/utils/formatDateTime';

type StatusType = (typeof STATUS)[keyof typeof STATUS];

type TodoProps = {
	location: 'target' | 'staging';
	title: string;
	deadlineDate?: string;
	deadlineTime?: string;
	status: StatusType;
	isStatusVisible?: boolean;
	onClick: () => void;
	preventDoubleClick?: boolean;
	taskId: number;
	targetDate: string;
};

function Todo({
	location,
	title,
	deadlineDate,
	status: initStatus,
	isStatusVisible = true,
	deadlineTime,
	onClick,
	taskId,
	preventDoubleClick,
	targetDate,
}: TodoProps) {
	const [status, setStatus] = useState<StatusType>(initStatus);
	const isCompleted = status === STATUS.COMPLETE;

	const [isModalOpen, setModalOpen] = useState(false);

	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);

	useEffect(() => {
		setStatus(initStatus);
	}, [initStatus]);
	/** 모달 띄우기 */
	const handleDoubleClick = (e: React.MouseEvent) => {
		if (preventDoubleClick) {
			e.preventDefault();
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const calculatedTop = rect.top;
		const adjustedTop = Math.min(calculatedTop, MODAL.SCREEN_HEIGHT - MODAL.TASK_MODAL_HEIGHT);
		if (location === 'staging') {
			setTop(adjustedTop);
			setLeft(rect.width + 20);
		} else {
			setTop(adjustedTop);
			setLeft(rect.right + 12);
		}
		setModalOpen((prev) => !prev);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleStatusChange = (newStatus: StatusType) => {
		setStatus(newStatus);
	};

	const { mutate: updateStateMutate } = useUpdateTaskStatus(null);

	const handleStatusEdit = (newStatus: StatusType) => {
		updateStateMutate({ taskId, targetDate, status: newStatus });
	};

	return (
		<>
			<div className="todo-item">
				<TodoContainer isCompleted={isCompleted} onDoubleClick={handleDoubleClick} draggable onClick={onClick}>
					<TodoWrapper>
						<span className="todo-title">{title}</span>
						{deadlineDate && (
							<span className="todo-deadline">
								{deadlineDate} / {deadlineTime && formatTimeToDueTime(deadlineTime)}
							</span>
						)}
					</TodoWrapper>
					{isStatusVisible && (
						<DropdownWrapper>
							<DropdownButton
								status={status}
								handleStatusChange={handleStatusChange}
								handleStatusEdit={handleStatusEdit}
								isModalOpen={isModalOpen}
							/>
						</DropdownWrapper>
					)}
				</TodoContainer>
			</div>
			<MainSettingModal
				isOpen={isModalOpen}
				top={top}
				left={left}
				onClose={handleCloseModal}
				taskId={taskId}
				status={status}
				targetDate={targetDate}
			/>
		</>
	);
}

export default Todo;

const baseStyles = ({ theme }: { theme: Theme }) => css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	box-sizing: border-box;
	width: 100%;
	min-width: 43.2rem;

	background-color: ${theme.colorToken.Component.normal};
	border-radius: 12px;
`;

const textStyles = ({ theme, isCompleted }: { theme: Theme; isCompleted: boolean }) => css`
	.todo-title {
		display: -webkit-box;

		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

		color: ${isCompleted ? theme.colorToken.Text.assistive : theme.colorToken.Text.neutralLight};
		text-overflow: ellipsis;
		word-break: break-all;
		${isCompleted ? theme.font.body02 : theme.font.body01};
		${isCompleted && 'text-decoration: line-through;'};
	}

	.todo-deadline {
		color: ${isCompleted ? theme.colorToken.Text.disable : theme.colorToken.Text.assistive};
		${isCompleted ? theme.font.caption03 : theme.font.caption02};
		${isCompleted && 'text-decoration: line-through;'};
	}
`;

const TodoContainer = styled.div<{ isCompleted: boolean }>`
	${({ theme }) => baseStyles({ theme })}
	${({ theme, isCompleted }) => textStyles({ theme, isCompleted })}
	border: 1px solid
		${({ theme, isCompleted }) =>
		isCompleted ? theme.colorToken.Outline.neutralNormal : theme.colorToken.Outline.neutralStrong};

	&:hover {
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.primaryStrong};
	}

	&:active {
		background-color: ${({ theme }) => theme.colorToken.Component.strong};
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.primaryStrong};
	}
`;

const TodoWrapper = styled.div`
	display: flex;
	flex: 1 0 0;
	flex-direction: column;
	gap: 0.4rem;
	align-items: flex-start;
	padding: 1rem 2.4rem 1.4rem;
`;

const DropdownWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	height: 6.4rem;
	padding: 0.8rem 0.8rem 2.4rem 0;
`;
