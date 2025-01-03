import styled from '@emotion/styled';

import SortBtn from '../../button/SortBtn';

import SORT_BY from '@/constants/sortType';
import { SortOrderType } from '@/types/sortOrderType';

interface ModalArrangeProps {
	sortOrder: SortOrderType;
	handleSortOrder: (order: SortOrderType) => void;
}
function ModalArrange({ sortOrder, handleSortOrder }: ModalArrangeProps) {
	return (
		<ModalArrangeLayout onClick={(e) => e.stopPropagation()}>
			<SortBy>
				<SortBtn text={SORT_BY.NEWEST} isActive={sortOrder === 'recent'} onClick={() => handleSortOrder('recent')} />
				<SortBtn text={SORT_BY.OLDEST} isActive={sortOrder === 'old'} onClick={() => handleSortOrder('old')} />
			</SortBy>
			<ModalArrangeLine />
			<SortBy>
				<SortBtn text={SORT_BY.CLOSEST} isActive={sortOrder === 'near'} onClick={() => handleSortOrder('near')} />
				<SortBtn text={SORT_BY.FARTHEST} isActive={sortOrder === 'far'} onClick={() => handleSortOrder('far')} />
			</SortBy>
		</ModalArrangeLayout>
	);
}

export default ModalArrange;

const ModalArrangeLayout = styled.div`
	position: absolute;
	top: 16rem;
	left: 44.8rem;
	z-index: 4;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	gap: 1.2rem;
	align-items: center;
	justify-content: center;
	width: 10.6rem;
	height: 14.6rem;
	padding: 0.6rem;

	background: ${({ theme }) => theme.palette.Grey.White};
	box-shadow: 0 0.3rem 0.8rem 0 rgb(0 0 0 / 32%);
	border-radius: 10px;
`;

const SortBy = styled.div`
	display: flex;
	flex-direction: column;
`;

const ModalArrangeLine = styled.div`
	display: flex;
	width: 11.8rem;
	height: 0.1rem;

	background-color: ${({ theme }) => theme.palette.Grey.Grey2};
`;
