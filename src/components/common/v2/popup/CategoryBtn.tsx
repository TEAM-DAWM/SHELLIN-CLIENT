import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';

interface CategoryBtnProps {
	categoryName: string;
	isSettingActive: boolean;
	onClick: () => void;
}

function CategoryBtn({ categoryName, isSettingActive = false, onClick }: CategoryBtnProps) {
	return isSettingActive ? (
		<CategoryBtnContainer onClick={onClick}>
			<Button
				label={categoryName}
				leftIcon="IcnModify"
				onClick={() => {}}
				rightIcon="IcnColorchip"
				size="medium"
				type="outlined-assistive"
				disabled={false}
			/>
		</CategoryBtnContainer>
	) : (
		<CategoryBtnContainer>
			<Button
				label="카테고리"
				leftIcon="IcnPlus"
				onClick={() => {}}
				size="medium"
				type="outlined-assistive"
				disabled={false}
			/>
		</CategoryBtnContainer>
	);
}

const CategoryBtnContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-start;
`;

export default CategoryBtn;
