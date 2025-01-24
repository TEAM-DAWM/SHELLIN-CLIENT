import styled from '@emotion/styled';

import Images from '@/assets/images/index';

function EmptyViewToday() {
	return (
		<EmptyView>
			<EmptyImg src={Images.EMPTY.emptyTodayImg} />
		</EmptyView>
	);
}

export default EmptyViewToday;

const EmptyView = styled.div`
	display: flex;
	width: 20.772rem;
	margin-top: 22.7rem;
`;

const EmptyImg = styled.img`
	width: 100%;
`;
