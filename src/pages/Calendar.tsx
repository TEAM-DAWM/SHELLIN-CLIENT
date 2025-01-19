import styled from '@emotion/styled';
import { useState } from 'react';

import { CategoryResponse } from '@/apis/categoryList/categoryResponse';
import useGetCategory from '@/apis/categoryList/query';
import Images from '@/assets/images';
import CategoryBox from '@/components/calendarPage/CategoryBox';
import MiniCalendar from '@/components/calendarPage/miniCalendar/MiniCalendar';
import FullCalendarBox from '@/components/common/fullCalendar/FullCalendarBox';
import LoadingSpinner from '@/components/common/spinner/Spinner';

function Calendar() {
	const today = new Date();
	const [selectDate, setSelectDate] = useState<Date | null>(today);

	const onClickDate = (date: Date | null) => {
		setSelectDate(date);
	};

	const handleChangeDate = (target: Date) => {
		setSelectDate(target);
	};

	const { data, isLoading } = useGetCategory();
	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<CalendarLayout>
			<LeftSection>
				<MiniCalendar selectDate={selectDate} onClickDate={onClickDate} />
				<CategoryBoxLayout>
					<TitleBox>카테고리</TitleBox>
					{data && data.length > 0 ? (
						data.map((category: CategoryResponse) => (
							<CategoryBox key={category.email} email={category.email} categoryList={category.categories} />
						))
					) : (
						<EmptyView>
							<EmptyImg src={Images.EMPTY.categoryImg} />
						</EmptyView>
					)}
				</CategoryBoxLayout>
			</LeftSection>
			<RightSection>
				<FullCalendarBoxWapper>
					<FullCalendarBox size="big" selectDate={selectDate} handleChangeDate={handleChangeDate} />
				</FullCalendarBoxWapper>
			</RightSection>
		</CalendarLayout>
	);
}

const CalendarLayout = styled.div`
	display: flex;
	gap: 1rem;
	box-sizing: border-box;
	height: 76.8rem;
	padding: 1rem 1.6rem 1rem 0.7rem;
`;

const LeftSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: center;
	box-sizing: border-box;
	width: 33.4rem;
	height: 100%;
`;

const RightSection = styled.section`
	height: 74.8rem;
`;

const FullCalendarBoxWapper = styled.div`
	box-sizing: border-box;
	width: 94.4rem;
	height: 74.8rem;
	padding: 18px 0 0 17px;

	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 12px;
`;

const CategoryBoxLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	width: 31.7rem;
	height: 100%;
	min-height: 46.1rem;
	max-height: 49.3rem;

	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 12px;
`;

const TitleBox = styled.h2`
	box-sizing: border-box;
	height: 6.6rem;
	padding: 2rem 0.8rem 1.8rem 2.8rem;
	${({ theme }) => theme.fontTheme.HEADLINE_02};
`;

const EmptyView = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const EmptyImg = styled.img`
	width: 19rem;
	height: 21.4rem;
	margin-top: 6rem;
`;
export default Calendar;
