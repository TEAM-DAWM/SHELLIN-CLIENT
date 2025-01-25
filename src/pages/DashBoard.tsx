import styled from '@emotion/styled';
import { useState } from 'react';

import useGetTasksPeriod from '@/apis/dashboard/tasksPeriod/query';
import DashboardDateContainer from '@/components/DashboardPage/DashboardDateContainer';
import DashboardTaskWrapper from '@/components/DashboardPage/DashboardTaskWrapper';
import DateArea from '@/components/DashboardPage/DateArea';
import TaskSummary from '@/components/DashboardPage/TaskSummary';
import SUMMARY_INFO from '@/constants/dashboardSummaryInfo';
import { formatDatetoLocalDate } from '@/utils/formatDateTime';

function DashBoard() {
	const today = new Date();
	const initialStartDate = new Date(today);
	initialStartDate.setDate(today.getDate() - 13);

	const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
	const [endDate, setEndDate] = useState<Date | null>(today);
	const formattedStartDate = formatDatetoLocalDate(startDate);
	const formattedEndDate = formatDatetoLocalDate(endDate);

	const { data } = useGetTasksPeriod({ formattedStartDate, formattedEndDate });

	const handleDate = (newStartDate: Date, newEndDate: Date) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
	};

	return (
		<DashBoardLayout>
			<DashboardDateContainer />
			<DashboardTaskWrapper />
			<DataWrapper>
				<DateArea isHover isPressed handleDate={handleDate} />
			</DataWrapper>
			<TaskSummaryWrapper>
				{SUMMARY_INFO.map((info) => (
					<TaskSummary
						key={info.name}
						text={info.text}
						data={data.data[info.name]}
						unit={info.unit}
						icon={info.icon}
						image={info.imagePate}
					/>
				))}
			</TaskSummaryWrapper>
		</DashBoardLayout>
	);
}

export default DashBoard;

const DashBoardLayout = styled.div`
	display: flex;
	flex-direction: column;
	width: 127.8rem;
	height: 100%;
`;

const DataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	width: 100%;
	height: 6.7rem;
	margin-top: 1rem;
`;

const TaskSummaryWrapper = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	align-self: stretch;
	box-sizing: border-box;
	width: 100%;
	height: 21.4rem;
	padding: 0.4rem 0 2.8rem 0.7rem;
`;
