import styled from '@emotion/styled';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Images from '@/assets/images';
import MainDate from '@/components/common/v2/TextBox/MainDate';
import GoogleLoginBtn from '@/components/loginPage/GoogleLoginBtn';

function Login() {
	const LOGIN_CLIENT_ID = import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID;

	return (
		<GoogleOAuthProvider clientId={LOGIN_CLIENT_ID}>
			<LoginLayout>
				<LeftSection>
					<MainDate year={2024} month={11} day={27} />

					<LogoTitleImg src={Images.titleIcon} />
					<LoginBtn>
						<GoogleLoginBtn />
						<SignDescription>
							가입하면 자동으로{' '}
							<a
								href="https://topaz-work-262.notion.site/aa83c69d45144f1182f9f54f1fae8c38"
								target="_blank"
								rel="noreferrer"
							>
								개인정보보호정책
							</a>
							과{' '}
							<a
								href="https://topaz-work-262.notion.site/aa83c69d45144f1182f9f54f1fae8c38"
								target="_blank"
								rel="noreferrer"
							>
								이용약관
							</a>
							에 동의한 것으로 간주됩니다.
						</SignDescription>
					</LoginBtn>
				</LeftSection>
				<LoginImg src={Images.BG.loginBg} />
			</LoginLayout>
		</GoogleOAuthProvider>
	);
}

const LoginLayout = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 136.6rem;
	height: 76.8rem;

	background-color: ${({ theme }) => theme.palette.Grey.White};
	border-radius: 8px;
`;

const LeftSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 8.2rem;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 100%;
`;

const LoginImg = styled.img`
	width: 50%;
	height: 100%;

	border-radius: 0 8px 8px 0;
`;

const LogoTitleImg = styled.img`
	width: 34rem;
	height: 8rem;
`;

const LoginBtn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	align-items: center;
	width: 32.4rem;
	height: 9.5rem;
`;

const SignDescription = styled.p`
	width: 24rem;

	color: ${({ theme }) => theme.palette.Grey.Grey5};
	text-align: center;

	${({ theme }) => theme.fontTheme.CAPTION_02};
	a {
		color: ${({ theme }) => theme.palette.Grey.Grey5};
	}
`;
export default Login;
