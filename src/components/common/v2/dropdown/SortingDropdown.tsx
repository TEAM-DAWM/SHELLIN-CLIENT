import { css, useTheme, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import SORT_BY, { SortOrderType } from '@/constants/sortType';

interface SortingDropDownType {
	selectedSortOrder: SortOrderType;
	handleSortOrder: (order: SortOrderType) => void;
}
function SortingDropdown({ handleSortOrder, selectedSortOrder }: SortingDropDownType) {
	const theme = useTheme();

	return (
		<SortingDropdownContainer>
			{Object.keys(SORT_BY).map((label, index) => {
				const isSelected = selectedSortOrder === label;

				return (
					<ButtonLayout key={label}>
						<Button
							label={SORT_BY[label as SortOrderType]}
							onClick={() => {
								handleSortOrder(label as SortOrderType);
							}}
							size="large"
							type="text-assistive"
							additionalCss={btnCustomWidth(isSelected, theme)}
						/>
						{(index === 0 || index === 2) && <Divider />}
					</ButtonLayout>
				);
			})}
		</SortingDropdownContainer>
	);
}

const btnCustomWidth = (isSelected: boolean, theme: Theme) => css`
	width: 100%;

	background-color: ${isSelected ? theme.color.Grey.Grey3 : 'transparent'};
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
