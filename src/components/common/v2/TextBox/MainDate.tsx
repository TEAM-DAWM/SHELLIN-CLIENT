import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { theme } from '@/styles/theme';
import getToday from '@/utils/getToday';

type MainDateProps = {
	year?: number;
	month: number;
	day?: number;
};

const TextContainer = styled.div`
	display: flex;
	gap: 1px;
	align-items: flex-end;

	.value-text {
		${theme.font.title01};
		color: ${theme.color.Grey.Grey8};
		font-weight: 500;
	}

	.text {
		${theme.font.label03};
		padding-bottom: 0.3rem;

		color: ${theme.color.Grey.Grey6};
		font-weight: 600;
	}
`;

function Date({ value, text }: { value?: number; text: string }) {
	return value ? (
		<TextContainer>
			<span className="value-text">{value}</span>
			<span className="text">{text}</span>
		</TextContainer>
	) : null;
}

const { year: TodayYear, month: TodayMonth, date: TodayDay } = getToday();

function MainDate({ year, month, day }: MainDateProps) {
	const [isToday, setIsToday] = useState(false);

	// console.log('todayDate', TodayYear, TodayMonth, TodayDay);
	// console.log('inputDate', year, month, day);

	useEffect(() => {
		if ((year === undefined || TodayYear === year) && TodayMonth === month && TodayDay === day) {
			setIsToday(true);
		} else {
			setIsToday(false);
		}
	}, [year, month, day]);

	return (
		<MainDateContainer>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '0.4rem' }}>
				<Date value={year} text="년" />
				<Date value={month} text="월" />
				<Date value={day} text="일" />
			</div>
			{isToday && (
				<button className="btn" type="button">
					오늘
				</button>
			)}
		</MainDateContainer>
	);
}

export default MainDate;

const MainDateContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: flex-end;

	background-color: ${theme.color.Grey.White};

	& .btn {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 1px 8px;

		${theme.font.body03}

		color: ${theme.color.Grey.White};
		font-weight: 600;
		text-align: center;

		background: ${theme.color.Blue.Blue6};
		border-radius: 4px;
	}
`;

// 년/월/일 -> 오늘 on/off
// 년/월 -> 오늘 off
// 월/일 -> (항상 올해라고 가정하고) 오늘 on/off
// 년/일 -> 이런 거 없음 (?)

// 최종
// 년은 입력 없으면 디폴트로 올해라고 가정.
// 일 안들어오면 '오늘' off
// 월은 무조건 들어와야함.
// 월, 일 들어오면 비교
