import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import DropdownButton from '../control/DropdownButton';

const STATUS = {
	NOT_DONE: '미완료',
	IN_PROGRESS: '진행중',
	COMPLETE: '완료',
} as const;

type StatusType = (typeof STATUS)[keyof typeof STATUS];

type TodoProps = {
	title: string;
	deadline?: string;
	status: StatusType;
	isStatusVisible?: boolean;
};

function Todo({ title, deadline, status, isStatusVisible = true }: TodoProps) {
	const isCompleted = status === STATUS.COMPLETE;

	return (
		<TodoContainer isCompleted={isCompleted}>
			<TodoWrapper>
				<span className="todo-title">{title}</span>
				<span className="todo-deadline">{deadline}</span>
			</TodoWrapper>
			{isStatusVisible && (
				<DropdownWrapper>
					<DropdownButton status={status} />
				</DropdownWrapper>
			)}
		</TodoContainer>
	);
}

export default Todo;

const baseStyles = ({ theme }: { theme: Theme }) => css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	box-sizing: border-box;
	width: 45.6rem;

	background-color: ${theme.colorToken.Component.normal};
	border-radius: 12px;
`;

const statusStyles = ({ theme, isCompleted }: { theme: Theme; isCompleted: boolean }) => css`
	border: 1px solid ${isCompleted ? theme.colorToken.Outline.neutralNormal : theme.colorToken.Outline.neutralStrong};

	.todo-title {
		color: ${isCompleted ? theme.colorToken.Text.assistive : theme.colorToken.Text.neutralLight};
		text-overflow: ellipsis;
		word-break: break-all;
		${isCompleted ? theme.font.body02 : theme.font.body01};
		${isCompleted && 'text-decoration: line-through;'}
	}

	.todo-deadline {
		color: ${isCompleted ? theme.colorToken.Text.disable : theme.colorToken.Text.assistive};
		${isCompleted ? theme.font.caption03 : theme.font.caption02};
		${isCompleted && 'text-decoration: line-through;'}
	}
`;

const TodoContainer = styled.div<{ isCompleted: boolean }>`
	${({ theme }) => baseStyles({ theme })}
	${({ theme, isCompleted }) => statusStyles({ theme, isCompleted })}

  &:hover {
		${({ theme, isCompleted }) => css`
			border-color: ${theme.colorToken.Outline.primaryStrong};
			border-width: ${isCompleted ? '1px' : '2px'};
		`};
	}

	&:active {
		${({ theme }) => css`
			background-color: ${theme.colorToken.Component.strong};
			border-color: ${theme.colorToken.Outline.primaryStrong};
		`};
	}

	&:focus {
		${({ theme }) => css`
			background-color: ${theme.colorToken.Component.strong};
			box-shadow:
				0 16px 20px rgb(0 0 0 / 12%),
				0 8px 16px rgb(0 0 0 / 8%),
				0 0 8px rgb(0 0 0 / 8%);
			border-color: ${theme.colorToken.Outline.primaryStrong};
		`};
	}
`;

const TodoWrapper = styled.div`
	display: flex;
	flex: 1 0 0;
	flex-direction: column;
	gap: 4px;
	align-items: flex-start;
	padding: 1rem 2.4rem 1.4rem;
`;

const DropdownWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	height: 6.4rem;
	padding: 8px 8px 24px 0;
`;
