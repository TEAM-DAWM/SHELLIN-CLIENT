import { ViewMountArg, DatesSetArg, EventClickArg, EventDropArg, EventMountArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventReceiveArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateSelectArg, EventResizeDoneArg } from 'fullcalendar/index.js';
import { useState, useRef, useEffect, useMemo } from 'react';

import DateCorrectionModal from '../datePicker/DateCorrectionModal';
import CalendarSettingDropdown from '../v2/dropdown/CalendarSettingDropdown';
import MainSettingModal from '../v2/modal/MainSettingModal';
import TimeBlockDeleteModal from '../v2/modal/TimeBlockDeleteModal';

import CalendarHeader from './CalendarHeader';
import CustomDayCellContent from './CustomDayCellContent';
import processEvents from './processEvents';

import useDeleteTimeBlock from '@/apis/timeBlocks/deleteTimeBlock/query';
import useGetTimeBlock from '@/apis/timeBlocks/getTimeBlock/query';
import usePostTimeBlock from '@/apis/timeBlocks/postTimeBlock/query';
import useUpdateTimeBlock from '@/apis/timeBlocks/updateTimeBlock/query';
import DayHeaderContent from '@/components/common/fullCalendar/DayHeaderContent';
import FullCalendarLayout from '@/components/common/fullCalendar/FullCalendarStyle';
import customSlotLabelContent from '@/components/common/fullCalendar/fullCalendarUtils';
import MODAL from '@/constants/modalLocation';
import { STATUSES } from '@/constants/statuses';
import { TaskType } from '@/types/tasks/taskType';
import { formatDateToLocal, formatDatetoLocalDate } from '@/utils/formatDateTime';

interface FullCalendarBoxProps {
	size: 'small' | 'big';
	selectDate?: Date | null;
	selectedTarget?: TaskType | null;
	handleChangeDate: (target: Date) => void;
}

