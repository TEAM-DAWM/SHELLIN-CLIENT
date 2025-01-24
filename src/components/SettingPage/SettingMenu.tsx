import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import colorToken from '@/styles/colorToken';
import { MenuType } from '@/types/setting/menuType';

interface SettingMenuProps {
	activeMenu: MenuType;
	onTabChange: (tab: MenuType) => void;
}

function SettingMenu({ activeMenu, onTabChange }: SettingMenuProps) {
	return (
		<TabSection>
			<Button
				type="text-assistive"
				size="large"
				disabled={false}
				label="계정 관리"
				onClick={() => onTabChange('account')}
				additionalCss={activeMenu === 'account' ? activeButtonStyle : undefined}
			/>
		</TabSection>
	);
}

const TabSection = styled.div`
	display: flex;
	flex-direction: column;

	/* gap: 8px; */
	align-self: stretch;
	width: 44.8rem;
	padding: 3.2rem 0;
	padding: 32px 24px 0;

	border-right: 1px solid ${({ theme }) => theme.colorToken.Outline.neutralNormal};
`;

const activeButtonStyle = css`
	background-color: ${colorToken.Neutral.heavy};
`;
export default SettingMenu;
