import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import colorToken from '@/styles/colorToken';

type TabType = 'account' | 'category' | 'routine' | 'history';

interface SettingMenuProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}

function SettingMenu({ activeTab, onTabChange }: SettingMenuProps) {
	return (
		<TabSection>
			<Button
				type="text-assistive"
				size="medium"
				disabled={false}
				label="계정 관리"
				onClick={() => onTabChange('account')}
				additionalCss={activeTab === 'account' ? activeButtonStyle : undefined}
			/>
		</TabSection>
	);
}

const TabSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	width: 20rem;
	padding: 3.2rem 0;

	border-right: 1px solid ${({ theme }) => theme.colorToken.Neutral.normal};
`;

const activeButtonStyle = css`
	background-color: ${colorToken.Neutral.heavy};
`;
export default SettingMenu;
