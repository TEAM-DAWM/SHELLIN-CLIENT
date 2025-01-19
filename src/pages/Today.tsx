import styled from '@emotion/styled';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import useGetTasks from '@/apis/tasks/getTask/query';
import useOrderTask from '@/apis/tasks/orderTask/query';
import useUpdateTaskStatus from '@/apis/tasks/updateTaskStatus/query';
import BtnTaskContainer from '@/components/common/BtnTaskContainer';
import FullCalendarBox from '@/components/common/fullCalendar/FullCalendarBox';
import NavBar from '@/components/common/NavBar';
import StagingArea from '@/components/common/StagingArea/StagingArea';
import TargetArea from '@/components/targetArea/TargetArea';
import { SortOrderType } from '@/constants/sortType';
import { TaskType } from '@/types/tasks/taskType';
import formatDatetoLocalDate from '@/utils/formatDatetoLocalDate';

function Today() {
	const [selectedTarget, setSelectedTarget] = useState<TaskType | null>(null);
	const [activeButton, setActiveButton] = useState<'전체' | '지연'>('전체');
	const [sortOrder, setSortOrder] = useState<SortOrderType>('CUSTOM_ORDER');
	const [selectedDate, setTargetDate] = useState(new Date());
	const targetDate = formatDatetoLocalDate(selectedDate);
	const [isDumpAreaOpen, setDumpAreaOpen] = useState(true);

	// Task 목록 Get
	const { data: stagingData } = useGetTasks({ sortOrder });
	const { data: targetData, isError: isTargetError } = useGetTasks({ sortOrder, targetDate });
	const { mutate, queryClient } = useUpdateTaskStatus(null);
	const { mutate: orderTasksMutate } = useOrderTask();
	const handleSidebar = () => {
		setDumpAreaOpen((prev) => !prev);
	};

	console.log('stagingData', stagingData);
	console.log('targetData', targetData);

	/** isTotal 핸들링 함수 */
	const handleTextBtnClick = (button: '전체' | '지연') => {
		setActiveButton(button);
	};

	const handleSortOrder = (order: SortOrderType) => {
		setSortOrder(order);
	};

	const handleSelectedTarget = (task: TaskType | null) => {
		setSelectedTarget(task);
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

		const updatedTargetData: TaskType[] = [...targetData];
		const updatedStagingData: TaskType[] = [...stagingData];
		let movedTask: TaskType;

		if (source.droppableId === 'target') {
			[movedTask] = updatedTargetData.splice(source.index, 1);
			if (destination.droppableId === 'target') {
				updatedTargetData.splice(destination.index, 0, movedTask);
			} else {
				updatedStagingData.splice(destination.index, 0, movedTask);
			}
		} else {
			[movedTask] = updatedStagingData.splice(source.index, 1);
			if (destination.droppableId === 'staging') {
				updatedStagingData.splice(destination.index, 0, movedTask);
			} else {
				updatedTargetData.splice(destination.index, 0, movedTask);
			}
		}

		queryClient.setQueryData(['tasks'], {
			target: { ...targetData, tasks: updatedTargetData },
			staging: { ...stagingData, tasks: updatedStagingData },
		});

		// API 호출
		// staging -> target area: 해당 날짜로 설정, 미완료 상태 지정
		if (destination.droppableId === 'target' && source.droppableId === 'staging') {
			mutate({
				taskId: movedTask.id,
				targetDate,
				status: '미완료',
			});
			// target -> staging area: 상태 초기화
		} else if (destination.droppableId === 'staging' && source.droppableId === 'target') {
			mutate({
				taskId: movedTask.id,
				targetDate: null,
				status: null,
			});
		}
		// staging -> staging: custom order post api 호출
		else if (
			destination.droppableId === 'staging' &&
			source.droppableId === 'staging' &&
			sortOrder === 'CUSTOM_ORDER'
		) {
			const newOrder = updatedStagingData.map((item) => item.id);
			orderTasksMutate({
				type: false,
				taskList: newOrder,
			});

			// target -> target: custom order post api 호출
		} else if (
			destination.droppableId === 'target' &&
			source.droppableId === 'target' &&
			sortOrder === 'CUSTOM_ORDER'
		) {
			const newOrder = updatedTargetData.map((item) => item.id);
			orderTasksMutate({
				type: true,
				targetDate,
				taskList: newOrder,
			});
		}
	};

	return (
		<TodayLayout>
			<NavBar isOpen={isDumpAreaOpen} handleSideBar={handleSidebar} />
			<DragDropContext onDragEnd={handleDragEnd}>
				<StagingArea
					handleSelectedTarget={(task) => handleSelectedTarget(task)}
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
						handleSelectedTarget={(task) => handleSelectedTarget(task)}
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
					selectedTarget={selectedTarget}
					selectDate={selectedDate}
					handleChangeDate={handleChangeDate}
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
