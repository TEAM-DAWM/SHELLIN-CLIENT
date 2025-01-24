import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import userLogout from '@/apis/logout/logoutAxios';
import Images from '@/assets/images';

function LogOutBtn() {
	const navigate = useNavigate();

	const handleLogoutButton = async () => {
		try {
			await userLogout();
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<LogOutBox onClick={handleLogoutButton}>
			<GoogleImg src={Images.googleIcon} />
			로그아웃
		</LogOutBox>
	);
}

export default LogOutBtn;

const LogOutBox = styled.button`
	display: flex;
	gap: 1.12rem;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 32rem;
	height: 5.6rem;
	padding: 0 3.5rem 0 2.24rem;

	color: ${({ theme }) => theme.color.Grey.White};

	background: ${({ theme }) => theme.color.Grey.Black};
	border-radius: 12px;
	${({ theme }) => theme.font.title02};
`;

const GoogleImg = styled.img`
	width: 2.4rem;
	height: 2.4rem;
	margin-right: 1.12rem;
`;