function FullCalendarBox({ size, selectDate, selectedTarget, handleChangeDate }: FullCalendarBoxProps) {
	const today = useMemo(() => new Date(), []);
	const todayDate = today.toISOString().split('T')[0];
	const [currentView, setCurrentView] = useState('timeGridWeek');
	const [range, setRange] = useState(7);
	const [startDate, setStartDate] = useState<string>(todayDate);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
	const [selectedTimeBlockId, setSelectedTimeBlockId] = useState<number | null>(null);
	const [selectdTimeBlockDate, setSelectdTimeBlockDate] = useState<string | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<(typeof STATUSES)[keyof typeof STATUSES]>(STATUSES.INCOMPLETE);

	const [date, setDate] = useState({ year: today.getFullYear(), month: today.getMonth() + 1 });
	const [isCalendarPopupOpen, setCalendarPopupOpen] = useState(false);
	const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);
	const [selectedStatuses, setSelectedStatuses] = useState<(typeof STATUSES)[keyof typeof STATUSES][]>(
		Object.values(STATUSES)
	);
	const [isFilterPopupDot, setIsFilterPopupDot] = useState(false);
	const [isMainModalOpen, setMainModalOpen] = useState(false);
	const [scrollTime, setScrollTime] = useState<string>(() => {
		const now = new Date();
		return now.toTimeString().split(' ')[0]; // "HH:MM:SS" 형식
	});

	useEffect(() => {
		const now = new Date();
		setScrollTime(now.toTimeString().split(' ')[0]);
	}, []);

	const calendarRef = useRef<FullCalendar>(null);

	const { data: timeBlockData } = useGetTimeBlock({ startDate, range });
	const { mutateAsync: createMutate } = usePostTimeBlock();
	const { mutateAsync: updateMutate } = useUpdateTimeBlock();
	const { mutate: deleteMutate } = useDeleteTimeBlock();

	// 추후 전역상태로 처리 예정
	interface EventData {
		title: string;
		start: string;
		end: string;
		allDay?: boolean;
		classNames: string;
		extendedProps: {
			taskId: number;
			timeBlockId: number | null;
			isCompleted: boolean;
			status: (typeof STATUSES)[keyof typeof STATUSES];
		};
	}
	const [calendarEvents, setCalendarEvents] = useState<EventData[]>([]);

	useEffect(() => {
		if (timeBlockData) {
			setCalendarEvents(processEvents(timeBlockData.data.data, selectedStatuses));
		}
	}, [timeBlockData, selectedStatuses]);

	useEffect(() => {
		if (selectDate && calendarRef.current) {
			const calendarApi = calendarRef.current.getApi();
			calendarApi.gotoDate(selectDate);
		}
	}, [selectDate]);

	const handleViewChange = (view: ViewMountArg) => {
		setCurrentView(view.view.type);
		// updateRange(view.view.type);
	};

	const handleDatesSet = (dateInfo: DatesSetArg) => {
		const currentViewType = dateInfo.view.type;
		const newStartDate = new Date(dateInfo.start);
		const endDate = new Date(dateInfo.end);
		const centerDate = new Date((newStartDate.getTime() + endDate.getTime()) / 2);
		const formattedStartDate = newStartDate.toISOString().split('T')[0];

		setCurrentView(dateInfo.view.type);
		setStartDate(formattedStartDate);
		updateRange(currentViewType, size);
		setDate({
			year: centerDate.getFullYear(),
			month: centerDate.getMonth() + 1,
		});

		// 월간뷰 스크롤 제거 위해 'month-view' 클래스명 추가
		const calendarContainer = document.querySelector('.fc');
		if (dateInfo.view.type === 'dayGridMonth') {
			calendarContainer?.classList.add('month-view');
		} else {
			calendarContainer?.classList.remove('month-view');
		}
	};

	const updateRange = (viewType: string, size: string) => {
		switch (viewType) {
			case 'dayGridMonth':
				setRange(30);
				break;
			case 'timeGridWeekCustom':
				setRange(size === 'big' ? 7 : 5);
				break;
			default:
				setRange(7);
		}
	};

	const handleEventClick = (info: EventClickArg) => {
		const rect = info.el.getBoundingClientRect();
		const calculatedTop = rect.top;
		const screenHeight = window.innerHeight;
		const adjustedTop = Math.min(calculatedTop, screenHeight - MODAL.TASK_MODAL_HEIGHT);
		setTop(adjustedTop);
		setLeft(rect.left - MODAL.TASK_MODAL_WIDTH - 50);

		const clickedEvent = info.event;

		if (clickedEvent) {
			setSelectedTaskId(clickedEvent.extendedProps.taskId);
			setSelectedTimeBlockId(clickedEvent.extendedProps.timeBlockId);
			setSelectedStatus(clickedEvent.extendedProps.status);
			setSelectdTimeBlockDate(removeTimezone(clickedEvent.startStr.split('T')[0]));
			setMainModalOpen(true);
		}
	};

	const closeDeleteModal = () => {
		setDeleteModalOpen(false);
		setSelectedTaskId(null);
		setSelectedTimeBlockId(null);
	};

	const closeMainModal = () => {
		setMainModalOpen(false);
		setSelectedTaskId(null);
		setSelectedTimeBlockId(null);

		/** TODO:
		 * 닫힐 때 이벤트 생성하기
		 * createMutate({ taskId: Number(info.event.id), startTime: start, endTime: end });
		 * */
	};

	const removeTimezone = (str: string, isAlltime: boolean = false) => {
		const dateWithoutTimezone = str.replace(/:\d{2}[+-]\d{2}:\d{2}$/, '');
		const dateOnly = dateWithoutTimezone.split('T')[0]; // YYYY-MM-DD 부분만 추출

		return isAlltime ? `${dateOnly}T00:00` : dateWithoutTimezone;
	};

	// 문자열을 Date 객체로 변환 후, 하루 빼기
	const subtractOneDay = (dateStr: string) => {
		const newDate = new Date(dateStr);
		newDate.setDate(newDate.getDate() - 1);
		return newDate.toISOString().split('T')[0];
	};

	const addEventWhenDragged = async (selectInfo: DateSelectArg) => {
		if (calendarRef.current && selectedTarget && selectedTarget.id !== -1) {
			const calendarApi = calendarRef.current.getApi();

			const existingEvents = calendarApi.getEvents();
			existingEvents.forEach((event) => {
				if (event.id === selectedTarget.id.toString()) {
					event.remove();
				}
			});

			const start = new Date(selectInfo.startStr);
			const end = new Date(selectInfo.endStr);
			const diffInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

			// allDay이면 end 날짜 하루 빼기
			let adjustedEndStr = selectInfo.endStr;
			if (selectInfo.allDay) {
				adjustedEndStr = subtractOneDay(selectInfo.endStr);
			}

			if (diffInMinutes < 30) {
				// (클릭 시 실수로 이벤트 생성되는 것 방지)
				return;
			}

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

			const startStr = removeTimezone(selectInfo.startStr, selectInfo.allDay);
			const endStr = removeTimezone(adjustedEndStr, selectInfo.allDay);

			try {
				await createMutate({
					taskId: selectedTarget.id,
					startTime: startStr,
					endTime: endStr,
					isAllTime: selectInfo.allDay,
				});
			} catch (error) {
				console.error('addEventWhenDragged error:', error);
				// conflict 에러 발생 시 복구
				calendarApi.getEventById(selectedTarget.id.toString())?.remove();
			}
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

	const updateEvent = async (info: EventDropArg | EventResizeDoneArg) => {
		const { event } = info;
		const { taskId, timeBlockId } = event.extendedProps;

		if (taskId && taskId !== -1) {
			const startStr = removeTimezone(event.startStr, event.allDay);
			const endStr = removeTimezone(event.endStr, event.allDay);

			const prevEvents = [...calendarEvents]; // 기존 상태 저장

			try {
				setCalendarEvents((prev) =>
					prev.map((e) => (e.extendedProps.timeBlockId === timeBlockId ? { ...e, start: startStr, end: endStr } : e))
				);

				await updateMutate({ taskId, timeBlockId, startTime: startStr, endTime: endStr, isAllTime: info.event.allDay });
			} catch (error) {
				console.error('updateEvent error:', error);
				info.revert(); // conflict 에러 발생 시 복구
				setCalendarEvents(prevEvents);
			}
		}
	};

	const isSelectable = !!selectedTarget;

	const handleDelete = () => {
		if (selectedTaskId && selectedTimeBlockId) {
			deleteMutate({ taskId: selectedTaskId, timeBlockId: selectedTimeBlockId });
		} else {
			console.error('taskId 또는 timeBlockId가 존재하지 않습니다.');
		}

		setDeleteModalOpen(false);
	};

	const handleRightClick = (info: EventMountArg, event: MouseEvent) => {
		// 브라우저 우클릭 방지
		event.preventDefault();

		const rect = info.el.getBoundingClientRect();
		const calculatedTop = rect.top;
		const screenHeight = window.innerHeight;
		const adjustedTop = Math.min(calculatedTop, screenHeight - MODAL.TASK_DELETE_HEIGHT);
		setTop(adjustedTop);
		setLeft(rect.left - MODAL.TASK_DELETE_WIDTH - 8);

		const clickedEvent = info.event;

		if (clickedEvent) {
			setSelectedTaskId(clickedEvent.extendedProps.taskId);
			setSelectedTimeBlockId(clickedEvent.extendedProps.timeBlockId);
			setSelectdTimeBlockDate(removeTimezone(clickedEvent.startStr.split('T')[0]));
			setDeleteModalOpen(true);
		}
	};

	const handleCalendarPopup = () => {
		setCalendarPopupOpen((prev) => !prev);
	};

	const handleFilterPopup = () => {
		setFilterPopupOpen((prev) => !prev);
	};

	// 드래그해서 timeblock 추가
	const handleEventReceive = (info: EventReceiveArg) => {
		if (!info.event.start) {
			throw new Error('Invalid event start time');
		}

		const start = formatDateToLocal(info.event.start);
		const endDate = new Date(info.event.start.getTime());
		endDate.setHours(endDate.getHours() + 1);
		const end = formatDateToLocal(endDate);

		const el = info.draggedEl;
		const clickedEvent = info.event.extendedProps;

		const rect = el.getBoundingClientRect();
		const calculatedTop = rect.top;
		const screenHeight = window.innerHeight;
		const adjustedTop = Math.min(calculatedTop, screenHeight - MODAL.TIMEBLOCK_MONTH.HEIGHT);

		const adjustedLeft = rect.left - MODAL.TIMEBLOCK_MONTH.SMALL_WIDTH * 2;

		setTop(adjustedTop);
		setLeft(adjustedLeft);
		createMutate(
			{ taskId: Number(info.event.id), startTime: start, endTime: end, isAllTime: info.event.allDay },
			{
				onSuccess: () => {
					if (clickedEvent) {
						setSelectedTaskId(Number(info.event.id));
						setSelectedTimeBlockId(clickedEvent.timeBlockId);
						setSelectdTimeBlockDate(removeTimezone(clickedEvent.startStr.split('T')[0]));
						setMainModalOpen(true);
					}
				},
				onError: () => closeMainModal(),
			}
		);
	};

	// CalendarSettingDropdown handler
	const handleStatusChange = (status: (typeof STATUSES)[keyof typeof STATUSES]) => {
		setSelectedStatuses((prev) => {
			const updatedStatuses = prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status];
			setIsFilterPopupDot(updatedStatuses.length !== Object.values(STATUSES).length);

			return updatedStatuses;
		});
	};

	// 완료 task 스타일링 위한 클래스명 추가 (주간)
	const handleCompletedTask = (arg: EventMountArg) => {
		const weekElement = arg.el.querySelector('.fc-event-main');
		if (weekElement && arg.event.extendedProps.isCompleted) {
			weekElement.classList.add('completed');
		}
	};

	const handleEventDidMount = (arg: EventMountArg) => {
		if (arg.event.allDay) {
			arg.el.classList.add('fc-all-day-event');
			const eventMainElement = arg.el.querySelector('.fc-event-main');
			if (eventMainElement) {
				eventMainElement.classList.add('fc-all-day-event-main');
			}
		}
		handleCompletedTask(arg);
		// 우클릭 시
		arg.el.addEventListener('contextmenu', (event) => handleRightClick(arg, event));
	};

	return (
		<FullCalendarLayout size={size} currentView={currentView}>
			<CalendarHeader
				size={size}
				date={date}
				isCalendarPopupActive={isCalendarPopupOpen}
				isFilterPopupActive={isFilterPopupOpen}
				handleCalendarPopup={handleCalendarPopup}
				handleFilterPopup={handleFilterPopup}
				isFilterPopupDot={isFilterPopupDot}
			/>
			<FullCalendar
				height="100%"
				ref={calendarRef}
				initialView="timeGridWeekCustom"
				plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
				views={{
					timeGridWeekCustom: {
						type: 'timeGrid',
						duration: { days: size === 'big' ? 7 : 5 },
					},
				}}
				headerToolbar={{
					left: '',
					center: 'timeGridWeekCustom,dayGridMonth',
					right: 'today prev next',
				}}
				editable
				selectable={isSelectable}
				nowIndicator
				dayMaxEvents
				events={calendarEvents}
				eventDidMount={(arg) => handleEventDidMount(arg)}
				buttonText={{
					month: '월',
					timeGridWeekCustom: '주',
					today: '오늘',
				}}
				allDayText="종일"
				locale="ko"
				slotDuration="00:15:00"
				slotLabelInterval="01:00:00"
				slotLabelFormat={{
					hour: 'numeric',
					minute: '2-digit',
					meridiem: 'short',
					hour12: true,
				}}
				slotLabelContent={customSlotLabelContent}
				scrollTime={scrollTime}
				scrollTimeReset={false}
				/* eslint-disable */
				dayHeaderContent={(arg) => (
					<DayHeaderContent
						arg={arg}
						currentView={currentView}
						today={today.toDateString()}
						selectDate={selectDate?.toString()}
						handleChangeDate={handleChangeDate}
					/>
				)}
				viewDidMount={handleViewChange}
				datesSet={handleDatesSet}
				dateClick={(arg) => handleChangeDate(arg.date)}
				dayCellContent={(arg) => (
					<CustomDayCellContent arg={arg} today={today.toDateString()} selectDate={selectDate?.toString()} />
				)}
				moreLinkContent={(arg) => `${arg.num}개 일정 더보기 +`}
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
				eventReceive={(info) => handleEventReceive(info)}
			/>
			{isCalendarPopupOpen && (
				<DateCorrectionModal
					date={new Date().toISOString()}
					onClick={handleCalendarPopup}
					top={9.8}
					right={0.8}
					handleCurrentDate={handleChangeDate}
				/>
			)}
			{isFilterPopupOpen && (
				<CalendarSettingDropdown
					top={9.8}
					right={0.8}
					selectedStatuses={selectedStatuses}
					handleStatusChange={handleStatusChange}
				/>
			)}
			{isDeleteModalOpen && selectedTaskId !== null && selectedTimeBlockId !== null && (
				<TimeBlockDeleteModal top={top} left={left} onClose={closeDeleteModal} onDelete={handleDelete} />
			)}
			{isMainModalOpen && selectedTaskId !== null && selectedTimeBlockId !== null && (
				<MainSettingModal
					isOpen={isMainModalOpen}
					onClose={closeMainModal}
					status={selectedStatus}
					taskId={selectedTaskId}
					targetDate={selectdTimeBlockDate ? formatDatetoLocalDate(selectdTimeBlockDate) : formatDatetoLocalDate(today)}
					timeBlockId={selectedTimeBlockId}
					isAllTime={calendarEvents.find((event) => event.extendedProps.taskId === selectedTaskId)?.allDay || false}
					isTimeblock={true}
				/>
			)}
		</FullCalendarLayout>
	);
}

export default FullCalendarBox;
