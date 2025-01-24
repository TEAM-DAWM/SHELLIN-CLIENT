import styled from '@emotion/styled';

import Images from '@/assets/images/index';

function EmptyViewStaging() {
	return (
		<EmptyView>
			<EmptyImg src={Images.EMPTY.emptyStagingImg} />
		</EmptyView>
	);
}

export default EmptyViewStaging;

const EmptyView = styled.div`
	display: flex;
	width: 24rem;
	height: 52rem;
	margin-top: 4rem;
`;

const EmptyImg = styled.img`
	width: 100%;
`;
