import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';

import Icon from './Icon';
import ToggleSwitchButton from './v2/control/ToggleSwitchButton';

import useGetUserInfo from '@/apis/user/query';
import Images from '@/assets/images';
import NavbarButton from '@/components/common/v2/button/NavbarButton';

interface NavBarProps {
	isOpen: boolean;
	handleSideBar: () => void;
}
function NavBar({ isOpen, handleSideBar }: NavBarProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const moveToSetting = () => {
		navigate('/setting');
	};
	const moveToToday = () => {
		navigate('/today');
	};
	const { data: userInfo } = useGetUserInfo();
	return (
		<NavBarLayout>
			<ProfileContainer>
				<ProfileImg src={userInfo?.data.image || Images.smallLogo} alt="프로필" onClick={moveToSetting} />
				<IconWrapper>
					<NavbarButton
						iconName="IcnTodolist"
						type="normal"
						onClick={moveToToday}
						isActive={location.pathname === '/today'}
					/>
					<TextBox isActive={location.pathname === '/today'}>할 일</TextBox>
				</IconWrapper>
			</ProfileContainer>
			<ControllContainer>
				<ToggleWrapper>
					<ToggleSwitchButton active={isOpen} onClick={handleSideBar} />
					<ToggleDesc>쏟아내기</ToggleDesc>
				</ToggleWrapper>
				<Divider />
				<IconContainer>
					<SettingTouchArea onClick={moveToSetting}>
						<Icon name="IcnSetting" size="large" />
					</SettingTouchArea>
					<Icon name="IcnQuestion" size="large" />
				</IconContainer>
			</ControllContainer>
		</NavBarLayout>
	);
}
const NavBarLayout = styled.div`
	position: absolute;
	left: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 7.2rem;
	height: 100%;

	background-color: ${({ theme }) => theme.palette.Grey.White};
	border-right: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 8px 0 0 8px;
`;
const ControllContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ToggleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.9rem;
`;
const ToggleDesc = styled.p`
	${({ theme }) => theme.font.label05};
	color: ${({ theme }) => theme.colorToken.Text.assistive};
`;
const Divider = styled.div`
	width: 4.4rem;
	height: 0.1rem;
	margin-top: 3.2rem;
	margin-bottom: 6rem;

	background-color: ${({ theme }) => theme.colorToken.Outline.neutralStrong};
`;
const ProfileImg = styled.img`
	width: 4.8rem;
	height: 4.8rem;
	margin-top: 5.6rem;

	background-color: #dfe9fc;
	border-radius: 50%;
`;
const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	margin-bottom: 19.2rem;

	color: ${({ theme }) => theme.colorToken.Icon.normal};
`;
const SettingTouchArea = styled.div`
	display: block;
`;

const IconWrapper = styled.span`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: center;
	width: 3.1rem;
`;

const TextBox = styled.p<{ isActive?: boolean }>`
	width: 3.4rem;

	color: ${({ theme, isActive }) => (isActive ? theme.colorToken.Icon.primary : theme.colorToken.Text.assistive)};
	text-align: center;
	${({ theme }) => theme.font.label03};
`;

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10rem;
	align-items: center;
	width: 100%;
`;
export default NavBar;
