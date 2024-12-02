import styled from '@emotion/styled';
import { useState } from 'react';

import Icn from '@/assets/svg/V2';

function DeadlineCategory() {
	const [isSettingActive, SetIsSettingActive] = useState(false);

	const handleIconClick = () => {
		SetIsSettingActive((prev) => !prev);
	};

	return (
		<DeadlineCategoryContainer>
			<DeadlineBtnLayout>
				<CategoryTitleStyle>마감 기간</CategoryTitleStyle>
				{isSettingActive ? <XIconBox onClick={handleIconClick} /> : <IconBox onClick={handleIconClick} />}
			</DeadlineBtnLayout>
		</DeadlineCategoryContainer>
	);
}

const DeadlineCategoryContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 37rem;
	height: 5.6rem;

	color: ${({ theme }) => theme.colorToken.Text.assistive};

	border-top: 1px solid ${({ theme }) => theme.color.Grey.Grey3};
	border-bottom: 1px solid ${({ theme }) => theme.color.Grey.Grey3};
`;

const DeadlineBtnLayout = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	width: 100%;
	height: 2.4rem;
	padding: 0 1.2rem;
`;

const CategoryTitleStyle = styled.div`
	height: 1.3rem;

	${({ theme }) => theme.font.label05};
`;

const IconBox = styled(Icn.IcnPlus)`
	width: 1.6rem;
	height: 1.6rem;

	cursor: pointer;
`;

const XIconBox = styled(Icn.IcnX)`
	width: 1.6rem;
	height: 1.6rem;

	cursor: pointer;
`;
export default DeadlineCategory;
