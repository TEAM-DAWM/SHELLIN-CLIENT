import styled from '@emotion/styled';
import { useState } from 'react';

import ArrangeBtn from '../arrangeBtn/ArrangeBtn';
import TextBtn from '../button/textBtn/TextBtn';
import ModalBackdrop from '../modal/ModalBackdrop';

import { StagingAreaSettingProps } from '@/types/today/stagingAreaSettingProps';

function StagingAreaSetting({ handleTextBtnClick, activeButton }: StagingAreaSettingProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleArrangeBtnClick = () => {
		setIsModalOpen((prev) => !prev);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<StagingAreaSettingLayout>
			<TextBtnContainer>
				<TextBtn
					size="small"
					text="전체"
					color={activeButton === '전체' ? 'BLUE' : 'WHITE'}
					mode={activeButton === '전체' ? 'DEFAULT' : 'LIGHT'}
					isHover
					isPressed
					onClick={() => handleTextBtnClick('전체')}
				/>
				<TextBtn
					size="small"
					text="지연"
					color={activeButton === '지연' ? 'BLUE' : 'WHITE'}
					mode={activeButton === '지연' ? 'DEFAULT' : 'LIGHT'}
					isHover
					isPressed
					onClick={() => handleTextBtnClick('지연')}
				/>
			</TextBtnContainer>
			<ArrangeContainer>
				<ArrangeBtn type="set" mode="DEFAULT" color="WHITE" size="small" onClick={handleArrangeBtnClick} />
				{/* ModalArrange 컴포넌트 삭제로 주석처리 */}
				{/* {isModalOpen && <ModalArrange sortOrder={sortOrder} handleSortOrder={handleSortOrder} />} */}
			</ArrangeContainer>
			{isModalOpen && <ModalBackdrop onClick={handleCloseModal} />}
		</StagingAreaSettingLayout>
	);
}

export default StagingAreaSetting;

const StagingAreaSettingLayout = styled.div`
	display: flex;
	align-items: center;
	align-self: stretch;
	justify-content: space-between;
`;

const TextBtnContainer = styled.div`
	display: flex;
	gap: 0.4rem;
	align-items: center;
	padding-left: 0.4rem;
`;

const ArrangeContainer = styled.div`
	position: relative;
`;
