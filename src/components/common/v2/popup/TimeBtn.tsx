import styled from '@emotion/styled';
import { useState } from 'react';

import Icon from '@/components/common/Icon';
import TimeDropdown from '@/components/common/v2/dropdown/TimeDropdown';

interface TimeBtnProps {
	time: string;
	setTime: (time: string) => void;
}

function TimeBtn({ time, setTime }: TimeBtnProps) {
	const [isOpen, setIsOpen] = useState(false);

	const onClickTimeBtn = () => {
		setIsOpen((prev) => !prev);
	};

	const onBlurHandler = (event: React.FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsOpen(false);
		}
	};

	const handleSelectTime = (selectedTime: string) => {
		setTime(selectedTime);
		setIsOpen(false);
	};

	return (
		<TimeBtnWrapper onBlur={onBlurHandler}>
			<TimeBtnLayout onClick={onClickTimeBtn} isActive={isOpen}>
				<TextBox>{time}</TextBox>
				<Icon name="IcnDown" size="tiny" color="nomal" />
			</TimeBtnLayout>
			{isOpen && (
				<StyledTimeDropdown>
					<TimeDropdown handleSelectTime={handleSelectTime} />
				</StyledTimeDropdown>
			)}
		</TimeBtnWrapper>
	);
}

export default TimeBtn;

const TimeBtnWrapper = styled.div`
	position: relative;
`;

const TimeBtnLayout = styled.button<{ isActive: boolean }>`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	width: auto;
	height: 3.2rem;
	padding: 0 1.6rem;

	background-color: ${({ theme, isActive }) => (isActive ? theme.color.Grey.Grey3 : theme.colorToken.Neutral.normal)};
	border: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
	border-radius: 8px;

	:hover {
		background-color: ${({ theme, isActive }) => (isActive ? theme.color.Grey.Grey3 : theme.color.Grey.Grey2)};
	}
`;

const TextBox = styled.p`
	width: auto;
	height: 1.4rem;

	color: ${({ theme }) => theme.colorToken.Text.assistive};
	${({ theme }) => theme.font.label05};
	font-weight: 500;
`;

const StyledTimeDropdown = styled.div`
	position: absolute;
	z-index: 3;
	padding-top: 0.8rem;
`;
