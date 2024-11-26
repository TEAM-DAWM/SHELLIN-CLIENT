import styled from '@emotion/styled';
import { useState } from 'react';

import { theme } from '@/styles/theme';

const STATE = {
	PLACEHOLDER: 'placeholder',
	DEFAULT: 'default',
	HOVER: 'hover',
	TYPING: 'typing',
	FIELD: 'field',
} as const;

function DumpingArea() {
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
		<DumpingAreaContainer state={state} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<DumpingInput
				state={state}
				placeholder="해야 할 일을 여기에 쏟아내세요"
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
			<div className="icon-touch-area">
				<img src="https://via.placeholder.com/32" alt="temporaryImg" />
			</div>
		</DumpingAreaContainer>
	);
}

export default DumpingArea;

const DumpingAreaContainer = styled.div<{ state: (typeof STATE)[keyof typeof STATE] }>`
	display: flex;
	align-items: center;
	width: 43.2rem;
	height: 4.8rem;
	padding-left: 1.6rem;

	background: ${theme.color.Blue.Blue1};
	border-radius: 16px;

	/** 
  @todo STATE.HOVER 시 아이콘 밖으로 밀림 이슈
   */
	${({ state }) => {
		switch (state) {
			case STATE.DEFAULT:
				return `
          border: 1px solid ${theme.color.Blue.Blue7};
        `;
			case STATE.HOVER:
				return `
          border: 2px solid ${theme.color.Blue.Blue7};
          ${theme.shadow.FloatingAction1}; 
          
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
	font-weight: 600;

	background: transparent;
	outline: none;
	border: 0;
	caret-color: ${theme.color.Blue.Blue7};

	${theme.font.label05};

	&::placeholder {
		color: ${({ state }) => (state === STATE.PLACEHOLDER ? theme.color.Blue.Blue3 : theme.color.Blue.Blue7)};
	}
`;

// STATE.DEFAULT {
// 	border: 1px solid ${theme.color.Blue.Blue7};
//   color: ${theme.color.Blue.Blue7};
// }
// STATE.HOVER {
// 	border: 2px solid ${theme.color.Blue.Blue7};
// 	${theme.shadow.FloatingAction1}
//   color: ${theme.color.Blue.Blue7};
// }
// STATE.HOVER {
// 	border: 1px solid ${theme.color.Blue.Blue7};
//   color: ${theme.color.Blue.Blue3};
// }
// STATE.TYPING {
// 	border: 1px solid ${theme.color.Blue.Blue7};
//   color: ${theme.color.Grey.Grey8};
// }
