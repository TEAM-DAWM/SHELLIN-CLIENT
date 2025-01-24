import styled from '@emotion/styled';

import { GoogleCalendar } from '@/apis/user/userInfoType';
import AccountDeleteBtn from '@/components/SettingPage/AccountDeleteBtn';
import GoogleCalendarBtn from '@/components/SettingPage/GoogleCalendarBtn';

interface AccountAreaProps {
	calendarAccount: GoogleCalendar[] | undefined;
}

function AccountArea({ calendarAccount }: AccountAreaProps) {
	return (
		<AccountAreaLayout>
			연동된 계정
			<AccountWrapper>
				<GoogleCalendarBtn />
				{calendarAccount?.map((account) => (
					<InputBox key={account.id}>
						<EmailWrapper>{account.email}</EmailWrapper>
						<AccountDeleteBtn accountId={account.id} />
					</InputBox>
				))}
			</AccountWrapper>
		</AccountAreaLayout>
	);
}

export default AccountArea;

const AccountAreaLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	align-items: flex-start;
	align-self: stretch;
	width: 100%;
	padding: 3.2rem 0;

	${({ theme }) => theme.font.title02};
	color: ${({ theme }) => theme.colorToken.Neutral.light};

	border-color: ${({ theme }) => theme.color.Grey.Grey3};
	border-bottom: 1px solid;
`;

const AccountWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 41.5rem;
	margin: 0.8rem 0.3rem 0.8rem 0.7rem;
	padding: 1.2rem 1.6rem 1.6rem;

	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey3};
	border-radius: 12px;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	width: 38.2rem;
	padding: 0.6rem 0.8rem 0.6rem 1.2rem;

	background: ${({ theme }) => theme.palette.Blue.Blue2};
	border-radius: 8px;
`;

const EmailWrapper = styled.p`
	${({ theme }) => theme.fontTheme.BODY_02};
	color: ${({ theme }) => theme.palette.Grey.Grey7};
`;
