import styled from '@emotion/styled';
import { useState } from 'react';

import Icon from '../../Icon';
import Button from '../button/Button';

import Icn from '@/assets/svg/V2';
import { theme } from '@/styles/theme';

const STATE = {
	PLACEHOLDER: 'placeholder',
	DEFAULT: 'default',
	HOVER: 'hover',
	TYPING: 'typing',
	FIELD: 'field',
} as const;

function DumpingAreaBtn() {
	const [state, setState] = useState<(typeof STATE)[keyof typeof STATE]>(STATE.DEFAULT);

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			setState(STATE.PLACEHOLDER);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setState(STATE.FIELD);
		} else {
			setState(STATE.DEFAULT);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			setState(STATE.TYPING);
		} else {
			setState(STATE.PLACEHOLDER);
		}
	};

	const handleMouseEnter = () => {
		if (state === STATE.DEFAULT) {
			setState(STATE.HOVER);
		}
	};

	const handleMouseLeave = () => {
		if (state === STATE.HOVER) {
			setState(STATE.DEFAULT);
		}
	};

	return (
		<DumpingAreaContainer>
			<DumpingAreaWrapper state={state} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<DumpingInput
					state={state}
					placeholder="해야 할 일을 여기에 쏟아내세요"
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<div className="icon-touch-area">
					<div className="icon-background">
						<Icon name="IcnEnter" />
					</div>
				</div>
			</DumpingAreaWrapper>
			{(state === STATE.TYPING || state === STATE.FIELD) && (
				<Button
					type="outlined-primary"
					size="small"
					disabled={false}
					label="마감 기간/시간"
					leftIcon={<Icn.IcnPlus />}
				/>
			)}
		</DumpingAreaContainer>
	);
}

export default DumpingAreaBtn;

const DumpingAreaContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: flex-start;
	justify-content: center;
	width: 50rem;
	height: 50rem;

	background: #fff;
`;

const DumpingAreaWrapper = styled.div<{ state: (typeof STATE)[keyof typeof STATE] }>`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	width: 43.2rem;
	height: 4.8rem;
	padding-left: 1.6rem;

	background: ${theme.color.Blue.Blue1};
	border-radius: 16px;

	${({ state }) => {
		switch (state) {
			case STATE.DEFAULT:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
			case STATE.HOVER:
				return `
          border: 2px solid ${theme.color.Blue.Blue7};
					box-shadow: inset 0 0 4px rgb(0 0 0 / 12%);
        `;
			case STATE.TYPING:
			case STATE.FIELD:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
			default:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
		}
	}}

	.icon-touch-area {
		display: flex;
		gap: 8px;
		align-items: center;
		padding: 8px 8px 8px 16px;

		cursor: pointer;

		.icon-background {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 3.2rem;
			height: 3.2rem;

			color: ${theme.colorToken.Icon.inverse};

			background: ${theme.colorToken.Primary.normal};
			border-radius: 8px;
		}
	}
`;

const DumpingInput = styled.input<{ state: (typeof STATE)[keyof typeof STATE] }>`
	flex: 1;

	color: ${({ state }) => {
		switch (state) {
			case STATE.DEFAULT:
				return theme.color.Blue.Blue7;
			case STATE.HOVER:
				return theme.color.Blue.Blue3;
			case STATE.TYPING:
			case STATE.FIELD:
				return theme.color.Grey.Grey8;
			default:
				return theme.color.Blue.Blue7;
		}
	}};

	background: transparent;
	outline: none;
	border: 0;
	caret-color: ${theme.color.Blue.Blue7};

	${theme.font.label05};

	&::placeholder {
		color: ${({ state }) => (state === STATE.PLACEHOLDER ? theme.color.Blue.Blue3 : theme.color.Blue.Blue7)};
	}
`;
