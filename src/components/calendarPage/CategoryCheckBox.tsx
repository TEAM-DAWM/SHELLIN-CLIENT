import styled from '@emotion/styled';
import { useState } from 'react';

import Icons from '@/assets/svg/V1/index';

interface CategoryCheckBoxProps {
	category: string;
}

function CategoryCheckBox({ category }: CategoryCheckBoxProps) {
	const [isClicked, setIsClicked] = useState(false);

	const handleCheckBoxClick = () => {
		setIsClicked((prev) => !prev);
	};

	return (
		<CategoryContent>
			{isClicked ? (
				<IconWrapper onClick={handleCheckBoxClick}>
					<SelectedIcon />
				</IconWrapper>
			) : (
				<IconWrapper onClick={handleCheckBoxClick}>
					<UnSelectedIcon />
				</IconWrapper>
			)}
			<CategoryTitle>{category}</CategoryTitle>
		</CategoryContent>
	);
}

const CategoryContent = styled.div`
	display: flex;
	gap: 0.4rem;
	align-items: center;
	width: 100%;
	height: 3.2rem;

	${({ theme }) => theme.fontTheme.BODY_02};
	color: ${({ theme }) => theme.palette.Grey.Grey7};
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;

	cursor: pointer;
`;

const SelectedIcon = styled(Icons.Icn_selectbox_selected)`
	width: 1.6rem;
	height: 1.6rem;
`;

const UnSelectedIcon = styled(Icons.Icn_selectbox_Unselected)`
	width: 1.6rem;
	height: 1.6rem;
`;

const CategoryTitle = styled.p`
	height: 2.4rem;
`;
export default CategoryCheckBox;
