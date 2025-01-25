import styled from '@emotion/styled';
import { useState } from 'react';

import DateCorrectionModal from '@/components/common/datePicker/DateCorrectionModal';
import Icon from '@/components/common/Icon';
import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import Button from '@/components/common/v2/button/Button';
import IconButton from '@/components/common/v2/IconButton';
import MODAL from '@/constants/modalLocation';
import { TargetControlSectionProps } from '@/types/today/TargetControlSectionProps';
import { formatDatetoString } from '@/utils/formatDateTime';

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
					<Icon name="IcnCalendar" color="nomal" onClick={handleArrangeBtnClick} isCursor />
					{isModalOpen && (
						<DateCorrectionModal
							top={MODAL.DATE_CORRECTION.TARGET.top}
							left={MODAL.DATE_CORRECTION.TARGET.left}
							date={formatDatetoString(targetDate)}
							onClick={handleCloseModal}
							handleCurrentDate={onClickDatePicker}
						/>
					)}
				</ModalLayout>
				<BtnWrapper>
					<Button type="outlined-assistive" label="오늘" size="medium" onClick={onClickTodayDate} />
					<IconButton type="outlined" size="small" iconName="IcnLeft" onClick={onClickPrevDate} />
					<IconButton type="outlined" size="small" iconName="IcnRight" onClick={onClickNextDate} />
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

export default TargetControlSection;
