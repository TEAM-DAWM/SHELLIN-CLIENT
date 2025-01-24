import styled from '@emotion/styled';

import { UserData } from '@/apis/user/userInfoType';
import ProfileArea from '@/components/SettingPage/ProfileArea';
import { MenuType } from '@/types/setting/menuType';

interface SettingContentProps {
	activeMenu: MenuType;
	userData?: UserData;
}

function SettingContent({ userData, activeMenu }: SettingContentProps) {
	return (
		<ContentSection>
			{activeMenu === 'account' && (
				<ContentWrapper>
					<ProfileArea userData={userData} />
				</ContentWrapper>
			)}
		</ContentSection>
	);
}

const ContentSection = styled.div`
	flex: 1;

	background-color: ${({ theme }) => theme.color.Grey.White};
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default SettingContent;
