import styled from '@emotion/styled';

import ModalBackdrop from '../../modal/ModalBackdrop';
import Button from '../button/Button';

type ModalDeleteDetailProps = {
	top: number;
	left: number;
	onClose: (e: React.MouseEvent) => void;
	onDelete: (e: React.MouseEvent) => void;
};

function TimeBlockDeleteModal({ top, left, onClose, onDelete }: ModalDeleteDetailProps) {
	return (
		<ModalBackdrop onClick={onClose}>
			<TimeBlockDeleteModalContainer top={top} left={left} onClick={(e) => e.stopPropagation()}>
				<Button
					type="text-assistive"
					size="large"
					label="진행 기간 삭제하기"
					rightIcon="IcnDelete"
					onClick={onDelete}
				/>
			</TimeBlockDeleteModalContainer>
		</ModalBackdrop>
	);
}

export default TimeBlockDeleteModal;

const TimeBlockDeleteModalContainer = styled.div<{ top: number; left: number }>`
	position: fixed;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;

	display: flex;
	padding: 8px;

	background-color: ${({ theme }) => theme.color.Grey.White};
	box-shadow:
		0 16px 20px 0 rgb(0 0 0 / 12%),
		0 8px 16px 0 rgb(0 0 0 / 8%),
		0 0 8px 0 rgb(0 0 0 / 8%);
	border-radius: 12px;
`;
