import styled from '@emotion/styled';

import ProfileArea from '@/components/SettingPage/ProfileArea';

type TabType = 'account' | 'category' | 'routine' | 'history';

interface SettingContentProps {
	activeTab: TabType;
}

function SettingContent({ activeTab }: SettingContentProps) {
	return (
		<ContentSection>
			{activeTab === 'account' && (
				<ContentWrapper>
					<ProfileArea />
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
