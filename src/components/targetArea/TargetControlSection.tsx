import styled from '@emotion/styled';
import { useState } from 'react';

import DateCorrectionModal from '@/components/common/datePicker/DateCorrectionModal';
import Icon from '@/components/common/Icon';
import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import Button from '@/components/common/v2/button/Button';
import MODAL from '@/constants/modalLocation';
import { TargetControlSectionProps } from '@/types/today/TargetControlSectionProps';
import formatDatetoString from '@/utils/formatDatetoString';

function TargetControlSection({
	onClickPrevDate,
	onClickNextDate,
	onClickTodayDate,
	onClickDatePicker,
	targetDate,
}: TargetControlSectionProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleArrangeBtnClick = () => {
		setIsModalOpen((prev) => !prev);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<TargetControlSectionLayout>
				<ModalLayout>
					<Icon name="IcnCalendar" color="nomal" onClick={handleArrangeBtnClick} isCusor />
					{isModalOpen && (
						<DateCorrectionModal
							top={MODAL.DATE_CORRECTION.TARGET.top}
							left={MODAL.DATE_CORRECTION.TARGET.left}
							date={formatDatetoString(targetDate)}
							time={null}
							onClick={handleCloseModal}
							isDateOnly
							handleCurrentDate={onClickDatePicker}
						/>
					)}
				</ModalLayout>
				<BtnWrapper>
					<Button type="outlined-assistive" label="오늘" size="medium" onClick={onClickTodayDate} />
					<IconLayout>
						<Icon name="IcnLeft" color="nomal" onClick={onClickPrevDate} isCusor />
					</IconLayout>
					<IconLayout>
						<Icon name="IcnRight" color="nomal" onClick={onClickNextDate} isCusor />
					</IconLayout>
				</BtnWrapper>
			</TargetControlSectionLayout>
			{isModalOpen && <ModalBackdrop onClick={handleCloseModal} />}
		</>
	);
}

const ModalLayout = styled.div`
	position: relative;
`;

const TargetControlSectionLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	height: 4.8rem;
	padding: 0 1.6rem 0 2.8rem;
`;
const BtnWrapper = styled.div`
	display: flex;
	gap: 0.8rem;
	width: fit-content;
`;

const IconLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border: 1px solid ${({ theme }) => theme.color.Grey.Grey6};
	border-radius: 8px;

	:hover {
		background-color: ${({ theme }) => theme.color.Grey.Grey2};
	}

	:active {
		background-color: ${({ theme }) => theme.color.Grey.Grey3};
	}
`;

export default TargetControlSection;
