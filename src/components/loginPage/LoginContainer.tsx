import styled from '@emotion/styled';

import Images from '@/assets/images';

function LoginContainer() {
	return (
		<LoginWrapper>
			<LogoTitleImg src={Images.smallLogo} />
			<TextBox>
				<MainTitle>한눈에 보는 나만의 일정 관리 서비스</MainTitle>
				<SubTitle>지금 시작하세요</SubTitle>
			</TextBox>
		</LoginWrapper>
	);
}

const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-items: start;
	justify-content: start;
	width: 22.8rem;
	height: 16.2rem;
`;

const LogoTitleImg = styled.img`
	display: flex;
	flex-direction: start;
	justify-content: start;
	width: 3.2rem;
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	align-items: start;
	justify-content: start;
	width: 100%;
	height: 100%;
`;

const MainTitle = styled.p`
	color: ${({ theme }) => theme.color.Grey.Black};
	${({ theme }) => theme.font.display01};
`;

const SubTitle = styled.p`
	color: ${({ theme }) => theme.color.Grey.Grey5};
	${({ theme }) => theme.font.label02};
`;
export default LoginContainer;
