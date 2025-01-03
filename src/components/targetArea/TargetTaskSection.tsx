import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';

import BtnTask from '../common/BtnTask/BtnTask';
import BtnTaskContainer from '../common/BtnTaskContainer';
import EmptyContainer from '../common/EmptyContainer';

import { TaskType } from '@/types/tasks/taskType';

interface TargetTaskSectionProps {
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	tasks: TaskType[];
	targetDate: string;
}
function TargetTaskSection(props: TargetTaskSectionProps) {
	const { handleSelectedTarget, selectedTarget, tasks, targetDate } = props;

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
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									style={{ userSelect: 'none', ...provided.draggableProps.style }}
								>
									<BtnTask
										location="target"
										key={task.id}
										name={task.name}
										deadLine={task.deadLine}
										btnStatus={task.status}
										status={task.status}
										id={task.id}
										handleSelectedTarget={handleSelectedTarget}
										selectedTarget={selectedTarget}
										isDragging={snapshot.isDragging}
										targetDate={targetDate}
										dashBoardInprogress={false}
										modalSize={{ type: 'long' }}
									/>
								</div>
							)}
						</Draggable>
					))}
				</>
			)}
		</BtnTaskContainer>
	);
}

export default TargetTaskSection;

const EmptyLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 90%;
`;
