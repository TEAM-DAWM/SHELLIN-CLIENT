import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import Modal from '../modal/Modal';

import BtnTaskIconRender from './BtnTaskIconRender';

import Icons from '@/assets/svg/V1/index';
import BtnDate from '@/components/common/BtnDate/BtnDate';
import MODAL from '@/constants/modalLocation';
import { theme } from '@/styles/theme';
import { TaskType } from '@/types/tasks/taskType';
import { SizeType } from '@/types/textInputType';
import { BtnTaskLocationType } from '@/types/today/BtnTaskLocationType';

interface BtnTaskProps extends TaskType {
	location: BtnTaskLocationType;
	handleSelectedTarget: (task: TaskType | null) => void;
	selectedTarget: TaskType | null;
	dashBoardInprogress?: boolean;
	btnStatus?: string;
	preventDoubleClick?: boolean;
	isDragging?: boolean;
	targetDate: string;
	modalSize?: SizeType;
}

interface BorderColorProps {
	isHovered: boolean;
	isClicked: boolean;
	theme: Theme;
	status: string;
	isDragging?: boolean;
}

function BtnTask(props: BtnTaskProps) {
	const {
		id,
		name,
		deadLine,
		hasDescription,
		status,
		location,
		handleSelectedTarget,
		selectedTarget,
		dashBoardInprogress,
		btnStatus,
		preventDoubleClick = false,
		isDragging = false,
		targetDate,
		modalSize = { type: 'short' },
	} = props;
	const [isModalOpen, setModalOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	/** 모달 띄우기 */
	const handleDoubleClick = (e: React.MouseEvent) => {
		if (preventDoubleClick) {
			e.preventDefault();
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const calculatedTop = rect.top;
		const adjustedTop = Math.min(calculatedTop, MODAL.SCREEN_HEIGHT - MODAL.TASK_MODAL_HEIGHT);
		setTop(adjustedTop);
		setLeft(rect.right + 6);
		setModalOpen((prev) => !prev);
	};

	/** 보더 색상 */
	const handleClick = () => {
		if (selectedTarget?.id === id) {
			handleSelectedTarget(null);
		} else {
			const currentData: TaskType = {
				id,
				name,
				deadLine,
				hasDescription,
				status,
			};
			handleSelectedTarget(currentData);
		}
	};

	/** 모달 닫기 */
	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<ModalLayout>
			<BtnTaskLayout
				isClicked={selectedTarget?.id === id}
				isHovered={isHovered}
				onDoubleClick={handleDoubleClick}
				onClick={handleClick}
				theme={theme}
				status={status}
				isDragging={isDragging}
			>
				<BtnTaskContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<BtnTaskTextWrapper isDescription={hasDescription}>
						{hasDescription && <IconFile />}
						{name}
					</BtnTaskTextWrapper>
					<BtnDate
						date={deadLine?.date || null}
						time={deadLine?.time || null}
						size={{ type: 'short' }}
						// isDelayed={status === '지연'}
					/>
				</BtnTaskContainer>
				<BtnTaskIconRender
					location={location}
					dashBoardInprogress={dashBoardInprogress || false}
					btnStatus={btnStatus}
					status={status}
					taskId={id}
					targetDate={targetDate}
				/>
			</BtnTaskLayout>
			<Modal
				isOpen={isModalOpen}
				sizeType={modalSize}
				top={top}
				left={left}
				onClose={closeModal}
				taskId={id}
				targetDate={targetDate}
				location={location}
			/>
		</ModalLayout>
	);
}

export default BtnTask;

const draggingStyle = (theme: Theme) => css`
	background: ${theme.palette.Grey.White};
	box-shadow: 0 16px 35px 0 rgb(72 87 120 / 25%);
	border: 1px solid ${theme.palette.Blue.Blue7};
	border-radius: 8px;
`;

const getBorderColor = ({ isHovered, isClicked, theme, status, isDragging }: BorderColorProps) => {
	const defaultColor = theme.palette.Grey.Grey1;
	const hoverColor = theme.palette.Blue.Blue3;
	const clickColor = theme.palette.Primary;
	const orangeColor = theme.palette.Orange.Orange8;
	let borderColor = defaultColor;
	if (isDragging && status !== '지연') {
		return draggingStyle(theme);
	}

	if (status === '지연') {
		borderColor = orangeColor;
	} else if (isClicked) {
		borderColor = clickColor;
	} else if (isHovered) {
		borderColor = hoverColor;
	}
	return css`
		border-color: ${borderColor};
	`;
};

const ModalLayout = styled.div`
	display: flex;
`;

const BtnTaskLayout = styled('div', { target: 'BtnTaskLayout' })`
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	min-width: 31rem;

	background: ${({ theme }) => theme.palette.Grey.White};
	border: 1px solid ${({ theme }) => theme.palette.Grey.Grey1};
	border-radius: 8px;

	${getBorderColor}
`;

const BtnTaskContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	align-items: flex-start;
	width: 100%;
	padding: 0.8rem 0 0.8rem 1.2rem;
`;

const BtnTaskTextWrapper = styled.div<{ isDescription: boolean }>`
	display: flex;
	gap: 0.4rem;
	align-items: center;
	align-self: stretch;
	padding-left: ${({ isDescription }) => (isDescription ? '0rem' : '0.4rem')};

	${({ theme }) => theme.fontTheme.LABEL_03};
`;

const IconFile = styled(Icons.IcnFile)`
	width: 1.4rem;
	height: 1.4rem;
`;
