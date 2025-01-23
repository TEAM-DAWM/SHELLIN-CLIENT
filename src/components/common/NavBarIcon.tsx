import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import Icn from '@/assets/svg/V2';
import { PAGE_ROUTE } from '@/constants/pages';

interface NavBarIconProps {
	name: string;
	type: '할 일' | '대시보드' | '캘린더' | '설정';
	onClick: () => void;
}
interface IconProps extends React.SVGProps<SVGSVGElement> {
	$iscurrent: boolean;
}

function NavBarIcon({ name, type, onClick }: NavBarIconProps) {
	const current = useLocation();
	const iscurrent = current.pathname === `/${type}`;
	return (
		<IconLayout onClick={onClick}>
			<IconContainer $iscurrent={iscurrent}>
				{name === PAGE_ROUTE.today && <TodayIcon $iscurrent={iscurrent} />}
				{name === PAGE_ROUTE.dashboard && <DashboardIcon $iscurrent={iscurrent} />}
				{name === PAGE_ROUTE.calendar && <CalendarIcon $iscurrent={iscurrent} />}
				{name === PAGE_ROUTE.setting && <SettingIcon $iscurrent={iscurrent} />}
			</IconContainer>
			<Caption $iscurrent={iscurrent}>{name}</Caption>
		</IconLayout>
	);
}
const IconLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 6.4rem;

	&:hover {
		div {
			background-color: ${({ theme }) => theme.palette.Grey.Grey1};
		}

		p {
			color: ${({ theme }) => theme.palette.Primary};
		}

		svg {
			color: ${({ theme }) => theme.palette.Primary};
		}
	}
`;
const IconContainer = styled.div<{ $iscurrent: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;

	background-color: ${({ theme, $iscurrent }) => $iscurrent && theme.palette.Grey.Grey1};
	border-radius: 8px;
`;

const createStyledIcon = (IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>) => styled(
	({ $iscurrent, ...rest }: IconProps) => <IconComponent {...rest} />
)<IconProps>`
	width: 2.4rem;
	height: 2.4rem;

	color: ${({ theme, $iscurrent }) => ($iscurrent ? theme.palette.Primary : theme.palette.Grey.Grey5)};
`;

const TodayIcon = createStyledIcon(Icn.IcnAlert);
const DashboardIcon = createStyledIcon(Icn.IcnAlert);
const CalendarIcon = createStyledIcon(Icn.IcnAlert);
const SettingIcon = createStyledIcon(Icn.IcnAlert);

const Caption = styled.p<{ $iscurrent: boolean }>`
	${({ theme }) => theme.fontTheme.CAPTION_02};
	color: ${({ theme, $iscurrent }) => ($iscurrent ? theme.palette.Primary : theme.palette.Grey.Grey5)};
	white-space: nowrap;
`;
export default NavBarIcon;
