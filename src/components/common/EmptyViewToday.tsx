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
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20.772rem;
	margin-top: 22.7rem;
	inset: 22.5rem 10.4rem 34rem;
`;

const EmptyImg = styled.img`
	width: 100%;
`;
