import styled from '@emotion/styled';
import { Draggable as FullCalendarDraggable } from 'fullcalendar/index.js';
import { useEffect } from 'react';
import { Draggable as BeautifulDnDDraggable } from 'react-beautiful-dnd';

import BtnTaskContainer from '../common/BtnTaskContainer';

import EmptyViewToday from '@/components/common/EmptyViewToday';
import Todo from '@/components/common/v2/taskBox/Todo';
import useTaskSelectionStore from '@/store/useTaskSelectionStore';
import { TaskType } from '@/types/tasks/taskType';
import { formatDatetoStringKor } from '@/utils/formatDateTime';

interface TargetTaskSectionProps {
	tasks: TaskType[];
	targetDate: string;
}
function TargetTaskSection({ tasks, targetDate }: TargetTaskSectionProps) {
	const { selectedTask } = useTaskSelectionStore();

	useEffect(() => {
		const container = document.getElementById('todolist-task-container');
		// eslint-disable-next-line react-hooks/rules-of-hooks

		if (container) {
			const draggable = new FullCalendarDraggable(container, {
				itemSelector: '.todo-item',
				eventData: () => {
					if (selectedTask) {
						setTimeout(() => {
							const mirrorElement = document.querySelector('.fc-event-dragging');
							if (mirrorElement) {
								(mirrorElement as HTMLElement).style.opacity = '0';
								(mirrorElement as HTMLElement).style.backgroundColor = 'transparent';
							}
						}, 0);
						return {
							id: selectedTask.id.toString(),
							title: selectedTask.name,
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
	}, [selectedTask]);

	return (
		<BtnTaskContainer id="todolist-task-container" type="target">
			{!tasks || tasks?.length === 0 ? (
				<EmptyLayout>
					<EmptyViewToday />
				</EmptyLayout>
			) : (
				<TargetAreaWrapper>
					{tasks.map((task: TaskType, index: number) => (
						<BeautifulDnDDraggable key={task.id} draggableId={task.id.toString()} index={index}>
							{(provided, snapshot) => (
								<TodoSizedWrapper
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
										title={task.name}
										deadlineDate={formatDatetoStringKor(task.deadLine?.date)}
										deadlineTime={task.deadLine?.time || undefined}
										taskId={task.id}
										task={task}
										targetDate={targetDate}
										status={task.status}
									/>
								</TodoSizedWrapper>
							)}
						</BeautifulDnDDraggable>
					))}
				</TargetAreaWrapper>
			)}
		</BtnTaskContainer>
	);
}

export default TargetTaskSection;
const TodoSizedWrapper = styled.div`
	width: 100%;
`;
const TargetAreaWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: 88rem;
	padding-bottom: 2.8rem;
`;
const EmptyLayout = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
