import styled from '@emotion/styled';

import { UserData } from '@/apis/user/userInfoType';
import ProfileArea from '@/components/SettingPage/ProfileArea';

type TabType = 'account' | 'category' | 'routine' | 'history';

interface SettingContentProps {
	activeTab: TabType;
	userData?: UserData;
}

function SettingContent({ userData, activeTab }: SettingContentProps) {
	return (
		<ContentSection>
			{activeTab === 'account' && (
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
