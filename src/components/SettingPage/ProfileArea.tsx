import styled from '@emotion/styled';

import Images from '@/assets/images';
import USERDATA from '@/constants/settingUserData';

function ProfileArea() {
	return (
		<ProfileAreaLayout>
			<ProfileBox>
				프로필
				<ProfileWrapper>
					<ProfileImg src={Images.sampleImg} alt="프로필 이미지" />
					<ProfileTextBox>
						<LastName>
							{USERDATA?.familyName}
							{USERDATA?.givenName}
						</LastName>
						<Email>{USERDATA.email}</Email>
					</ProfileTextBox>
				</ProfileWrapper>
			</ProfileBox>
		</ProfileAreaLayout>
	);
}

export default ProfileArea;

const ProfileAreaLayout = styled.div`
	display: flex;
	flex: 1 0 0;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	padding: 32px 32px 0;

	background-color: ${({ theme }) => theme.color.Grey.White};
	border-left: 1px solid ${({ theme }) => theme.colorToken.Neutral.normal};
`;

const ProfileBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-items: flex-start;
	align-self: stretch;
	width: 100%;
	padding-bottom: 3.2rem;

	${({ theme }) => theme.font.title02};
	color: ${({ theme }) => theme.colorToken.Neutral.light};

	border-bottom: 1px solid ${({ theme }) => theme.colorToken.Neutral.normal};
`;

const ProfileWrapper = styled.div`
	display: flex;
	gap: 2rem;
	align-items: center;
	width: 43.2rem;
	padding: 1.6rem;
`;

const ProfileImg = styled.img`
	width: 5.6rem;
	height: 5.6rem;

	border-radius: 50%;
`;
const ProfileTextBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const LastName = styled.p`
	${({ theme }) => theme.font.title02};
	color: ${({ theme }) => theme.colorToken.Neutral.light};
`;

const Email = styled.p`
	${({ theme }) => theme.font.body04};
	color: ${({ theme }) => theme.colorToken.Neutral.light};
`;
