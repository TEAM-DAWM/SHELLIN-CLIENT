import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';

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
	// handleSelectedTarget,
	// selectedTarget,
	tasks,
	targetDate,
}: StagingAreaTaskContainerProps) {
	return (
		<StagingAreaTaskContainerLayout>
			<BtnTaskContainer type="staging">
				{tasks?.length === 0 || !tasks ? (
					<EmptyContainer />
				) : (
					<TaskWrapper>
						{tasks &&
							tasks.map((task: TaskType, index: number) => (
								<Draggable key={task.id} draggableId={task.id.toString()} index={index}>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{ userSelect: 'none', ...provided.draggableProps.style }}
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
												targetDate={targetDate}
											/>
										</div>
									)}
								</Draggable>
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
