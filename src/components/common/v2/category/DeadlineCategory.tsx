import styled from '@emotion/styled';
import { useState } from 'react';

import Icn from '@/assets/svg/V2';
import DateTimeBtn from '@/components/common/v2/category/DateTimeBtn';
import CheckButton from '@/components/common/v2/control/CheckButton';

function DeadlineCategory() {
	const [isSettingActive, SetIsSettingActive] = useState(false);

	const handleIconClick = () => {
		SetIsSettingActive((prev) => !prev);
	};

	const handleCheckBtnClidk = () => {};

	return (
		<DeadlineCategoryContainer>
			<DeadlineBtnLayout>
				<CategoryTitleStyle>마감 기간</CategoryTitleStyle>
				{isSettingActive ? <XIconBox onClick={handleIconClick} /> : <IconBox onClick={handleIconClick} />}
			</DeadlineBtnLayout>
			{isSettingActive && (
				<>
					<DateTimeBtn date="2025/03/25 (월요일)" endTime="00:00pm" isSetDate={false} />
					<CheckButton label="하루종일" size="small" checked onClick={handleCheckBtnClidk} />
				</>
			)}
		</DeadlineCategoryContainer>
	);
}

const DeadlineCategoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: flex-start;
	justify-content: center;
	box-sizing: border-box;
	width: 37rem;
	padding: 1.6rem 0;

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
	padding: 0 0.4rem;
`;

const CategoryTitleStyle = styled.div`
	height: 1.3rem;
	padding: 0 1.2rem;

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
