import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import SORT_BY from '@/constants/sortType';

function SortingDropdown() {
	return (
		<SortingDropdownContainer>
			{Object.values(SORT_BY).map((label, index) => (
				<ButtonLayout key={label}>
					<Button label={label} onClick={() => {}} size="large" type="text-assistive" />
					{(index === 0 || index === 2) && <Divider />}
				</ButtonLayout>
			))}
		</SortingDropdownContainer>
	);
}

const SortingDropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 16.8rem;
	height: 28.8rem;
	padding: 0.8rem;

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
