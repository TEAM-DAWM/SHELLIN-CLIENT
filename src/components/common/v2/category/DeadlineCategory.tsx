import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import Icn from '@/assets/svg/V2';
import DateTimeBtn from '@/components/common/v2/category/DateTimeBtn';
import CheckButton from '@/components/common/v2/control/CheckButton';

interface DeadlineCategoryProps {
	date: string;
	startTime?: string;
	endTime: string;
	lable: string;
}

function DeadlineCategory({ date, startTime, endTime, lable }: DeadlineCategoryProps) {
	const [isSettingActive, setIsSettingActive] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [isAllday, setIsAllday] = useState(false);

	const containerRef = useRef(null);

	const handleIconClick = () => {
		setIsClicked((prev) => !prev);
	};

	const handleCheckBtnClick = () => {
		setIsAllday((prev) => !prev);
	};

	const handleXBtnClick = () => {
		setIsSettingActive(false);
		setIsClicked(false);
		setIsAllday(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			event.target instanceof Node &&
			(containerRef.current as HTMLDivElement).contains(event.target) === false
		) {
			setIsSettingActive(true);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<DeadlineCategoryContainer ref={containerRef}>
			<DeadlineBtnLayout>
				<CategoryTitleStyle>{lable}</CategoryTitleStyle>
				{isClicked ? <XIconBox onClick={handleXBtnClick} /> : <IconBox onClick={handleIconClick} />}
			</DeadlineBtnLayout>
			{isClicked && (
				<>
					<DateTimeBtn
						date={date}
						startTime={startTime}
						endTime={endTime}
						isSetDate={isSettingActive}
						isAllday={isAllday}
					/>
					{!isSettingActive && (
						<CheckButton label="하루종일" size="small" checked={isAllday} onClick={handleCheckBtnClick} />
					)}
				</>
			)}
		</DeadlineCategoryContainer>
	);
}

const DeadlineCategoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-start;
	justify-content: center;
	box-sizing: border-box;
	width: 37rem;
	padding: 1.6rem 0;

	color: ${({ theme }) => theme.colorToken.Text.assistive};

	border-top: 1px solid ${({ theme }) => theme.color.Grey.Grey3};
	border-bottom: 1px solid ${({ theme }) => theme.color.Grey.Grey3};
`;

const DeadlineBtnLayout = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	width: 100%;
	height: 2.4rem;
`;

const CategoryTitleStyle = styled.div`
	height: 1.3rem;
	padding: 0 0 0 1.2rem;

	${({ theme }) => theme.font.label05};
`;

const IconBox = styled(Icn.IcnPlus)`
	width: 1.6rem;
	height: 1.6rem;

	cursor: pointer;
`;

const XIconBox = styled(Icn.IcnX)`
	width: 1.6rem;
	height: 1.6rem;

	cursor: pointer;
`;
export default DeadlineCategory;
