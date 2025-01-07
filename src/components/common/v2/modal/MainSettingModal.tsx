import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import DropdownButton from '@/components/common/v2/control/DropdownButton';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';
import PopUp from '@/components/common/v2/TextBox/PopUp';

function MainSettingModal() {
	return (
		<MainSettingModalLayout>
			<MainSettingModalHeadLayout>
				<ModalTopButtonBox>
					<DropdownButton status="미완료" handleStatusChange={() => {}} />
					<ButtonBox>
						<IconButton iconName="IcnDelete" type="normal" size="small" disabled />
						<IconButton iconName="IcnX" type="normal" size="small" disabled />
					</ButtonBox>
				</ModalTopButtonBox>
				<PopUp type="title" />
			</MainSettingModalHeadLayout>
			<MainSettingModalBodyLayout>
				<DeadlineBox date={new Date()} endTime="06:00pm" label="마감 기간" />
				<PopUpTitleBox>
					<PopUp type="description" />
				</PopUpTitleBox>
				<DeadlineBox date={new Date()} startTime="11:00am" endTime="06:00pm" label="진행 기간" />
			</MainSettingModalBodyLayout>
			<MainSettingModalButtonLayout>
				<Button type="solid" size="medium" label="확인" />
			</MainSettingModalButtonLayout>
		</MainSettingModalLayout>
	);
}

const MainSettingModalLayout = styled.article`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	box-sizing: border-box;
	width: 41.6rem;
	height: auto;
	padding: 2.4rem 2.4rem 3.2rem;

	background-color: ${({ theme }) => theme.colorToken.Neutral.normal};
	box-shadow:
		4px 4px 40px 20px #717e9833,
		-4px -4px 40px 0 #717e9833;
	border-radius: 20px;
`;

const MainSettingModalHeadLayout = styled.section`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	width: 100%;
	height: 9.2rem;
`;

const MainSettingModalBodyLayout = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ModalTopButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ButtonBox = styled.div`
	display: flex;
	gap: 0.8rem;
`;

const PopUpTitleBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 5.9rem;
`;

const MainSettingModalButtonLayout = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 3.2rem;
`;

export default MainSettingModal;
