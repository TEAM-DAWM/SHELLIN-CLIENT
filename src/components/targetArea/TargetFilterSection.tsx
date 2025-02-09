import styled from '@emotion/styled';

import Icon from '@/components/common/Icon';

function TargetFilterSection() {
	return (
		<TargetFilterSectionLayout>
			<Icon name="IcnFilter" color="nomal" size="medium" />
		</TargetFilterSectionLayout>
	);
}

const TargetFilterSectionLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	box-sizing: border-box;
	width: 100%;
	height: 4.8rem;
	padding: 0.8rem 1.6rem;

	border-top: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
`;

export default TargetFilterSection;
