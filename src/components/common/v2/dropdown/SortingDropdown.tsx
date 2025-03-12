import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import SORT_BY, { SortOrderType } from '@/constants/sortType';

interface SortingDropDownType {
	// sortOrder: SortOrderType;
	handleSortOrder: (order: SortOrderType) => void;
}
function SortingDropdown({ handleSortOrder }: SortingDropDownType) {
	// TODO: 선택된 스타일 추가 설정해야 할 듯
	return (
		<SortingDropdownContainer>
			{Object.keys(SORT_BY).map((label, index) => (
				<ButtonLayout key={label}>
					<Button
						label={SORT_BY[label as SortOrderType]}
						onClick={() => {
							handleSortOrder(label as SortOrderType);
						}}
						size="large"
						type="text-assistive"
						additionalCss={btnCustomWidth}
					/>
					{(index === 0 || index === 2) && <Divider />}
				</ButtonLayout>
			))}
		</SortingDropdownContainer>
	);
}

const btnCustomWidth = css`
	width: 100%;
`;
const SortingDropdownContainer = styled.div`
	position: absolute;
	right: -17.7rem;
	z-index: 4;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 16.8rem;
	height: 28.8rem;
	padding: 0.8rem;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

const ButtonLayout = styled.div`
	width: 100%;
`;

const Divider = styled.div`
	align-self: center;
	width: 13.6rem;
	height: 0;
	margin: 1.6rem 0.8rem;

	border: 1px solid ${({ theme }) => theme.colorToken.Neutral.strong};
`;

export default SortingDropdown;
