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

	width: 100%;
	height: 100vh;

	background-color: ${({ theme }) => theme.colorToken.Component.strong};
`;

export default MainLayout;
