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
	position: absolute;
	inset: -0.8rem 10.4rem 34rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24rem;
	height: 52rem;
`;

const EmptyImg = styled.img`
	width: 100%;
`;
