import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';

import TargetAreaDate from './TargetAreaDate';
import TargetControlSection from './TargetControlSection';
import TargetTaskSection from './TargetTaskSection';

import { TaskType } from '@/types/tasks/taskType';
import { TargetControlSectionProps } from '@/types/today/TargetControlSectionProps';
import formatDatetoLocalDate from '@/utils/formatDatetoLocalDate';

interface TargetAreaProps extends TargetControlSectionProps {
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	tasks: TaskType[];
}

function TargetArea({
	handleSelectedTarget,
	selectedTarget,
	tasks,
	onClickPrevDate,
	onClickNextDate,
	onClickTodayDate,
	onClickDatePicker,
	targetDate,
}: TargetAreaProps) {
	return (
		<TargetAreaLayout>
			{/* 날짜 */}
			<DateWrapper>
				<TargetAreaDate targetDate={targetDate} />
			</DateWrapper>

			{/* 버튼 */}
			<TargetControlSection
				onClickPrevDate={onClickPrevDate}
				onClickNextDate={onClickNextDate}
				onClickTodayDate={onClickTodayDate}
				onClickDatePicker={onClickDatePicker}
				targetDate={targetDate}
			/>
			{/* 태스크 목록 */}
			<Droppable droppableId="target">
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<TargetTaskSection
							handleSelectedTarget={handleSelectedTarget}
							selectedTarget={selectedTarget}
							tasks={tasks}
							targetDate={formatDatetoLocalDate(targetDate)}
						/>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</TargetAreaLayout>
	);
}
const TargetAreaLayout = styled.section`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	align-items: flex-start;
	width: 31.8rem;
	height: 74.8rem;
	margin: 1rem;
	padding: 0 0.1rem 0 0.7rem;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 12px;
`;

// 변화 가능성 있어 우선 wrapper로 컴포넌트에 간접적으로 간격 조정함
const DateWrapper = styled.div`
	padding: 1.8rem 0 2rem;
`;

export default TargetArea;
