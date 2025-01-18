import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/Icon';
import CheckButton from '@/components/common/v2/control/CheckButton';
import DateTimeBtn from '@/components/common/v2/popup/DateTimeBtn';

interface DeadlineBoxProps {
	date: Date;
	startTime?: string;
	endTime: string;
	label: string;
	isDueDate?: boolean;
	handleDueDateModalTime?: (time: string) => void;
	handleDueDateModalDate?: (date: Date) => void;
}

function DeadlineBox({
	date,
	startTime,
	endTime,
	label,
	isDueDate = false,
	handleDueDateModalTime = () => {},
	handleDueDateModalDate = () => {},
}: DeadlineBoxProps) {
	const [isSettingActive, setIsSettingActive] = useState(false);
	const [isClicked, setIsClicked] = useState(isDueDate);
	const [isAllday, setIsAllday] = useState(false);

	const containerRef = useRef(null);

	const handlePlusBtnClick = () => {
		setIsClicked((prev) => !prev);
		setIsSettingActive(false);
	};
	const removeTime = () => {
		handleDueDateModalTime('');
	};
	const handleCheckBtnClick = () => {
		setIsAllday((prev) => !prev);

		// 하루종일 선택시 기존 time 제거
		removeTime();
	};

	const handleXBtnClick = () => {
		setIsSettingActive(false);
		setIsClicked((prev) => !prev);
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

	const handleClickModify = () => {
		setIsSettingActive(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			{!isDueDate && <Divder />}
			<DeadlineBoxContainer ref={containerRef}>
				<DeadlineBtnLayout>
					<CategoryTitleStyle>{label}</CategoryTitleStyle>
					{!isDueDate && (
						<div>
							{isClicked ? (
								<Icon name="IcnX" size="tiny" color="strong" onClick={handleXBtnClick} isCursor />
							) : (
								<Icon name="IcnPlus" size="tiny" color="strong" onClick={handlePlusBtnClick} isCursor />
							)}
						</div>
					)}
				</DeadlineBtnLayout>
				{isClicked && (
					<>
						<DateTimeBtn
							date={date}
							startTime={startTime}
							endTime={endTime}
							isSetDate={isSettingActive}
							isAllday={isAllday}
							onClick={handleClickModify}
							handleDueDateModalDate={handleDueDateModalDate}
							handleDueDateModalTime={handleDueDateModalTime}
						/>
						{!isSettingActive && (
							<CheckButton label="하루종일" size="small" checked={isAllday} onClick={handleCheckBtnClick} />
						)}
					</>
				)}
			</DeadlineBoxContainer>
			{!isDueDate && <Divder />}
		</>
	);
}

const DeadlineBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-start;
	justify-content: center;
	box-sizing: border-box;
	width: 37rem;
	padding: 1.6rem 0;

	color: ${({ theme }) => theme.colorToken.Text.assistive};
`;
const Divder = styled.div`
	width: 100%;
	height: 0.1rem;

	background-color: ${({ theme }) => theme.color.Grey.Grey3};
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

export default DeadlineBox;
