import styled from '@emotion/styled';
import { useState } from 'react';

import { theme } from '@/styles/theme';

const TYPE = {
	TITLE: 'title',
	DESC: 'description',
} as const;

const STATE = {
	PLACEHOLDER: 'placeholder',
	DEFAULT: 'default',
	TYPING: 'typing',
	FIELD: 'field',
} as const;

type Props = {
	type: (typeof TYPE)[keyof typeof TYPE];
};

function PopUp({ type = 'title' }: Props) {
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
		}
	};

	return (
		/**
		 * @todo type === TYPE.DESC && state === STATE.DEFAULT 일때만 아이콘 뜨도록
		 */
		<StyledInput
			type={type}
			state={state}
			placeholder="제목을 입력하세요"
			onFocus={handleFocus}
			onBlur={handleBlur}
			onChange={handleChange}
		/>
	);
}

export default PopUp;

const StyledInput = styled.input<{ type: Props['type']; state: (typeof STATE)[keyof typeof STATE] }>`
	${({ type }) => (type === TYPE.TITLE ? theme.font.title02 : theme.font.body03)};
	caret-color: ${theme.color.Blue.Blue7};

	color: ${({ state }) => {
		switch (state) {
			case STATE.DEFAULT:
				return theme.color.Grey.Grey6;
			case STATE.PLACEHOLDER:
				return theme.color.Grey.Grey4;
			case STATE.TYPING:
			case STATE.FIELD:
				return theme.color.Grey.Grey8;
			default:
				return theme.color.Grey.Grey6;
		}
	}};
	font-weight: 600; /* 수정필요 */

	outline: none;
	border-width: 0;

	&::placeholder {
		color: ${({ state }) => (state === STATE.DEFAULT ? theme.color.Grey.Grey6 : theme.color.Grey.Grey4)};
	}
`;

// TYPE.TITLE: {
// 	${theme.font.title02};
// 	caret-color: ${theme.color.Blue.Blue7}

// 	STATE.DEFAULT: css`
// 		color: ${theme.color.Grey.Grey6};
// 	`
// 	STATE.PLACEHOLDER: css`
// 		color: ${theme.color.Grey.Grey4};
// 	`
// 	STATE.TYPING: css`
// 		color: ${theme.color.Grey.Grey8};
// 	`
// 	STATE.FIELD: css`
// 		color: ${theme.color.Grey.Grey8};
// 	`
// }

// TYPE.DESC: {
// 	${theme.font.body03};
// 	caret-color: ${theme.color.Blue.Blue7}

// 	STATE.DEFAULT: css`
// 		color: ${theme.color.Grey.Grey6};
// 	`
// 	STATE.PLACEHOLDER: css`
// 		color: ${theme.color.Grey.Grey4};
// 	`
// 	STATE.TYPING: css`
// 		color: ${theme.color.Grey.Grey8};
// 	`
// 	STATE.FIELD: css`
// 		color: ${theme.color.Grey.Grey8};
// 	`
// }
