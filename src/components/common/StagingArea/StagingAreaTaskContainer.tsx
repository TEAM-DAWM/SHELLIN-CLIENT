import styled from '@emotion/styled';
import { Draggable as FullCalendarDraggable } from 'fullcalendar/index.js';
import { useEffect } from 'react';
import { Draggable as BeautifulDnDDraggable } from 'react-beautiful-dnd';

import BtnTaskContainer from '../BtnTaskContainer';
import EmptyContainer from '../EmptyContainer';
import ScrollGradient from '../ScrollGradient';
import Todo from '../v2/taskBox/Todo';

import { StatusType, TaskType } from '@/types/tasks/taskType';
import formatDatetoStringKor from '@/utils/formatDatetoStringKor';

interface StagingAreaTaskContainerProps {
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	tasks: TaskType[];
	targetDate: string;
}

function StagingAreaTaskContainer({
	handleSelectedTarget,
	selectedTarget,
	tasks,
	// targetDate,
}: StagingAreaTaskContainerProps) {
	useEffect(() => {
		const container = document.getElementById('dumping-task-container');

		if (container) {
			const draggable = new FullCalendarDraggable(container, {
				itemSelector: '.todo-item', // 드래그 가능한 요소
				eventData: () => {
					if (selectedTarget) {
						return {
							id: selectedTarget.id.toString(),
							title: selectedTarget.name,
						};
					}
					return null;
				},
			});

			// 컴포넌트 언마운트 시 FullCalendarDraggable 정리
			return () => {
				draggable.destroy?.();
			};
		}

		return undefined;
	}, [selectedTarget]);

	return (
		<StagingAreaTaskContainerLayout>
			<BtnTaskContainer id="dumping-task-container" type="staging">
				{tasks?.length === 0 || !tasks ? (
					<EmptyContainer />
				) : (
					<TaskWrapper>
						{tasks &&
							tasks.map((task: TaskType, index: number) => (
								<BeautifulDnDDraggable key={task.id} draggableId={task.id.toString()} index={index}>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{ userSelect: 'none', ...provided.draggableProps.style }}
										>
											<div
												className="todo-item" // FullCalendarDraggable 대상
											>
												<Todo
													key={task.id}
													status={task.status as StatusType}
													title={task.name}
													// 이후 날짜, 시간 표시 형식에 맞게 입력 / 조정
													deadlineDate={formatDatetoStringKor(task.deadLine?.date)}
													deadlineTime={task.deadLine?.time || undefined}
													isStatusVisible={false}
													onClick={() => handleSelectedTarget(task)}
												/>
											</div>
										</div>
									)}
								</BeautifulDnDDraggable>
							))}
						<ScrollGradient />
					</TaskWrapper>
				)}
			</BtnTaskContainer>
		</StagingAreaTaskContainerLayout>
	);
}

export default StagingAreaTaskContainer;
const TaskWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
`;
const StagingAreaTaskContainerLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	width: 100%;
`;
