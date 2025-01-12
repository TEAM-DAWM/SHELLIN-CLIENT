import styled from '@emotion/styled';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import useGetTasks from '@/apis/tasks/getTask/query';
import useUpdateTaskStatus from '@/apis/tasks/updateTaskStatus/query';
import BtnTaskContainer from '@/components/common/BtnTaskContainer';
import FullCalendarBox from '@/components/common/fullCalendar/FullCalendarBox';
import NavBar from '@/components/common/NavBar';
import StagingArea from '@/components/common/StagingArea/StagingArea';
import TargetArea from '@/components/targetArea/TargetArea';
import { SortOrderType } from '@/constants/sortType';
import { AreaType } from '@/types/area/areaType';
import { TaskType } from '@/types/tasks/taskType';
import formatDatetoLocalDate from '@/utils/formatDatetoLocalDate';

function Today() {
	const [selectedTarget, setSelectedTarget] = useState<TaskType | null>(null);
	const [activeButton, setActiveButton] = useState<'전체' | '지연'>('전체');
	const [sortOrder, setSortOrder] = useState<SortOrderType>('CUSTOM_ORDER');
	const [selectedDate, setTargetDate] = useState(new Date());
	const targetDate = formatDatetoLocalDate(selectedDate);
	const [selectedArea, setSelectedArea] = useState<AreaType>(null);
	const [isDumpAreaOpen, setDumpAreaOpen] = useState(true);

	// Task 목록 Get
	const { data: stagingData } = useGetTasks({ sortOrder });
	const { data: targetData, isError: isTargetError } = useGetTasks({ sortOrder, targetDate });
	const { mutate, queryClient } = useUpdateTaskStatus(null);
	const handleSidebar = () => {
		setDumpAreaOpen((prev) => !prev);
	};

	/** isTotal 핸들링 함수 */
	const handleTextBtnClick = (button: '전체' | '지연') => {
		setActiveButton(button);
	};

	const handleSortOrder = (order: SortOrderType) => {
		setSortOrder(order);
	};

	const handleSelectedTarget = (task: TaskType | null, area: AreaType) => {
		setSelectedTarget(task);
		setSelectedArea(area);
	};

	const handlePrevBtn = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 1);
		setTargetDate(newDate);
	};

	const handleNextBtn = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 1);
		setTargetDate(newDate);
	};

	const handleTodayBtn = () => {
		setTargetDate(new Date());
	};

	const handleChangeDate = (target: Date) => {
		setTargetDate(target);
	};

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// 드래그가 끝난 위치가 없으면 리턴
		if (!destination) return;

		// sourceTasks와 destinationTasks를 배열로 변환
		const sourceTasks = source.droppableId === 'target' ? [...targetData] : [...stagingData];
		const destinationTasks = destination.droppableId === 'target' ? [...targetData] : [...stagingData];

		// 드래그된 항목을 sourceTasks에서 제거하고 destinationTasks에 추가
		const [movedTask] = sourceTasks.splice(source.index, 1);
		destinationTasks.splice(destination.index, 0, movedTask);

		// 상태 업데이트
		if (source.droppableId === 'target') {
			queryClient.setQueryData(['tasks'], {
				target: { ...targetData, data: { ...targetData, tasks: sourceTasks } },
				staging: { ...stagingData, data: { ...stagingData, tasks: destinationTasks } },
			});
		} else {
			queryClient.setQueryData(['tasks'], {
				target: { ...targetData, data: { ...targetData, tasks: destinationTasks } },
				staging: { ...stagingData, data: { ...stagingData, tasks: sourceTasks } },
			});
		}

		// API 호출
		if (destination.droppableId === 'target') {
			mutate({
				taskId: movedTask.id,
				targetDate,
				status: '미완료',
			});
		} else if (destination.droppableId === 'staging') {
			mutate({
				taskId: movedTask.id,
				targetDate: null,
				status: null,
			});
		}
	};

	return (
		<TodayLayout>
			<NavBar isOpen={isDumpAreaOpen} handleSideBar={handleSidebar} />
			<DragDropContext onDragEnd={handleDragEnd}>
				<StagingArea
					handleSelectedTarget={(task) => handleSelectedTarget(task, 'staging')}
					selectedTarget={selectedTarget}
					tasks={stagingData}
					handleSortOrder={handleSortOrder}
					handleTextBtnClick={handleTextBtnClick}
					activeButton={activeButton}
					sortOrder={sortOrder}
					targetDate={targetDate}
					isStagingOpen={isDumpAreaOpen}
				/>

				{isTargetError ? (
					<BtnTaskContainer type="target" />
				) : (
					<TargetArea
						handleSelectedTarget={(task) => handleSelectedTarget(task, 'target')}
						selectedTarget={selectedTarget}
						tasks={targetData}
						onClickPrevDate={handlePrevBtn}
						onClickNextDate={handleNextBtn}
						onClickTodayDate={handleTodayBtn}
						onClickDatePicker={handleChangeDate}
						targetDate={selectedDate.toString()}
					/>
				)}
			</DragDropContext>
			<CalendarWrapper>
				<FullCalendarBox
					size="small"
					selectedTarget={selectedArea === 'target' ? selectedTarget : null}
					selectDate={selectedDate}
				/>
			</CalendarWrapper>
		</TodayLayout>
	);
}

export default Today;

const TodayLayout = styled.div`
	display: flex;
	height: 100%;
`;

const CalendarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-sizing: border-box;
	width: fit-content;
	margin: 1rem 0;
`;
