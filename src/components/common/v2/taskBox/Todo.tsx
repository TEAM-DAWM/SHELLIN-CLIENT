import { css } from '@emotion/react';
import styled from '@emotion/styled';

import DropdownButton from '../control/DropdownButton';

import { theme } from '@/styles/theme';

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
};

function Todo({ title, deadline, status }: TodoProps) {
	return (
		<TodoContainer status={status}>
			<TodoWrapper>
				<span className="todo-title">{title}</span>
				<span className="todo-deadline">{deadline}</span>
			</TodoWrapper>
			<DropdownWrapper>
				<DropdownButton status={status} />
			</DropdownWrapper>
		</TodoContainer>
	);
}

export default Todo;

const baseStyles = css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	box-sizing: border-box;
	width: 45.6rem;
	padding-left: 2.4rem;

	background-color: ${theme.colorToken.Component.normal};
	border-radius: 12px;
`;

const statusStyles = ({ status }: { status: StatusType }) => {
	const isComplete = status === STATUS.COMPLETE;
	return css`
		border: 1px solid ${isComplete ? theme.colorToken.Outline.neutralNormal : theme.colorToken.Outline.neutralStrong};

		.todo-title {
			color: ${isComplete ? theme.colorToken.Text.assistive : theme.colorToken.Text.neutralLight};
			${isComplete ? theme.font.body02 : theme.font.body01};
			${isComplete && 'text-decoration: line-through;'}
		}

		.todo-deadline {
			color: ${isComplete ? theme.colorToken.Text.disable : theme.colorToken.Text.assistive};
			${isComplete ? theme.font.caption03 : theme.font.caption02};
			${isComplete && 'text-decoration: line-through;'}
		}
	`;
};

const stateStyles = {
	hover: (status: StatusType) => css`
		border-color: ${theme.colorToken.Outline.primaryStrong};
		border-width: ${status === STATUS.COMPLETE ? '1px' : '2px'};
	`,
	pressed: css`
		background-color: ${theme.colorToken.Component.strong};
		border-color: ${theme.colorToken.Outline.primaryStrong};
	`,
	floated: css`
		background-color: ${theme.colorToken.Component.strong};
		box-shadow:
			0 16px 20px rgb(0 0 0 / 12%),
			0 8px 16px rgb(0 0 0 / 8%),
			0 0 8px rgb(0 0 0 / 8%);
		border-color: ${theme.colorToken.Outline.primaryStrong};
	`,
};

const TodoContainer = styled.div<{ status: StatusType }>`
	${baseStyles}
	${statusStyles}

	&:hover {
		${({ status }) => stateStyles.hover(status)};
	}

	&:active {
		${stateStyles.pressed};
	}

	&:focus {
		${stateStyles.floated};
	}
`;

const TodoWrapper = styled.div`
	display: flex;
	flex: 1 0 0;
	flex-direction: column;
	gap: 4px;
	align-items: flex-start;
	padding: 1rem 2.4rem 1.4rem 0;
`;

const DropdownWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	height: 6.4rem;
	padding: 0.8rem 0.8rem 2.4rem 0;
`;
