import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';

import DumpingAreaBtn from '../v2/TextBox/DumpingAreaBtn';

import StagingAreaTaskContainer from './StagingAreaTaskContainer';

import FilterSection from '@/components/targetArea/FilterSection';
import { StagingAreaProps } from '@/types/area/taskAreaType';

function StagingArea(props: StagingAreaProps) {
	const { handleSelectedTarget, selectedTarget, tasks, sortOrder, handleSortOrder, targetDate, isStagingOpen } = props;

	return (
		<StagingAreaLayout isOpen={isStagingOpen}>
			{/* task 입력란 */}
			<UpperContainer>
				<DumpingAreaBtn />
			</UpperContainer>

			{/* 정렬 버튼 */}
			<FilterSection sortOrder={sortOrder} handleSortOrder={handleSortOrder} />

			<BottomContainer>
				<Droppable droppableId="staging">
					{(provided) => (
						<SizedWrapper ref={provided.innerRef} {...provided.droppableProps} style={{ height: '100%' }}>
							<StagingAreaTaskContainer
								handleSelectedTarget={handleSelectedTarget}
								selectedTarget={selectedTarget}
								tasks={tasks}
								targetDate={targetDate}
							/>
							{provided.placeholder}
						</SizedWrapper>
					)}
				</Droppable>
			</BottomContainer>
		</StagingAreaLayout>
	);
}

export default StagingArea;

const SizedWrapper = styled.div`
	width: 100%;
`;

const StagingAreaLayout = styled.div<{ isOpen: boolean }>`
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-sizing: border-box;
	width: ${({ isOpen }) => (isOpen ? '44.8rem' : '0')};
	overflow: hidden;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border-right: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 0 40px 40px 0;

	transition: width 0.5s ease-in-out;
`;

const UpperContainer = styled.div`
	padding: 0 0.8rem;
	padding-top: 5.6rem;
	padding-bottom: 4.8rem;

	border-bottom: solid 1px ${({ theme }) => theme.color.Grey.Grey3};
`;

const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: 88rem;
	padding-bottom: 2.8rem;
`;
