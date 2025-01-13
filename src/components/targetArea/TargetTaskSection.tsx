import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';

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
	console.log(handleSelectedTarget, selectedTarget, targetDate);
	return (
		<BtnTaskContainer type="target">
			{tasks.length === 0 ? (
				<EmptyLayout>
					<EmptyContainer />
				</EmptyLayout>
			) : (
				<>
					{tasks.map((task: TaskType, index: number) => (
						<Draggable key={task.id} draggableId={task.id.toString()} index={index}>
							{(provided) => (
								<TodoSizedWrapper
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									style={provided.draggableProps.style}
								>
									<Todo
										// location="target"
										key={task.id}
										title={task.name}
										deadlineDate={formatDatetoStringKor(task.deadLine?.date)}
										deadlineTime={task.deadLine?.time || undefined}
										status={task.status}
										// id={task.id}
										// handleSelectedTarget={handleSelectedTarget}
										// selectedTarget={selectedTarget}
										// isDragging={snapshot.isDragging}
										// targetDate={targetDate}
										// dashBoardInprogress={false}
									/>
								</TodoSizedWrapper>
							)}
						</Draggable>
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
