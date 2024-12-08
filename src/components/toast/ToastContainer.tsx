import styled from '@emotion/styled';

import Toast from '@/components/toast/Toast';
import { useToast } from '@/components/toast/ToastContext';

function ToastContainer() {
	const { toasts, removeToast } = useToast();

	return (
		<Container>
			{toasts.map((toast) => (
				<Toast key={toast.id} message={toast.message} code={toast.code} onClose={() => removeToast(toast.id)} />
			))}
		</Container>
	);
}

const Container = styled.div`
	position: fixed;
	right: 2rem;
	bottom: 5rem;
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export default ToastContainer;
