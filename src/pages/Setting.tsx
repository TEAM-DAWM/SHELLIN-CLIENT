import styled from '@emotion/styled';

import useGetUserInfo from '@/apis/user/query';
// 상수 데이터
import LoadingSpinner from '@/components/common/spinner/Spinner';
import LogOutBtn from '@/components/SettingPage/LogOutBtn';
import ProfileArea from '@/components/SettingPage/ProfileArea';

function Setting() {
	const { isLoading } = useGetUserInfo();
	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<SettingContainer>
			<Wrapper>
				<ProfileArea />
			</Wrapper>
			<LogOutBtn />
		</SettingContainer>
	);
}

export default Setting;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

const SettingContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;
