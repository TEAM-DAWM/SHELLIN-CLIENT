import styled from '@emotion/styled';
import { useState } from 'react';

import ModalBackdrop from '@/components/common/modal/ModalBackdrop';
import SortingDropdown from '@/components/common/v2/dropdown/SortingDropdown';
import IconButton from '@/components/common/v2/IconButton';
import { SortOrderType } from '@/constants/sortType';

interface TargetFilterSectionProps {
	sortOrder: SortOrderType;
	handleSortOrder: (order: SortOrderType) => void;
}

function TargetFilterSection({ sortOrder, handleSortOrder }: TargetFilterSectionProps) {
	const [isSortModalOpen, setIsSortModalOpen] = useState(false);
	const isIconBtnDotted = sortOrder !== 'CUSTOM_ORDER';

	const handleArrangeBtnClick = () => {
		setIsSortModalOpen((prev) => !prev);
	};

	const handleCloseModal = () => {
		setIsSortModalOpen(false);
	};
	return (
		<>
			<IconContainer>
				<IconButton
					iconName="IcnFilter"
					size="small"
					type="normal"
					onClick={handleArrangeBtnClick}
					dot={isIconBtnDotted}
				/>
				{isSortModalOpen && <SortingDropdown handleSortOrder={handleSortOrder} />}
			</IconContainer>
			{isSortModalOpen && <ModalBackdrop onClick={handleCloseModal} />}
		</>
	);
}

const IconContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	width: 100%;
	height: 4.8rem;
	padding: 0.8rem 1.6rem;
`;

export default TargetFilterSection;
