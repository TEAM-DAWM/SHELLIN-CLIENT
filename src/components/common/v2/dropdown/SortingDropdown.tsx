import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';

function SortingDropdown() {
	return (
		<SortingDropdownContainer>
			<Button label="사용자 설정순" onClick={() => {}} size="large" type="text-assistive" disabled={false} />
			<Divider />
			<Button label="최신 등록순" onClick={() => {}} size="large" type="text-assistive" disabled={false} />
			<Button label="오래된 등록순" onClick={() => {}} size="large" type="text-assistive" disabled={false} />
			<Divider />
			<Button label="가까운 마감기한순" onClick={() => {}} size="large" type="text-assistive" disabled={false} />
			<Button label="먼 마감기한순" onClick={() => {}} size="large" type="text-assistive" disabled={false} />
		</SortingDropdownContainer>
	);
}

const SortingDropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 16.8rem;
	height: 28.8rem;
	padding: 0.8rem;

	border-radius: 12px;
	${({ theme }) => theme.shadow.FloatingAction3};
`;

const Divider = styled.div`
	align-self: center;
	width: 13.6rem;
	height: 0;
	margin: 1.6rem 0;

	border: 1px solid ${({ theme }) => theme.colorToken.Neutral.strong};
`;

export default SortingDropdown;
