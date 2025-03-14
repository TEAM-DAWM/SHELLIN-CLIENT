import styled from '@emotion/styled';
import { Draggable as FullCalendarDraggable } from 'fullcalendar/index.js';
import { useEffect } from 'react';
import { Draggable as BeautifulDnDDraggable } from 'react-beautiful-dnd';

import BtnTaskContainer from '../BtnTaskContainer';
import Todo from '../v2/taskBox/Todo';

import EmptyViewStaging from '@/components/common/EmptyViewStaging';
import { StatusType, TaskType } from '@/types/tasks/taskType';
import { formatDatetoStringKor } from '@/utils/formatDateTime';

interface StagingAreaTaskContainerProps {
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	tasks: TaskType[];
	targetDate?: string;
}

function StagingAreaTaskContainer({ handleSelectedTarget, selectedTarget, tasks }: StagingAreaTaskContainerProps) {
	useEffect(() => {
		const container = document.getElementById('dumping-task-container');

		if (container) {
			const draggable = new FullCalendarDraggable(container, {
				itemSelector: '.todo-item', // 드래그 가능한 요소
				eventData: () => {
					if (selectedTarget) {
						setTimeout(() => {
							const mirrorElement = document.querySelector('.fc-event-dragging');
							if (mirrorElement) {
								(mirrorElement as HTMLElement).style.opacity = '0';
								(mirrorElement as HTMLElement).style.backgroundColor = 'transparent';
							}
						}, 0);
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
				{!tasks || tasks?.length === 0 ? (
					<EmptyViewStaging />
				) : (
					<TaskWrapper>
						{tasks &&
							tasks.map((task: TaskType, index: number) => (
								<BeautifulDnDDraggable key={task.id} draggableId={task.id.toString()} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{
												...provided.draggableProps.style,
												borderRadius: '12px',
												boxShadow: snapshot.isDragging
													? '0 16px 20px rgb(0 0 0 / 12%), 0 8px 16px rgb(0 0 0 / 8%), 0 0 8px rgb(0 0 0 / 8%)'
													: 'none',
											}}
										>
											<Todo
												key={task.id}
												status={task.status as StatusType}
												title={task.name}
												// 이후 날짜, 시간 표시 형식에 맞게 입력 / 조정
												deadlineDate={formatDatetoStringKor(task.deadLine?.date)}
												deadlineTime={task.deadLine?.time || undefined}
												isStatusVisible={false}
												taskId={task.id}
												targetDate=""
												onClick={() => handleSelectedTarget(task)}
											/>
										</div>
									)}
								</BeautifulDnDDraggable>
							))}
						{/* <ScrollGradient /> */}
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
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	width: 100%;
	height: 100%;
`;
