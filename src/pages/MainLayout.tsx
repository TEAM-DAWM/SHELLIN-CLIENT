import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

function MainLayout() {
	return (
		<MainLayOutContainer>
			<Outlet />
		</MainLayOutContainer>
	);
}
const MainLayOutContainer = styled.div`
	position: relative;
	width: 192rem;
	height: 108rem;
	padding-left: 7.2rem;

	background-color: ${({ theme }) => theme.colorToken.Component.strong};
	border-radius: 8px;
`;

export default MainLayout;
