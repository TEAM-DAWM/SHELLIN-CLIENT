import styled from '@emotion/styled';
import { useEffect } from 'react';

import Icon from '@/components/common/Icon';
import { ToastType } from '@/types/toastType';

const toastIcon: Record<ToastType, { icon: JSX.Element }> = {
	success: {
		icon: <Icon name="IcnReturnCheck" />,
	},
	error: {
		icon: <Icon name="IcnDelete" />,
	},
	info: {
		icon: <Icon name="IcnAlert" />,
	},
};

interface ToastProps {
	message: string;
	onClose: () => void;
	code: ToastType;
}

function Toast({ message, onClose, code }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	const { icon } = toastIcon[code];

	return (
		<ToastMessage code={code}>
			<TextLayout>
				{icon}
				{message}
			</TextLayout>
			<RevertBox>
				<RevertText>되돌리기</RevertText>
				<Icon name="IcnX" />
			</RevertBox>
		</ToastMessage>
	);
}

const ToastMessage = styled.div<{ code: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	min-width: 44rem;
	height: 6.4rem;
	padding: 1.6rem;

	color: ${({ theme }) => theme.colorToken.Text.neutralDark};

	background-color: ${({ theme, code }) => {
		switch (code) {
			case 'success':
				return theme.colorToken.Primary.normal;
			case 'error':
				return theme.color.Orange.Orange5;
			case 'info':
				return theme.color.Grey.Grey7;
			default:
				return theme.colorToken.Primary.normal;
		}
	}};
	transform: translateX(100%);
	border-radius: 12px;
	${({ theme }) => theme.font.label03};

	animation:
		slide-in 0.3s forwards,
		fade-out 0.3s forwards 2.7s;

	@keyframes slide-in {
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes fade-out {
		to {
			transform: translateX(100%);
			opacity: 0;
		}
	}
`;

const TextLayout = styled.div`
	display: flex;
	gap: 0.8rem;
	align-items: center;
	min-width: 26.8rem;

	svg {
		width: 2.4rem;
		height: 2.4rem;
	}
`;

const RevertBox = styled.div`
	display: flex;
	align-items: center;

	cursor: pointer;
	opacity: 0.7;

	svg {
		width: 2.4rem;
		height: 2.4rem;
	}
`;

const RevertText = styled.p`
	width: 5.2rem;
	height: 1.5rem;
	margin: 0 1.6rem;

	${({ theme }) => theme.font.label04};
`;

export default Toast;
