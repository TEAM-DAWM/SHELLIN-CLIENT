import styled from '@emotion/styled';
import { useState } from 'react';

import Icon from '../../Icon';
import ModalBackdrop from '../../modal/ModalBackdrop';
import Button from '../button/Button';
import DueDateModal from '../modal/DueDateModal';

import { CreateTaskType } from '@/apis/tasks/createTask/CreateTaskType';
import useCreateTask from '@/apis/tasks/createTask/query';
import useInputHandler from '@/hooks/useInputHandler';
import { INPUT_STATE, InputState } from '@/types/inputStateType';
import { formatDatetoLocalDate, formatDateWithDay } from '@/utils/formatDateTime';

function DumpingAreaBtn() {
	const { state, handleFocus, handleBlur, handleChange, handleMouseEnter, handleMouseLeave } = useInputHandler();
	const [todoTitle, setTodoTitle] = useState('');
	const [settingModalOpen, setSettingModalOpen] = useState(false);
	// 날짜를 별도로 설정하지 않을 경우,
	//   마감기간/시간은 접속 날짜 기준
	//   14일 후의 동일 시간으로 자동 지정.

	const [todoDate, setTodoDate] = useState<Date | null>();
	const [todoTime, setTodoTime] = useState('');
	const { mutate: createTaskMutate } = useCreateTask();
	const createTask = (taskData: CreateTaskType) => {
		createTaskMutate(taskData);
	};
	const handleTodoDate = (selectedTodoDate: Date | null) => {
		setTodoDate(selectedTodoDate);
	};
	const handleTodoTime = (selectedTodoTime: string) => {
		setTodoTime(selectedTodoTime);
	};
	const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
		handleChange(e);
		setTodoTitle(e.currentTarget.value);
	};
	const handleSettingModal = () => {
		console.log(settingModalOpen);
		setSettingModalOpen((prev) => !prev);
	};

	// 엔터 키맵핑
	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && todoTitle.trim() !== '' && !e.nativeEvent.isComposing) {
			onCreateTask();
		}
	};

	/** mutate 후 인풋 비우기 */
	const onCreateTask = () => {
		createTask({
			name: todoTitle,
			deadLine: {
				date: todoDate ? formatDatetoLocalDate(todoDate) : null,
				time: todoTime || null,
			},
		});
		resetInputs();
	};

	const resetInputs = () => {
		setTodoTitle('');
		setTodoTime('');
		setTodoDate(undefined);
	};

	const timeDateChipLabel = () => {
		if (todoDate && todoTime) {
			return `${formatDateWithDay(todoDate)} ${todoTime} 까지`;
		}
		if (todoDate) {
			return `${formatDateWithDay(todoDate)} 까지`;
		}
		return '마감 기간/시간';
	};

	return (
		<DumpingAreaContainer>
			<DumpingAreaWrapper state={state} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<DumpingInput
					state={state}
					placeholder="해야 할 일을 여기에 쏟아내세요"
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={onChange}
					value={todoTitle}
					onKeyDown={handleEnter}
				/>
				<IconTouchArea onClick={onCreateTask}>
					<div className="icon-background">
						<Icon name="IcnEnter" />
					</div>
				</IconTouchArea>
			</DumpingAreaWrapper>
			{(state === INPUT_STATE.TYPING || state === INPUT_STATE.FIELD) && (
				<Button
					type="outlined-primary"
					size="small"
					disabled={false}
					label={timeDateChipLabel()}
					leftIcon={!todoDate && todoTime ? 'IcnPlus' : 'IcnModify'}
					onClick={handleSettingModal}
				/>
			)}
			{settingModalOpen && (
				<DueDateModal
					handleTodoTime={handleTodoTime}
					handleTodoDate={handleTodoDate}
					todoDate={todoDate ? new Date(todoDate) : new Date()}
					todoTime={todoTime}
					handleSettingModal={handleSettingModal}
				/>
			)}
			{settingModalOpen && <ModalBackdrop onClick={handleSettingModal} />}
		</DumpingAreaContainer>
	);
}

export default DumpingAreaBtn;

const DumpingAreaContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-start;
`;

const DumpingAreaWrapper = styled.div<{ state: InputState }>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	width: 43.2rem;
	height: 4.8rem;
	padding-left: 1.6rem;

	background: ${({ theme }) => theme.color.Blue.Blue1};
	border-radius: 16px;

	${({ state, theme }) => {
		switch (state) {
			case INPUT_STATE.DEFAULT:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
			case INPUT_STATE.HOVER:
				return `
          border: 2px solid ${theme.color.Blue.Blue7};
					box-shadow: inset 0 0 4px rgb(0 0 0 / 12%);
        `;
			case INPUT_STATE.TYPING:
			case INPUT_STATE.FIELD:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
			default:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
		}
	}}
`;

const IconTouchArea = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	padding: 8px 8px 8px 16px;

	cursor: pointer;

	.icon-background {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.2rem;
		height: 3.2rem;

		color: ${({ theme }) => theme.colorToken.Icon.inverse};

		background: ${({ theme }) => theme.colorToken.Primary.normal};
		border-radius: 8px;
	}
`;

const DumpingInput = styled.input<{ state: InputState }>`
	flex: 1;

	color: ${({ state, theme }) => {
		switch (state) {
			case INPUT_STATE.DEFAULT:
				return theme.color.Blue.Blue7;
			case INPUT_STATE.HOVER:
				return theme.color.Blue.Blue3;
			case INPUT_STATE.TYPING:
			case INPUT_STATE.FIELD:
				return theme.color.Grey.Grey8;
			default:
				return theme.color.Blue.Blue7;
		}
	}};

	background: transparent;
	outline: none;
	border: 0;
	caret-color: ${({ theme }) => theme.color.Blue.Blue7};

	${({ theme }) => theme.font.label05};

	&::placeholder {
		color: ${({ state, theme }) =>
			state === INPUT_STATE.PLACEHOLDER ? theme.color.Blue.Blue3 : theme.color.Blue.Blue7};
	}
`;
