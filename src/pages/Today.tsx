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
import useTaskSelectionStore from '@/store/useTaskSelectionStore';
import { TaskType } from '@/types/tasks/taskType';
import { formatDatetoLocalDate } from '@/utils/formatDateTime';

function Today() {
	const storedStagingSortOrder = localStorage.getItem('stagingSortOrder') as SortOrderType | null;
	const storedTargetSortOrder = localStorage.getItem('targetSortOrder') as SortOrderType | null;

	const [stagingSortOrder, setStagingSortOrder] = useState<SortOrderType>(storedStagingSortOrder || 'CUSTOM_ORDER');
	const [targetSortOrder, setTargetSortOrder] = useState<SortOrderType>(storedTargetSortOrder || 'CUSTOM_ORDER');

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [calenderSelectedDate, setCalenderSelectedDate] = useState(new Date());
	const targetDate = formatDatetoLocalDate(selectedDate);
	const [isDumpAreaOpen, setDumpAreaOpen] = useState(true);

	const { isDragging, clearSelectedTask } = useTaskSelectionStore();

	// Task 목록 Get
	const { data: stagingData } = useGetTasks({ sortOrder: stagingSortOrder });
	const { data: targetData, isError: isTargetError } = useGetTasks({ sortOrder: targetSortOrder, targetDate });
	const { mutate, queryClient } = useUpdateTaskStatus(null);
	const { mutate: orderTasksMutate } = useOrderTask();
	const handleSidebar = () => {
		setDumpAreaOpen((prev) => !prev);
	};

	const handleSortOrder = (order: SortOrderType, type: 'staging' | 'target') => {
		if (type === 'staging') {
			setStagingSortOrder(order);
			localStorage.setItem('stagingSortOrder', order);
		} else {
			setTargetSortOrder(order);
			localStorage.setItem('targetSortOrder', order);
		}
	};

	const handlePrevBtn = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 1);
		setSelectedDate(newDate);
	};

	const handleNextBtn = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 1);
		setSelectedDate(newDate);
	};

	const handleTodayBtn = () => {
		setSelectedDate(new Date());
	};

	const handleChangeDate = (target: Date) => {
		setSelectedDate(target);
	};
	const handleChangeCalenderDate = (target: Date) => {
		setCalenderSelectedDate(target);
	};

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// 드래그가 끝난 위치가 없으면 리턴
		if (!destination) return;

		const updatedTargetData: TaskType[] = targetData;
		const updatedStagingData: TaskType[] = stagingData;
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
			stagingSortOrder === 'CUSTOM_ORDER'
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
			targetSortOrder === 'CUSTOM_ORDER'
		) {
			const newOrder = updatedTargetData.map((item) => item.id);
			orderTasksMutate({
				type: true,
				targetDate,
				taskList: newOrder,
			});
		}
		clearSelectedTask();
	};

	const handleClickOutside = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;

		if (!target.closest('.todo-item') && !target.closest('.fc-view-harness fc-view-harness-active') && !isDragging) {
			// 클릭된 요소가 todo-item 또는 fc-view-harness(캘린더 이벤트 추가 영역) 내부가 아닐 경우
			clearSelectedTask();
		}
	};

	return (
		<TodayLayout onClick={handleClickOutside}>
			<NavBar isOpen={isDumpAreaOpen} handleSideBar={handleSidebar} />
			<DragDropContext onDragEnd={handleDragEnd}>
				<StagingArea
					tasks={stagingData}
					targetDate={targetDate}
					isStagingOpen={isDumpAreaOpen}
					handleSortOrder={(order) => handleSortOrder(order, 'staging')}
					sortOrder={stagingSortOrder}
				/>

				{isTargetError ? (
					<BtnTaskContainer type="target" />
				) : (
					<TargetArea
						tasks={targetData}
						onClickPrevDate={handlePrevBtn}
						onClickNextDate={handleNextBtn}
						onClickTodayDate={handleTodayBtn}
						onClickDatePicker={handleChangeDate}
						targetDate={selectedDate.toString()}
						handleSortOrder={(order) => handleSortOrder(order, 'target')}
						sortOrder={targetSortOrder}
					/>
				)}
			</DragDropContext>
			<CalendarWrapper>
				<FullCalendarBox
					size={isDumpAreaOpen ? 'small' : 'big'}
					selectDate={calenderSelectedDate}
					handleChangeDate={handleChangeCalenderDate}
				/>
			</CalendarWrapper>
		</TodayLayout>
	);
}

export default Today;

const TodayLayout = styled.div`
	display: flex;
	height: 100vh;
	overflow: hidden;
`;

const CalendarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: flex-start;
	box-sizing: border-box;
	width: fit-content;
	margin: 1rem 0.8rem 1rem 0;
`;
