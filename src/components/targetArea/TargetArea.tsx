import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';

import TargetControlSection from './TargetControlSection';
import TargetTaskSection from './TargetTaskSection';

import MainDate from '@/components/common/v2/TextBox/MainDate';
import TargetFilterSection from '@/components/targetArea/TargetFilterSection';
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
	const dateTypeDate = new Date(targetDate);
	const month = dateTypeDate.getMonth() + 1;
	const day = dateTypeDate.getDate();
	return (
		<TargetAreaLayout>
			{/* 날짜 */}
			<DateWrapper>
				<MainDate month={month} day={day} />
			</DateWrapper>

			{/* 버튼 */}
			<TargetControlSection
				onClickPrevDate={onClickPrevDate}
				onClickNextDate={onClickNextDate}
				onClickTodayDate={onClickTodayDate}
				onClickDatePicker={onClickDatePicker}
				targetDate={targetDate}
			/>
			{/* 정렬 버튼 */}
			<TargetFilterSection />
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
	box-sizing: border-box;
	width: 47.2rem;
	margin: 0.8rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 20px;
`;

// 변화 가능성 있어 우선 wrapper로 컴포넌트에 간접적으로 간격 조정함
const DateWrapper = styled.div`
	padding: 5.6rem 0 1.6rem 2.4rem;
`;

export default TargetArea;
