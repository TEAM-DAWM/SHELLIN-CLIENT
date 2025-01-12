import styled from '@emotion/styled';
import { useState } from 'react';

import Icon from '../../Icon';
import Button from '../button/Button';

import { CreateTaskType } from '@/apis/tasks/createTask/CreateTaskType';
import useCreateTask from '@/apis/tasks/createTask/query';
import useInputHandler from '@/hooks/useInputHandler';
import { INPUT_STATE, InputState } from '@/types/inputStateType';

function DumpingAreaBtn() {
	const { state, handleFocus, handleBlur, handleChange, handleMouseEnter, handleMouseLeave } = useInputHandler();
	const [todoTitle, setTodoTitle] = useState('');
	const [settingModalOpen, setSettingModalOpen] = useState(false);
	const { mutate: createTaskMutate } = useCreateTask();
	const createTask = (taskData: CreateTaskType) => {
		createTaskMutate(taskData);
	};
	const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
		handleChange(e);
		setTodoTitle(e.currentTarget.value);
	};
	const handleSettingModal = () => {
		setSettingModalOpen((prev) => !prev);
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
				/>
				<IconTouchArea
					onClick={() => {
						createTask({
							name: todoTitle,
							deadLine: {
								date: null,
								time: null,
							},
						});
					}}
				>
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
					label="마감 기간/시간"
					leftIcon="IcnPlus"
					onClick={handleSettingModal}
				/>
			)}
			{/* 세팅 모달 들어갈 자리 */}
			{settingModalOpen && <div />}
		</DumpingAreaContainer>
	);
}

export default DumpingAreaBtn;

const DumpingAreaContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
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
	gap: 8px;
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
