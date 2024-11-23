import styled from '@emotion/styled';

import Icons from '@/assets/svg/index';

function DeadlineCategory() {
	return (
		<DeadlineCategoryContainer>
			<DeadlineBtnLayout>
				마감 기한 <Icons.PlusCircle /> {/* 아이콘 임시 설정 */}
			</DeadlineBtnLayout>
		</DeadlineCategoryContainer>
	);
}

const DeadlineCategoryContainer = styled.div`
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	width: 36.8rem;
	height: 5.6rem;
	padding: 1.6rem 0;

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

	${({ theme }) => theme.font.label05};
`;
export default DeadlineCategory;
