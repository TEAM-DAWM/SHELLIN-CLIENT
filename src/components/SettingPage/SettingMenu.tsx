import styled from '@emotion/styled';

import Button from '../common/v2/button/Button';

function SettingMenu() {
	return (
		<MenuLayout>
			<Button type="text-assistive" size="large" disabled={false} label="계정 관리" />
		</MenuLayout>
	);
}

const MenuLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: flex-start;
	align-self: stretch;
	padding: 32px 24px 0;
`;

export default SettingMenu;
