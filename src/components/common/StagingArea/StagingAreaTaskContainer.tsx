import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';

import BtnTaskContainer from '../BtnTaskContainer';
import EmptyContainer from '../EmptyContainer';
import ScrollGradient from '../ScrollGradient';
import Todo, { StatusType } from '../v2/taskBox/Todo';

import { TaskType } from '@/types/tasks/taskType';

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
	// targetDate,
}: StagingAreaTaskContainerProps) {
	return (
		<StagingAreaTaskContainerLayout>
			<BtnTaskContainer type="staging">
				{tasks.length === 0 ? (
					<EmptyContainer />
				) : (
					<>
						{tasks.map((task: TaskType, index: number) => (
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
											deadline={`${task.deadLine?.date} / ${task.deadLine?.time} 까지` || ''}
											isStatusVisible={false}
										/>
									</div>
								)}
							</Draggable>
						))}
						<ScrollGradient />
					</>
				)}
			</BtnTaskContainer>
		</StagingAreaTaskContainerLayout>
	);
}

export default StagingAreaTaskContainer;

const StagingAreaTaskContainerLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	width: 100%;
`;
