import styled from '@emotion/styled';

const FullCalendarLayout = styled.div<{ size: string; currentView: string }>`
	position: relative;

	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0 0.8rem 0.8rem;
	overflow: hidden;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	border-radius: 20px;

	.fc .fc-toolbar.fc-header-toolbar {
		display: flex;
		align-items: flex-start;
		height: 6.4rem;
		margin: 2.4rem 0 0;
	}

	.fc-toolbar {
		position: relative;
	}

	/* Custom button styles */
	.fc-toolbar-chunk .fc-button {
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		${({ theme }) => theme.font.label04}
		height: 3.2rem;
		padding: 0 1.6rem;

		background: ${({ theme }) => theme.color.Grey.White};
		border: none;
	}

	.fc-toolbar-chunk .fc-button:hover,
	.fc-toolbar-chunk .fc-button:active {
		background: none;
	}

	/** .fc-button-group: 주/월 토글 */
	.fc .fc-button-group {
		position: absolute;
		top: 0;
		left: 50%;
		height: 3.2rem;
		overflow: hidden;

		background: ${({ theme }) => theme.color.Grey.White};
		transform: translateX(-50%);
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
		border-radius: 8px;
	}

	.fc-button-group > button {
		width: 8rem;

		border-radius: 0;
	}

	/** .fc-button-primary: .fc-button-group 중 선택된 버튼 */
	.fc .fc-button-primary:focus {
		box-shadow: none;
	}

	.fc .fc-button-primary:not(:disabled).fc-button-active {
		background: ${({ theme }) => theme.colorToken.Neutral.heavy};
		border: none;
		border-radius: 0 7px 7px 0;
	}

	.fc-button-group > button:last-of-type.fc-button-primary:not(:disabled).fc-button-active {
		border-radius: 7px 0 0 7px;
	}

	/* Override the button group border-radius styles */
	.fc-direction-ltr .fc-button-group > .fc-button {
		display: flex;
		align-items: center;

		color: ${({ theme }) => theme.colorToken.Icon.strong};
	}

	.fc-button-active:focus {
		box-shadow: none;
	}

	.fc-toolbar-chunk {
		display: flex;
		gap: 0.8rem;
		align-items: center;
		margin-right: 6rem;
	}

	/* 오늘 버튼 */
	.fc-toolbar-chunk .fc-today-button {
		display: flex;
		gap: 0.8rem;
		align-items: center;
		justify-content: center;
		margin: 3.4rem 0 0;

		color: ${({ theme }) => theme.color.Grey.Grey5};

		background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
		opacity: 1;
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
		${({ theme }) => theme.font.label04}
		border-radius: 8px;
	}

	.fc-toolbar-chunk .fc-today-button:active {
		color: ${({ theme }) => theme.color.Grey.Grey5};

		background-color: ${({ theme }) => theme.colorToken.Neutral.heavy};
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	/* 좌우 버튼 스타일 */
	.fc-toolbar-chunk .fc-prev-button,
	.fc-toolbar-chunk .fc-next-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.2rem;
		margin: 3.4rem 0 0;

		color: ${({ theme }) => theme.color.Grey.Grey5};

		background-color: ${({ theme }) => theme.color.Grey.White};
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
		border-radius: 8px;
	}

	.fc-toolbar-chunk .fc-prev-button:active,
	.fc-toolbar-chunk .fc-next-button:active {
		color: ${({ theme }) => theme.color.Grey.Grey5};

		background-color: ${({ theme }) => theme.colorToken.Neutral.heavy};
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	/* ---- 여기까지 toolbar (캘린더 헤더) */

	.fc-daygrid-body {
		width: 100% !important;
		height: 100%;
		overflow: hidden;

		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
		border-radius: 12px;

		${({ currentView }) =>
			currentView === 'timeGridWeekCustom' &&
			`border-left: none;
			border-radius: 0;
			border-right: none;
			`}
	}

	.fc-timegrid .fc-daygrid-body {
		z-index: 0;
	}

	.fc-event-allday {
		height: 2rem;
	}

	.fc-col-header {
		width: 100% !important;
	}

	.fc .fc-col-header-cell {
		height: 2.4rem;
		padding: 1.6rem 0.8rem 0;

		border-right: none;
		border-left: none;
	}

	/* 종일  - 타임그리드 셀 크기 고정 */
	.fc-scrollgrid-sync-table > colgroup > col {
		width: 4rem !important;
	}

	.fc-timegrid-axis .fc-scrollgrid-shrink {
		width: fit-content;
	}

	.fc-timegrid-body .fc-timegrid-slots > colgroup > col {
		width: 4rem;
	}

	/* 쏟아내기에 따라서 타임 그리드 width 유동적을 변하도록 설정  */
	.fc-timegrid-body {
		width: 100% !important;
	}

	.fc-scrollgrid-section-body table {
		width: 100% !important;
	}

	/* 전체 캘린더(주간) */
	.fc-scrollgrid.fc-scrollgrid-liquid {
		/* padding: 0 8px 0 0; */
	}

	.fc-daygrid-day-events {
		margin-top: 4rem;
	}

	.month-view .fc-daygrid-day-frame:active {
		background-color: ${({ theme }) => theme.colorToken.Component.strong};
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.primaryStrong};
	}

	/* fc-daygrid-day-events: 종일 행(개별) */
	.fc-daygrid-day-frame .fc-scrollgrid-sync-inner,
	.fc-daygrid-day-events {
		width: 100%;
		min-height: 4.4rem;
	}

	.fc-timegrid-slot .fc-timegrid-slot-label .fc-scrollgrid-shrink {
		width: 4rem;
	}

	.fc-timegrid-allday {
		display: flex;
		align-items: center;
		height: 4.4rem;
		overflow: hidden;
	}

	.fc-timegrid-allday-bg {
		height: 4.4rem;

		border-bottom: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	}

	/* 타임그리드 테두리 */
	.fc .fc-scrollgrid-section-body table,
	.fc .fc-scrollgrid-section-footer table {
		${({ currentView }) =>
			currentView === 'dayGridMonth' &&
			`
			border: none
  	`}
		border-right: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
		border-bottom-style: hidden;
	}

	/* 주간캘린더 */

	/* 이벤트 박스 */
	.fc-event-main {
		display: inline-block;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 0.4rem 0.6rem;
		overflow: hidden;

		background-color: ${({ theme }) => theme.colorToken.Component.strong};
		border: none;
		border-radius: 4px;
	}

	.fc-event-main.completed {
		color: ${({ theme }) => theme.colorToken.Text.assistiveLight};
		text-decoration: line-through;

		background-color: ${({ theme }) => theme.colorToken.Component.assistive};
	}

	/* fc-event-title이 더 위로 오도록  */
	.fc-event-main-frame {
		flex-direction: column-reverse;
		gap: 4px;
	}

	/** 넘어가는 텍스트 처리 */
	.fc-event-title {
		flex-shrink: 1;
		overflow: hidden;

		color: ${({ theme }) => theme.colorToken.Text.neutralLight};
		white-space: nowrap;
		text-overflow: ellipsis;

		${({ theme }) => theme.font.body05};
	}

	.fc-event-time {
		color: ${({ theme }) => theme.colorToken.Text.assistive};
		${({ theme }) => theme.font.caption02};
	}

	.fc-daygrid-event .fc-event-time {
		display: none;
	}

	.fc-event-main.completed .fc-event-title,
	.fc-event-main.completed .fc-event-time {
		color: ${({ theme }) => theme.colorToken.Text.assistiveLight};
	}

	.fc-daygrid-dot-event.completed .fc-event-title,
	.fc-daygrid-dot-event.completed .fc-event-time {
		color: ${({ theme }) => theme.colorToken.Text.assistiveLight};
	}

	/* TimeGrid(주간) all-day-event(종일) */
	.fc-all-day-event .fc-event-main {
		background-color: ${({ theme }) => theme.colorToken.Component.strong} !important;
	}

	/** TODO: category 추가 시 해당 부분에서 카테고리 색 적용하면 됨 */
	.fc-daygrid-event-dot {
		border-color: ${({ theme }) => theme.colorToken.Text.assistive};
	}

	.fc-daygrid-dot-event.completed .fc-daygrid-event-dot {
		border-color: ${({ theme }) => theme.colorToken.Text.assistiveLight};
	}

	.fc-event-main .tasks {
		background-color: ${({ theme }) => theme.palette.Blue.Blue2};
	}

	.schedule .fc-event-main {
		background-color: ${({ theme }) => theme.palette.Grey.Grey2};
	}

	/* 종일 텍스트 */
	.fc-scrollgrid-shrink-frame .fc-scrollgrid-sync-inner {
		${({ theme }) => theme.font.caption02}
		color: ${({ theme }) => theme.colorToken.Text.disable};
	}

	/* 종일 이벤트 테두리 */
	.fc .fc-daygrid-day-frame .fc-event-main {
		display: flex;
		align-items: baseline;
		justify-content: center;
		box-sizing: border-box;
		height: 2.1rem;
		padding: 0.3rem 1.2rem;

		color: ${({ theme }) => theme.palette.Grey.White};

		background-color: ${({ theme }) => theme.palette.Primary};
		border: none;
	}

	/* fc-timegrid-col-events : 주간 이벤트 , fc-daygrid-day-frame: 월간 이벤트 */
	.fc .fc-timegrid-col-events .fc-event-main:hover {
		background-color: ${({ theme }) => theme.colorToken.Component.heavy};
	}

	.fc .fc-timegrid-col-events .fc-event-main:active {
		background-color: ${({ theme }) => theme.colorToken.Component.accent};
	}

	.fc .fc-daygrid-day-frame .schedule .fc-event-main {
		background-color: ${({ theme }) => theme.palette.Grey.Grey6};
	}

	.fc .fc-timegrid-col-events .schedule .fc-event-main {
		background-color: ${({ theme }) => theme.palette.Grey.Grey2};
		box-shadow: 2px 0 0 0 ${({ theme }) => theme.palette.Grey.Grey6} inset;
	}

	.fc .fc-daygrid-day-frame .fc-event-main:hover {
		background-color: ${({ theme }) => theme.palette.Blue.Blue8};
	}

	.fc .fc-timegrid-col-events .schedule .fc-event-main:hover {
		background-color: ${({ theme }) => theme.palette.Grey.Grey3};
	}

	.fc .fc-daygrid-day-frame .schedule .fc-event-main:hover {
		background-color: ${({ theme }) => theme.palette.Grey.Grey7};
	}

	/* user-select: none 상태에서의 스타일 */
	.schedule[style*='user-select: none'] {
		background-color: ${({ theme }) => theme.palette.Grey.Grey4} !important;
	}

	.tasks[style*='user-select: none'] {
		background-color: ${({ theme }) => theme.palette.Blue.Blue4} !important;
	}

	.fc-v-event .fc-event-main-frame {
		height: auto;
	}

	.fc-daygrid-day-top {
		height: 0;
	}

	/* 요일 행 TEXT 중간 정렬 */
	.fc td,
	.fc th {
		vertical-align: middle;
		${({ theme }) => theme.fontTheme.CAPTION_01};
	}

	.fc .fc-col-header-cell-cushion {
		padding: 6px 4px;
	}

	/** .fc-timegrid-slot-label: 시간 라벨 */

	/* 타임 그리드 15분당 일정 */
	.fc .fc-timegrid-slot-label {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		width: 4rem;

		color: ${(color) => color.theme.palette.Grey.Grey5};
		text-transform: lowercase;

		${({ theme }) => theme.font.caption01}
		border-bottom: none;
	}

	.fc-theme-standard td,
	.fc-theme-standard th {
		border-right: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
		border-bottom: none;
		border-left: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	/* 요일 행 첫번째 border 없애기 */
	.fc-theme-standard td:first-of-type,
	.fc-theme-standard th:first-of-type {
		border: none;
	}

	/* 타임 그리드 종일 마진 없애기 */
	.fc .fc-daygrid-body-natural .fc-daygrid-day-events {
		margin: 0;
	}

	/* 월간뷰 스크롤 제거 */
	.month-view .fc-scroller {
		overflow: hidden !important;
	}

	/* 15분 줄선 테두리 */
	.fc .fc-timegrid-slot-minor {
		border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
		border-right: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
		border-left: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	tr td.fc-timegrid-slot-minor[data-time$=':45:00']:nth-of-type(2) {
		border-bottom: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	.fc-scrollgrid .fc-scrollgrid-liquid {
		height: 100%;
	}

	/* 요일 헤더 높이 조정 */

	/** .fc-daygrid-day: 각 날짜 별 박스 */
	.fc-daygrid-day {
		width: 100%;
		height: ${({ currentView }) => (currentView === 'timeGridWeekCustom' ? '0' : '15.2rem')};
	}

	.fc-daygrid-day-number {
		${({ theme }) => theme.font.label03}
		color: ${({ theme }) => theme.colorToken.Text.neutralLight};
	}

	/* 오늘 배경색 없애기 */
	.fc .fc-day-today {
		background: none;
	}

	/* 스타일링 현재 시간 표시 */
	.fc .fc-timegrid-now-indicator-line {
		height: 0.2rem;

		background-color: ${({ theme }) => theme.palette.Primary};
		border: none;
	}

	/* 시간 세로줄 테두리 없애기 */
	.fc-timegrid-axis {
		border: 100px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	.fc-timegrid-event {
		border-radius: 4px;
	}

	/* event에 있는 기본 스타일 지우기  */
	.fc-timegrid-event-harness-inset .fc-timegrid-event {
		box-shadow: none;
		border: none;
	}

	/* event inset 적용 */
	.fc-timegrid-event-harness > .fc-timegrid-event {
		inset: 0.1rem;
	}

	.fc .fc-daygrid-event-harness {
		margin: 0;
	}

	.fc .fc-daygrid-event {
		margin: 0;

		text-overflow: ellipsis;
	}

	.fc .fc-cell-shaded {
		display: none;
	}

	/* 현재시간 화살표 지우기 */
	.fc-timegrid-now-indicator-arrow {
		display: none;
	}

	.fc-direction-ltr .fc-daygrid-event {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		height: 2.1rem;
		margin: 0.1rem;

		border-radius: 4px;
	}

	.fc .fc-daygrid-dot-event {
		padding: 0.4rem 0.6rem;

		border-radius: 4px;
	}

	.fc .fc-daygrid-dot-event.schedule {
		background-color: ${({ theme }) => theme.palette.Grey.Grey2};
		box-shadow: 2px 0 0 0 ${({ theme }) => theme.palette.Grey.Grey6} inset;
	}

	.fc .fc-daygrid-dot-event.tasks {
		display: flex;
		gap: 4px;
		align-items: center;
		height: 2rem;
		padding: 0 4px 0 8px;

		background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
		border-radius: 4px;
	}

	.fc .fc-daygrid-dot-event.tasks.completed {
		color: ${({ theme }) => theme.colorToken.Text.assistiveLight};
		text-decoration: line-through;

		background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
		border-radius: 4px;
	}

	/* 월간 이벤트 호버 효과 */
	.fc .fc-daygrid-dot-event.schedule:hover {
		background-color: ${({ theme }) => theme.palette.Grey.Grey3};
	}

	.fc .fc-daygrid-dot-event.tasks:hover {
		background-color: ${({ theme }) => theme.colorToken.Neutral.strong};
	}

	.fc .fc-daygrid-dot-event.tasks:active {
		background-color: ${({ theme }) => theme.colorToken.Neutral.heavy};
	}

	/* TimeGrid(주간) all-day-event(종일) 컨테이너 */
	.fc .fc-h-event {
		width: 100%;

		border: none;
	}

	/* TimeGrid(주간) all-day-event(종일) */

	.fc-all-day-event {
		width: 95%;
	}

	.month-view .fc-all-day-event {
		width: 99%;
	}

	/* Month view 중 이벤트 초과 안내 */
	.fc-daygrid-more-link {
		display: flex;
		align-items: center;
		height: 2rem;
		padding: 0 4px 0 8px;

		color: ${({ theme }) => theme.colorToken.Text.neutralLight};

		background-color: ${({ theme }) => theme.colorToken.Component.strong};
		${({ theme }) => theme.font.body05};
		border-radius: 4px;
	}

	.fc .fc-timegrid-axis-frame {
		justify-content: center;
		width: 4rem;
	}

	/* 시간 왼쪽에 붙이기 */
	.fc-direction-ltr .fc-timegrid-slot-label-frame {
		text-align: left;
	}

	/* 이벤트 꽉차게 */
	.fc-direction-ltr .fc-timegrid-col-events {
		margin: 0;
	}

	/* 버튼 focus 그림자 없애기 */
	.fc .fc-button-primary:not(:disabled).fc-button-active:focus,
	.fc .fc-button-primary:not(:disabled):active:focus {
		box-shadow: none;
	}

	/* 바깥 테두리 없애기 */
	.fc .fc-scrollgrid-liquid {
		height: 100%;
		overflow: auto;

		border: none;

		scrollbar-width: thin;
		scrollbar-color: ${({ theme }) => theme.palette.Grey.Grey6} transparent;
	}

	/* 스크롤 커스텀 */

	.fc-scrollgrid-liquid::-webkit-scrollbar {
		width: 0.4rem;
	}

	.fc-scrollgrid-liquid::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.palette.Grey.Grey6};
		visibility: hidden;
		border-radius: 3px;
	}

	.fc-scrollgrid-liquid:hover::-webkit-scrollbar-thumb {
		visibility: visible;
	}

	/* stylelint-disable selector-class-pattern */

	/* 일간에는 주말표시 안하기 */
	.fc .fc-timeGridDay-view .fc-day-sun,
	.fc .fc-timeGridDay-view .fc-day-sat {
		background: none;
	}

	/* 일요일 border 조정 */
	.fc-dayGridMonth-view .fc-day-sun .fc-daygrid-day-frame {
		border-bottom: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralStrong};
	}

	.fc-dayGridMonth-view .fc-daygrid-body tr:last-child .fc-day-sun .fc-daygrid-day-frame {
		border-bottom: none;
	}

	.fc .fc-timeGridDay-view .fc-col-header-cell-cushion {
		float: left;
	}

	/* stylelint-enable selector-class-pattern */
`;

export default FullCalendarLayout;
