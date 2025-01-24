import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import ModalBackdrop from '../modal/ModalBackdrop';
import SortingDropdown from '../v2/dropdown/SortingDropdown';
import IconButton from '../v2/IconButton';
import DumpingAreaBtn from '../v2/TextBox/DumpingAreaBtn';

import StagingAreaTaskContainer from './StagingAreaTaskContainer';

import { TaskType } from '@/types/tasks/taskType';
import { StagingAreaSettingProps } from '@/types/today/stagingAreaSettingProps';

interface StagingAreaProps extends StagingAreaSettingProps {
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	tasks: TaskType[];
	targetDate: string;
	isStagingOpen: boolean;
}

function StagingArea(props: StagingAreaProps) {
	const { handleSelectedTarget, selectedTarget, tasks, sortOrder, handleSortOrder, targetDate, isStagingOpen } = props;

	const [isSortModalOpen, setIsSortModalOpen] = useState(false);
	const handleArrangeBtnClick = () => {
		setIsSortModalOpen((prev) => !prev);
	};
	const handleCloseModal = () => {
		setIsSortModalOpen(false);
	};
	const isIconBtnDotted = sortOrder !== 'CUSTOM_ORDER';
	return (
		<StagingAreaLayout isOpen={isStagingOpen}>
			<UpperContainer>
				<DumpingAreaBtn />
			</UpperContainer>

			<IconContainer>
				<IconButton
					iconName="IcnFilter"
					size="small"
					type="normal"
					onClick={handleArrangeBtnClick}
					dot={isIconBtnDotted}
				/>
			</IconContainer>

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
			{isSortModalOpen && <SortingDropdown handleSortOrder={handleSortOrder} />}
			{isSortModalOpen && <ModalBackdrop onClick={handleCloseModal} />}
		</StagingAreaLayout>
	);
}

export default StagingArea;

const SizedWrapper = styled.div`
	width: 100%;
`;
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
	display: none;
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
	display: none;
  }
`;

const StagingAreaLayout = styled.div<{ isOpen: boolean }>`
	position: relative;
	z-index: 1;
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	width: 44.8rem;
	height: 108rem;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border-right: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 0 40px 40px 0;

	animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.6s ease forwards;
`;

const UpperContainer = styled.div`
	padding: 0 0.8rem;
	padding-top: 5.6rem;
	padding-bottom: 4.8rem;

	border-bottom: solid 1px ${({ theme }) => theme.color.Grey.Grey3};
`;
const IconContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	width: 100%;
	height: 4.8rem;
	padding: 0.8rem 1.6rem;
`;
const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: 88rem;
	padding-bottom: 2.8rem;
`;
