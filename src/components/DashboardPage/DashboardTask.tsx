import styled from '@emotion/styled';
import { useState } from 'react';

import useGetTasksToday from '@/apis/dashboard/tasksToday/query';
import BtnTask from '@/components/common/BtnTask/BtnTask';
import { TaskType } from '@/types/tasks/taskType';
import { formatDatetoLocalDate } from '@/utils/formatDateTime';

interface DashboardTaskProps {
	taskStatus: string;
	emptyStatus: string;
	emptyImg: string;
	text: 'upcoming' | 'deferred' | 'inprogress';
}
function DashboardTask({ text, taskStatus, emptyStatus, emptyImg }: DashboardTaskProps) {
	const [selectedTarget, setSelectedTarget] = useState<TaskType | null>(null);
	const handleSelectedTarget = (task: TaskType | null) => {
		setSelectedTarget(task);
	};

	const EmptyImageWrapper = styled.div`
		justify-content: center;
		width: 19rem;
		height: auto;
	`;

	const { data, isError } = useGetTasksToday(text);

	return (
		<TaskLayout>
			{!isError && (
				<>
					<TextBox>
						<TaskText text={text}>{taskStatus}</TaskText>
						<NumberTextBox>
							<Number>{data.data.tasks.length}</Number>
							<NumberText>개</NumberText>
						</NumberTextBox>
					</TextBox>

					<ScrollArea>
						{data.data.tasks.length === 0 ? (
							<EmptyWrapper>
								<EmptyImageWrapper>
									<ImageComponent src={emptyImg} />
								</EmptyImageWrapper>
								<EmptyText text={text}>{emptyStatus}</EmptyText>
							</EmptyWrapper>
						) : (
							<>
								{data.data.tasks.map((task: TaskType) => (
									<BtnTask
										location="dashboard"
										key={task.id + task.name}
										id={task.id}
										name={task.name}
										status={task.status}
										deadLine={task.deadLine}
										selectedTarget={selectedTarget}
										preventDoubleClick
										handleSelectedTarget={handleSelectedTarget}
										dashBoardInprogress={text === 'inprogress'}
										targetDate={formatDatetoLocalDate(new Date())}
									/>
								))}
							</>
						)}
					</ScrollArea>
				</>
			)}
		</TaskLayout>
	);
}

const TaskLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	box-sizing: border-box;
	width: 41.7rem;
	height: 41rem;
	padding: 0 0 0 6px;

	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 12px;
`;

const TextBox = styled.span`
	display: flex;
	justify-content: space-between;
	width: 41.7rem;
	height: 7rem;
`;

const TaskText = styled.div<{ text: string }>`
	display: flex;
	align-items: flex-start;
	min-width: 11.8rem;
	padding: 1.8rem 0 2rem 2.2rem;
	${({ theme }) => theme.fontTheme.HEADLINE_02};

	color: ${({ theme }) => theme.palette.Grey.Black};
`;

const NumberTextBox = styled.div`
	display: flex;
	align-items: center;
	width: 3.8rem;
	height: 4rem;
	margin: 1.5rem 2.2rem 1.5rem 0;
`;

const Number = styled.p`
	${({ theme }) => theme.fontTheme.TITLE_02};
	color: ${({ theme }) => theme.palette.Grey.Grey8};
`;

const NumberText = styled.p`
	${({ theme }) => theme.fontTheme.HEADLINE_02}
	color: ${({ theme }) => theme.palette.Grey.Grey7}
`;

const ScrollArea = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: stretch;
	width: 100%;
	height: 33.9rem;
	padding: 0 0 5rem;

	/* overflow: auto; */
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 0.6rem;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.palette.Grey.Grey6};
		visibility: hidden;
		border-radius: 3px;
	}

	&:hover::-webkit-scrollbar-thumb {
		visibility: visible;
	}
`;

const EmptyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const EmptyText = styled.p<{ text: string }>`
	display: flex;
	justify-content: center;

	${({ theme }) => theme.fontTheme.CAPTION_01};
	color: ${({ theme }) => theme.palette.Grey.Grey4};
`;

const ImageComponent = styled.img`
	width: 100%;
	height: 100%;
`;

export default DashboardTask;
