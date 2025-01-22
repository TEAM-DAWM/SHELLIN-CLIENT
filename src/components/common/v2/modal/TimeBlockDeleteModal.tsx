import styled from '@emotion/styled';

import Button from '../button/Button';

import useOutsideClick from '@/hooks/useOutsideClick';

type ModalDeleteDetailProps = {
	top: number;
	left: number;
	onClose: () => void;
	onDelete: (e: React.MouseEvent) => void;
};

function TimeBlockDeleteModal({ top, left, onClose, onDelete }: ModalDeleteDetailProps) {
	const modalRef = useOutsideClick<HTMLDivElement>({ onClose });
	return (
		<TimeBlockDeleteModalContainer ref={modalRef} top={top} left={left} onClick={(e) => e.stopPropagation()}>
			<Button type="text-assistive" size="large" label="진행 기간 삭제하기" rightIcon="IcnDelete" onClick={onDelete} />
		</TimeBlockDeleteModalContainer>
	);
}

export default TimeBlockDeleteModal;

const TimeBlockDeleteModalContainer = styled.div<{ top: number; left: number }>`
	position: fixed;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
	z-index: 1;

	display: flex;
	padding: 8px;

	background-color: ${({ theme }) => theme.color.Grey.White};
	box-shadow:
		0 16px 20px 0 rgb(0 0 0 / 12%),
		0 8px 16px 0 rgb(0 0 0 / 8%),
		0 0 8px 0 rgb(0 0 0 / 8%);
	border-radius: 12px;
`;
