import styled from '@emotion/styled';
import { ViewMountArg, DatesSetArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateSelectArg, EventResizeDoneArg } from 'fullcalendar/index.js';
import { useState, useRef, useEffect } from 'react';

import Icon from '../Icon';
import ModalDeleteDetail from '../modal/ModalDeleteDetail';
import MainDate from '../v2/TextBox/MainDate';

import processEvents from './processEvents';

import useDeleteTimeBlock from '@/apis/timeBlocks/deleteTimeBlock/query';
import useGetTimeBlock from '@/apis/timeBlocks/getTimeBlock/query';
import usePostTimeBlock from '@/apis/timeBlocks/postTimeBlock/query';
import useUpdateTimeBlock from '@/apis/timeBlocks/updateTimeBlock/query';
import DayHeaderContent from '@/components/common/fullCalendar/DayHeaderContent';
import FullCalendarLayout from '@/components/common/fullCalendar/FullCalendarStyle';
import { customDayCellContent, customSlotLabelContent } from '@/components/common/fullCalendar/fullCalendarUtils';
import MODAL from '@/constants/modalLocation';
import { TaskType } from '@/types/tasks/taskType';

interface FullCalendarBoxProps {
	size: 'small' | 'big';
	selectDate?: Date | null;
	selectedTarget?: TaskType | null;
}

