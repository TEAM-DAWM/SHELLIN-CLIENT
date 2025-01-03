import styled from '@emotion/styled';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import userLogin from '@/apis/login/loginAxios';
import Images from '@/assets/images';

function GoogleLoginBtn() {
	const navigate = useNavigate();
	const googleSocialLogin = useGoogleLogin({
		onSuccess: async ({ code }) => {
			try {
				const response = await userLogin(code);
				if (response.code === 'success') {
					localStorage.setItem('accessToken', response.data.accessToken);
					localStorage.setItem('refreshToken', response.data.refreshToken);
					navigate('/today');
				}
			} catch (error) {
				console.error(error);
			}
		},
		onError: (errorResponse) => {
			console.error(errorResponse);
		},
		flow: 'auth-code',
		scope: 'email profile',
	});
	return (
		<GoogleBtn onClick={googleSocialLogin}>
			<GoogleImg src={Images.googleIcon} />
			구글 로그인
		</GoogleBtn>
	);
}
const GoogleBtn = styled.button`
	display: flex;
	gap: 1.12rem;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 5.6rem;
	padding-right: 10.32rem;

	color: ${({ theme }) => theme.palette.Grey.White};

	background-color: ${({ theme }) => theme.color.Grey.Black};
	border-radius: 16.8px;
	${({ theme }) => theme.font.title02};
`;
const GoogleImg = styled.img`
	width: 2.4rem;
	height: 2.4rem;
`;
export default GoogleLoginBtn;
