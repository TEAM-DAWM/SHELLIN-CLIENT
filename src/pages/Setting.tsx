import styled from '@emotion/styled';
import { useState } from 'react';

import useGetUserInfo from '@/apis/user/query';
import NavBar from '@/components/common/NavBar';
import LoadingSpinner from '@/components/common/spinner/Spinner';
import SettingContent from '@/components/SettingPage/SettingContent';
import SettingMenu from '@/components/SettingPage/SettingMenu';

type TabType = 'account' | 'category' | 'routine' | 'history';

function Setting() {
	const [activeTab, setActiveTab] = useState<TabType>('account');

	const handleTabChange = (tab: TabType) => {
		setActiveTab(tab);
	};
	const { data: userInfo, isLoading } = useGetUserInfo();
	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<SettingLayout>
			<NavBarWrapper>
				<NavBar isOpen={false} handleSideBar={() => {}} />
			</NavBarWrapper>
			<SettingArea>
				<SettingHeader>설정</SettingHeader>
				<MainWrapper>
					<SettingMenu activeTab={activeTab} onTabChange={handleTabChange} />
					<SettingContent activeTab={activeTab} userData={userInfo?.data} />
				</MainWrapper>
			</SettingArea>
		</SettingLayout>
	);
}

export default Setting;

const SettingLayout = styled.div`
	display: flex;
	height: 108rem;
	overflow: hidden;
`;

const NavBarWrapper = styled.div`
	box-shadow:
		4px 4px 40px 20px #717e9833,
		-4px -4px 40px 0 #717e9833;
`;

const SettingArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: 0.8rem 0.8rem 0.8rem 1.6rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	border-radius: 20px;
`;

const SettingHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	justify-content: center;
	width: 100%;
	padding: 5.2rem 0 1.2rem 2.4rem;

	color: ${({ theme }) => theme.colorToken.Neutral.light};

	${({ theme }) => theme.font.title01};
	border-bottom: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
`;

const MainWrapper = styled.div`
	display: flex;
	flex: 1 0 0;
	flex-direction: row;
	align-items: flex-start;
	align-self: stretch;
`;