function FullCalendarBox({ size, selectDate, selectedTarget }: FullCalendarBoxProps) {
	const today = new Date();
	const todayDate = today.toISOString().split('T')[0];
	const [currentView, setCurrentView] = useState('timeGridWeek');
	const [range, setRange] = useState(7);
	const [startDate, setStartDate] = useState<string>(todayDate);
	const [isModalOpen, setModalOpen] = useState(false);
	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);
	const [modalTaskId, setModalTaskId] = useState<number | null>(null);
	const [modalTimeBlockId, setModalTimeBlockId] = useState<number | null>(null);
	const [date, setDate] = useState({ year: today.getFullYear(), month: today.getMonth() + 1 });

	const calendarRef = useRef<FullCalendar>(null);

	const { data: timeBlockData } = useGetTimeBlock({ startDate, range });
	const { mutate: createMutate } = usePostTimeBlock();
	const { mutate: updateMutate } = useUpdateTimeBlock();

	const calendarEvents = timeBlockData ? processEvents(timeBlockData.data.data) : [];

	useEffect(() => {
		if (selectDate && calendarRef.current) {
			const calendarApi = calendarRef.current.getApi();
			calendarApi.gotoDate(selectDate);
		}
	}, [selectDate]);

	const handleViewChange = (view: ViewMountArg) => {
		setCurrentView(view.view.type);
		updateRange(view.view.type);
	};

	const handleDatesSet = (dateInfo: DatesSetArg) => {
		const currentViewType = dateInfo.view.type;
		const newStartDate = new Date(dateInfo.start);
		const endDate = new Date(dateInfo.end);
		const centerDate = new Date((newStartDate.getTime() + endDate.getTime()) / 2);
		const formattedStartDate = newStartDate.toISOString().split('T')[0];

		setCurrentView(dateInfo.view.type);
		setStartDate(formattedStartDate);
		updateRange(currentViewType);
		setDate({
			year: centerDate.getFullYear(),
			month: centerDate.getMonth() + 1,
		});
	};

	const updateRange = (viewType: string) => {
		switch (viewType) {
			case 'dayGridMonth':
				setRange(30);
				break;
			case 'timeGridWeek':
				setRange(7);
				break;
			default:
				setRange(7);
		}
	};

	const handleEventClick = (info: EventClickArg) => {
		const rect = info.el.getBoundingClientRect();
		const calculatedTop = rect.top;
		const screenHeight = window.innerHeight;
		const adjustedTop = Math.min(calculatedTop, screenHeight - MODAL.TASK_DELETE_HEIGHT);
		setTop(adjustedTop);
		setLeft(rect.left - MODAL.TASK_DELETE_WIDTH);

		const clickedEvent = info.event.extendedProps;

		if (clickedEvent) {
			setModalTaskId(clickedEvent.taskId);
			setModalTimeBlockId(clickedEvent.timeBlockId);
			setModalOpen(true);
		}
	};

	const closeModal = () => {
		setModalOpen(false);
		setModalTaskId(null);
		setModalTimeBlockId(null);
	};
	const addEventWhenDragged = (selectInfo: DateSelectArg) => {
		if (calendarRef.current && selectedTarget && selectedTarget.id !== -1) {
			const calendarApi = calendarRef.current.getApi();

			const existingEvents = calendarApi.getEvents();
			existingEvents.forEach((event) => {
				if (event.id === selectedTarget.id.toString()) {
					event.remove();
				}
			});

			calendarApi.addEvent({
				id: selectedTarget.id.toString(),
				title: selectedTarget.name,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay,
				classNames: 'tasks',
				extendedProps: {
					taskId: selectedTarget.id,
					timeBlockId: null,
				},
			});

			const removeTimezone = (str: string) => str.replace(/:\d{2}[+-]\d{2}:\d{2}$/, '');

			const startStr = removeTimezone(selectInfo.startStr);
			const endStr = removeTimezone(selectInfo.endStr);

			createMutate({ taskId: selectedTarget.id, startTime: startStr, endTime: endStr });
		}
	};

	const handleSelect = (selectInfo: DateSelectArg) => {
		if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi();
			calendarApi.unselect();
		}

		if (selectedTarget && selectedTarget.id !== -1) {
			addEventWhenDragged(selectInfo);
		}
	};

	const updateEvent = (info: EventDropArg | EventResizeDoneArg) => {
		const { event } = info;
		const { taskId, timeBlockId } = event.extendedProps;

		if (taskId && taskId !== -1) {
			const removeTimezone = (str: string) => str.replace(/:\d{2}[+-]\d{2}:\d{2}$/, '');

			const startStr = removeTimezone(event.startStr);
			const endStr = removeTimezone(event.endStr);

			updateMutate({ taskId, timeBlockId, startTime: startStr, endTime: endStr });
		} else {
			info.revert();
		}
	};

	const isSelectable = !!selectedTarget;

	const { mutate } = useDeleteTimeBlock();

	const handleDelete = () => {
		console.log('taskId, timeBlockId', modalTaskId, modalTimeBlockId);

		if (modalTaskId && modalTimeBlockId) {
			mutate({ taskId: modalTaskId, timeBlockId: modalTimeBlockId });
		} else {
			console.error('taskId 또는 timeBlockId가 존재하지 않습니다.');
		}

		setModalOpen(false);
	};

	return (
		<FullCalendarLayout size={size}>
			<CustomComponentContainer size={size}>
				<MainDate year={date.year} month={date.month} />
				<CustomComponentWrapper>
					<Icon name="IcnCalendar" />
					<Icon name="IcnFilter" />
				</CustomComponentWrapper>
			</CustomComponentContainer>
			<FullCalendar
				ref={calendarRef}
				initialView="timeGridWeek"
				plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
				headerToolbar={{
					left: '',
					center: 'timeGridWeek,dayGridMonth',
					right: 'today prev next',
				}}
				slotDuration="00:30:00"
				editable
				selectable={isSelectable}
				nowIndicator
				dayMaxEvents
				events={calendarEvents}
				buttonText={{
					month: '월',
					week: '주',
					today: '오늘',
				}}
				allDayText="종일"
				locale="ko"
				slotLabelFormat={{
					hour: 'numeric',
					minute: '2-digit',
					meridiem: 'short',
					hour12: true,
				}}
				slotLabelContent={customSlotLabelContent}
				/* eslint-disable */
				dayHeaderContent={(arg) => (
					<DayHeaderContent arg={arg} currentView={currentView} today={today.toDateString()} />
				)}
				viewDidMount={handleViewChange}
				datesSet={handleDatesSet}
				dayCellContent={customDayCellContent}
				eventTimeFormat={{
					hour: 'numeric',
					minute: '2-digit',
					hour12: false,
				}}
				droppable
				eventClick={handleEventClick}
				select={handleSelect} // 선택된 날짜가 변경될 때마다 호출
				eventDrop={updateEvent} // 기존 이벤트 드래그 수정 핸들러
				eventResize={updateEvent} // 기존 이벤트 리사이즈 수정 핸들러
			/>
			{isModalOpen && modalTaskId !== null && modalTimeBlockId !== null && (
				<ModalDeleteDetail top={top} left={left} onClose={closeModal} onDelete={handleDelete} />
			)}
		</FullCalendarLayout>
	);
}

const CustomComponentContainer = styled.div<{ size: string }>`
	position: absolute;
	top: 56px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	height: auto;
	padding: ${({ size }) => (size === 'big' ? '0 2.4rem;' : '0 1.6rem 0 2.4rem;')};
`;

const CustomComponentWrapper = styled.div`
	display: flex;
	gap: 194px;
	margin-top: 0.4rem;

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;

export default FullCalendarBox;
