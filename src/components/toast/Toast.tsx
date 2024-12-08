import styled from '@emotion/styled';
import { useEffect } from 'react';

import Icn from '@/assets/svg/V2';

interface ToastProps {
	message: string;
	onClose: () => void;
	code: string; // success, conflict, info;
}

function Toast({ message, onClose, code }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	const getIcon = () => {
		switch (code) {
			case 'success':
				return <Icn.IcnReturnCheck />;
			case 'conflict':
				return <Icn.IcnDelete />;
			case 'info':
				return <Icn.IcnAlert />;
			default:
				return <Icn.IcnReturnCheck />;
		}
	};

	return (
		<ToastMessage code={code}>
			<TextLayout>
				{getIcon()}
				{message}
			</TextLayout>
			<RevertBox>
				<RevertText>되돌리기</RevertText>
				<Icn.IcnX />
			</RevertBox>
		</ToastMessage>
	);
}

const ToastMessage = styled.div<{ code: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	width: 44rem;
	height: 6.4rem;
	padding: 1.6rem;

	color: ${({ theme }) => theme.colorToken.Text.neutralDark};

	background-color: ${({ theme, code }) => {
		switch (code) {
			case 'success':
				return theme.colorToken.Primary.normal;
			case 'conflict':
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
	width: 26.8rem;

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
