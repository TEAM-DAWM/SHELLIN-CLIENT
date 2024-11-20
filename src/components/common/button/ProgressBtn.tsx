import styled from '@emotion/styled';

import Icons from '@/assets/svg/V1/index';

interface Progress {
	type: 'setting' | 'defaultProgress';
}

function ProgressBtn({ type }: Progress) {
	return (
		<div>
			{type === 'setting' ? (
				<SettingProgressLayout>
					<StyledSettingProgress />
				</SettingProgressLayout>
			) : (
				<DefaultProgressLayout>
					<StyledProgressIcon />
				</DefaultProgressLayout>
			)}
		</div>
	);
}

export default ProgressBtn;

const SettingProgressLayout = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.4rem;
	height: 2.4rem;

	background-color: ${({ theme }) => theme.palette.Blue.Blue1};
	border-radius: 8px;

	&:hover {
		background-color: ${({ theme }) => theme.palette.Blue.Blue3};
	}

	&:active {
		background-color: ${({ theme }) => theme.palette.Primary};

		path {
			stroke: ${({ theme }) => theme.palette.Grey.White};
		}
	}
`;

const StyledSettingProgress = styled(Icons.SettingProgress)`
	width: 1.4rem;
`;

const DefaultProgressLayout = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;

	background-color: ${({ theme }) => theme.palette.Blue.Blue1};
	border-radius: 10px;
`;

const StyledProgressIcon = styled(Icons.ProgressIcon)`
	width: 1.86rem;
`;
