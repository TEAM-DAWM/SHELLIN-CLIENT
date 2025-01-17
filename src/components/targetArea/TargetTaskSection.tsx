import styled from '@emotion/styled';
import { Draggable as FullCalendarDraggable } from 'fullcalendar/index.js';
import { useEffect } from 'react';
import { Draggable as BeautifulDnDDraggable } from 'react-beautiful-dnd';

import BtnTaskContainer from '../common/BtnTaskContainer';
import EmptyContainer from '../common/EmptyContainer';

import Todo from '@/components/common/v2/taskBox/Todo';
import { TaskType } from '@/types/tasks/taskType';
import formatDatetoStringKor from '@/utils/formatDatetoStringKor';

interface TargetTaskSectionProps {
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	tasks: TaskType[];
	targetDate: string;
}
function TargetTaskSection({ handleSelectedTarget, selectedTarget, tasks, targetDate }: TargetTaskSectionProps) {
	// TODO: 추후에 해당 로직을 연결해야 합니다.
	// console.log(handleSelectedTarget, selectedTarget, targetDate);

	useEffect(() => {
		const container = document.getElementById('task-container');

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
		<BtnTaskContainer id="task-container" type="target">
			{tasks.length === 0 ? (
				<EmptyLayout>
					<EmptyContainer />
				</EmptyLayout>
			) : (
				<>
					{tasks.map((task: TaskType, index: number) => (
						<BeautifulDnDDraggable key={task.id} draggableId={task.id.toString()} index={index}>
							{(provided) => (
								<TodoSizedWrapper
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									style={provided.draggableProps.style}
								>
									<div
										className="todo-item" // FullCalendarDraggable 대상
									>
										<Todo
											// location="target"
											key={task.id}
											title={task.name}
											deadlineDate={formatDatetoStringKor(task.deadLine?.date)}
											deadlineTime={task.deadLine?.time || undefined}
											status={task.status}
											onClick={() => handleSelectedTarget(task)}
											// id={task.id}
											// handleSelectedTarget={handleSelectedTarget}
											// selectedTarget={selectedTarget}
											// isDragging={snapshot.isDragging}
											// targetDate={targetDate}
											// dashBoardInprogress={false}
										/>
									</div>
								</TodoSizedWrapper>
							)}
						</BeautifulDnDDraggable>
					))}
				</>
			)}
		</BtnTaskContainer>
	);
}

export default TargetTaskSection;

const TodoSizedWrapper = styled.div`
	width: 100%;
`;
const EmptyLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
