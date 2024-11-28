import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useSyncGoogleTimeBlock from '@/apis/timeBlocks/googleTimeBlock/query';
import Icons from '@/assets/svg/V1/index';
import LoadingSpinner from '@/components/common/spinner/Spinner';

interface RefreshProps {
	isDisabled: boolean;
}

function RefreshBtn({ isDisabled }: RefreshProps) {
	const { mutate: refreshGoogle, isPending } = useSyncGoogleTimeBlock();

	if (isPending) {
		return <LoadingSpinner />;
	}

	const handleSyncBtn = () => {
		refreshGoogle();
	};
	return (
		<RefreshBtnLayout isDisabled={isDisabled} disabled={isDisabled} onClick={handleSyncBtn}>
			<StyledRefreshIcon />
			<Text>동기화</Text>
		</RefreshBtnLayout>
	);
}

export default RefreshBtn;

const RefreshBtnCss = css`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	justify-content: center;
	width: 7.5rem;
	height: 2.6rem;

	border-radius: 8px;
`;

const RefreshBtnLayout = styled.button<{ isDisabled: boolean }>`
	z-index: 2;

	${RefreshBtnCss}
	color: ${({ theme, isDisabled }) => (isDisabled ? theme.palette.Grey.Grey5 : theme.palette.Grey.White)};

	background-color: ${({ theme, isDisabled }) => (isDisabled ? theme.palette.Grey.Grey7 : theme.palette.Grey.Black)};

	${({ theme, isDisabled }) =>
		!isDisabled &&
		`
			&:hover {
				background-color: ${theme.palette.Grey.Grey6};
			}
			&:active {
				background-color: ${theme.palette.Grey.Grey8};
			}
		`}
`;

const StyledRefreshIcon = styled(Icons.Refresh)`
	width: 1.2rem;
	height: 1.2rem;
`;

const Text = styled.p`
	text-align: center;

	${({ theme }) => theme.fontTheme.CAPTION_02};
`;
