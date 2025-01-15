import styled from '@emotion/styled';

import Button from '@/components/common/v2/button/Button';
import IconButton from '@/components/common/v2/IconButton';
import DeadlineBox from '@/components/common/v2/popup/DeadlineBox';

function DueDateModal() {
	return (
		<DueDateModalLayout>
			<DueDateModalHeadLayout>
				<ModalTopButtonBox>
					<ButtonBox>
						<IconButton iconName="IcnX" type="normal" size="small" disabled />
					</ButtonBox>
				</ModalTopButtonBox>
			</DueDateModalHeadLayout>

			<DueDateModalBodyLayout>
				<DeadlineBox date={new Date()} endTime="06:00pm" label="마감 기간" isDueDate />
			</DueDateModalBodyLayout>

			<DueDateModalButtonLayout>
				<Button type="solid" size="medium" label="확인" />
			</DueDateModalButtonLayout>
		</DueDateModalLayout>
	);
}

const DueDateModalLayout = styled.article`
	z-index: 5;
	display: flex;
	flex-direction: column;
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

const DueDateModalHeadLayout = styled.section`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	width: 100%;
`;

const DueDateModalBodyLayout = styled.section`
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
	justify-content: flex-end;
	width: 100%;
`;

const DueDateModalButtonLayout = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 3.2rem;
`;

export default DueDateModal;
